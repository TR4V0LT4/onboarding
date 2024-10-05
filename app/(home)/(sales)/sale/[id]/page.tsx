import React from 'react';
import { db } from "@/db";
import { ventes, venteproduits, clients, users, products } from "@/db/schema";
import { Product, Client } from "@/types/types";
import { eq, and, sql } from "drizzle-orm";
import { date } from 'drizzle-orm/mysql-core';
import SaleDetailsComponent from '@/components/sales/sale/saledetails';

export interface SaleDetails {
    id: string;
    reference: string;
    cart: Product[];
    client: string;
    creer_par: string;
    waiting: string;
    date: string;
    quantity: number;
    credit: number;
    state: string;
    remise: number;
    type_remise: string;
    montant_recu: number;
    montant_credit: number;
    montant_rendre: number;
    ordonnance: string;
}

async function getSaleData(id: number) {


    const saleData = await db
        .select({
            waiting: ventes.livree,
            reference: ventes.reference,
            client: clients.name,
            date: ventes.created_at,
            quantity: ventes.qte_total,
            total: ventes.montant_PU,
            credit: ventes.montant_credit,
            status: ventes.status,
            first_name: users.first_name,
            last_name: users.last_name,
            remise: ventes.remise,
            type_remise: ventes.type_remise,
            montant_recu: ventes.montant_recu,
            montant_credit: ventes.montant_credit,
            montant_rendre: ventes.montant_rendre,
            ordonnance: ventes.ordonnance,
        })
    .from(ventes)
    .where(
        eq(ventes.id, id)
    )
    .leftJoin(clients, eq(clients.id, ventes.client_id))
    .leftJoin(users, eq(users.id, ventes.creer_par))
    .limit(1)

    const productsData = await db.select({
        id: venteproduits.produits_id,
        name: products.name,
        selected_ppv: venteproduits.PPV_app,
        quantity: venteproduits.quantite,
        pph: venteproduits.PPH_app,
        type_remise: venteproduits.type_remise,
        remise: venteproduits.remise,
        date: venteproduits.created_at,
    }).from(venteproduits)
    .where(eq(venteproduits.ventes_id, String(id)))
    .leftJoin(products, and(eq(venteproduits.produits_id, products.id)))

    const mappedProductsData: Product[] = productsData.map(product => ({
        id: product.id || "",
        name: product.name || "",
        selected_ppv: parseFloat(product.selected_ppv) || 0,
        quantity: product.quantity || 0,
        pph: [parseFloat(product.pph?.[0] ?? 0)],
        type_remise: product.type_remise || "",
        remise: product.remise || 0,
        date: product.date || "",
        ppv: [parseFloat(product.selected_ppv)],
        disp: 0,
        zone: "",
    }));

    return {saleData: saleData[0], mappedProductsData};
}

async function SalePage({params}: {params : {id: number}}) {

    const data = await getSaleData(params.id);

    return (
        <div className=" h-full w-full">
            <SaleDetailsComponent saleData={data.saleData} productsData={data.mappedProductsData} />
        </div>
    );
}

export default SalePage;