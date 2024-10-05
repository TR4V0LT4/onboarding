import { db } from '@/db';
import { NextResponse } from 'next/server';
import { products, product_prices, product_codes, pharmacy_produits, product_molecules, molecules } from '@/db/schema';
import { eq, like, or, and, isNotNull, between, asc } from 'drizzle-orm';
import getSession from "@/lib/getsession";
import { UserSession } from "@/types/usersession";
import { MySqlSelect } from 'drizzle-orm/mysql-core';

function ByPpv<T extends MySqlSelect>(qb:T, searchTerm: string) {
    return qb.where(
            and(
                eq(product_prices.type, "ppv_reimbursement"),
                between(product_prices.price, (parseInt(searchTerm) - 5).toString(), (parseInt(searchTerm) + 5).toString()),
                isNotNull(product_prices.price)
            )
        );
}

function ByName<T extends MySqlSelect>(qb: T, searchTerm: string, searchType: string) {
    let likePattern: string;
    switch (searchType) {
        case 'startsWith':
            likePattern = `${searchTerm}%`;
            break;
        case 'endsWith':
            likePattern = `%${searchTerm}`;
            break;
        case 'contains':
        default:
            likePattern = `%${searchTerm}%`;
            break;
    }

    return qb.where(
        and(
            isNotNull(product_prices.price),
            like(products.brand_name, likePattern),
            like(products.name, likePattern)
        )
    );
}

function ByNameOrCode<T extends MySqlSelect>(qb: T, searchTerm: string, searchType: string) {
    let likePattern: string;
    switch (searchType) {
        case 'startsWith':
            likePattern = `${searchTerm}%`;
            break;
        case 'endsWith':
            likePattern = `%${searchTerm}`;
            break;
        case 'contains':
        default:
            likePattern = `%${searchTerm}%`;
            break;
    }

    return qb.where(
        and(
            isNotNull(product_prices.price),
            or(
                like(products.name, likePattern),
                like(products.brand_name, likePattern),
                like(product_codes.code, likePattern)
            )
        )
    );
}

function ByPph<T extends MySqlSelect>(qb: T, searchTerm: string) {
    return qb.where(
            and(
                or(
                    eq(product_prices.type, "pharmacy"),
                    eq(product_prices.type, "ph_reimbursement")
                ),
                isNotNull(product_prices.price),
                between(product_prices.price, (parseInt(searchTerm) - 5).toString(), (parseInt(searchTerm) + 5).toString()),
            )
        );
}

function ByMolecule<T extends MySqlSelect>(qb: T, searchTerm: string) {
    return qb.leftJoin(product_molecules, eq(products.id, product_molecules.product_id))
        .leftJoin(molecules, eq(product_molecules.molecule_id, molecules.id))
        .where(
            and(
                isNotNull(product_prices.price),
                like(molecules.name, `%${searchTerm}%`)
            )
        );
}

// function ByZone<T extends MySqlSelect>(qb: T, searchTerm: string) {
//     return qb.where(
//             like(pharmacy_produits.zone, `%${searchTerm}%`)
//         );
// }

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const nameOrCode = searchParams.get('nameOrCode') || '';
    const name = searchParams.get('name') || '';
    const ppv = searchParams.get('ppv') || '';
    const pph = searchParams.get('pph') || '';
    const zone = searchParams.get('zone') || '';
    const molecule = searchParams.get('molecule') || '';
    const searchType = searchParams.get('searchType') || 'contains';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '60');
    const offset = (page - 1) * limit;

    try {
        const user: UserSession | null = await getSession();
        if (!user?.id) {
            throw new Error('User not authenticated');
        }

        let query = db
            .select({
                id: products.id,
                name: products.name,
                brand_name: products.brand_name,
                price: product_prices.price,
                price_type: product_prices.type,
                disp: pharmacy_produits.quantity,
            })
            .from(products)
            .leftJoin(product_codes, 
                and(
                    eq(products.id, product_codes.product_id),
                    eq(product_codes.type, "barcode")
                )
            )
            .leftJoin(product_prices,
                and(
                    eq(products.id, product_prices.product_id),
                    eq(product_prices.type, "ppv_reimbursement"),
                    // or(
                        // eq(product_prices.type, "ph_reimbursement")
                    // )
                )
            )
            .leftJoin(pharmacy_produits,
                and(
                    eq(products.id, pharmacy_produits.product_id),
                    eq(pharmacy_produits.pharmacy_id, user.company_id)
                )
            )
            .limit(limit)
            .offset(offset)
            .orderBy(products.name)
            .$dynamic();

        if (nameOrCode) {
            query = ByNameOrCode(query, nameOrCode, searchType);
        } else if (name) {
            query = ByName(query, name, searchType);
        } else if (ppv) {
            query = ByPpv(query, ppv);
        } else if (pph) {
            query = ByPph(query, pph);
        } else if (molecule) {
            query = ByMolecule(query, molecule);
        }
        
        const matchingProducts = await query;
        
        const mappedProducts = matchingProducts.reduce((acc: any[], product: any) => {
            const existingProduct = acc.find(p => p.id === product.id);
            if (existingProduct) {
                if (product.price_type === 'ppv_reimbursement' && !existingProduct.ppv.includes(product.price)) {
                    existingProduct.ppv.push(product.price);
                } else if ((product.price_type === 'pharmacy' || product.price_type === 'ph_reimbursement') && !existingProduct.pph.includes(product.price)) {
                    existingProduct.pph.push(product.price);
                }
            } else {
                acc.push({
                    id: product.id,
                    name: product.name || '',
                    code_bare: product.code_bare || '',
                    ppv: product.price_type === 'ppv_reimbursement' ? [product.price] : [],
                    pph: (product.price_type === 'pharmacy' || product.price_type === 'ph_reimbursement') ? [product.price] : [],
                    disp: product.disp || 0,
                });
            }
            return acc;
        }, []);

        return NextResponse.json(mappedProducts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic'