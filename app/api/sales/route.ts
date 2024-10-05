import { UserSession } from "@/types/usersession";
import { db } from "@/db";
import { ventes, venteproduits } from "@/db/schema";
import { NextResponse } from 'next/server';
import getSession from "@/lib/getsession";
import { format } from 'date-fns';
import { eq, desc, and } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const user: UserSession | null = await getSession();
        if (!user?.id) {
            throw new Error('User not authenticated');
        }
        const body = await request.json();
    
        const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

        const check = await db.select({ reference: ventes.reference }).from(ventes).where(eq(ventes.reference, body.reference));
        if (check.length > 0) {
            return NextResponse.json({ error: 'Sale already exists' }, { status: 400 });
        }


        const lastSale = await db.insert(ventes).values({
            created_at: formattedDate,
            updated_at: formattedDate,
            client_id: body.client.id,
            status: body.status,
            original_status: null,
            livree: body.livree,
            ordonnance: body.ordonnance,
            mode_payment: null,
            reference: body.reference,
            creer_par: body.operator.id,
            montant_credit: body.montant_credit,
            montant_PPV: body.cart.reduce((acc: number, item: any) => acc + item.quantity * item.selected_ppv, 0),
            montant_PU: body.cart.reduce((acc: number, item: any) => acc + item.quantity * item.selected_ppv, 0),
            montant_recu: body.montant_recu.toString(),
            montant_rendre: body.montant_rendre,
            archive: 0,
            date_archivage: null,
            organisme: null,
            qte_total: body.cart.reduce((acc: number, item: any) => acc + item.quantity, 0),
            total_rectifier: null,
            etat_retour: 0,
            pharmacy_id: user.company_id,
            caisse_id: null,
            type_remise: -1,
            remise: body.remise,
        }).$returningId();

        await db.insert(venteproduits).values(body.cart.map((item: any) => ({
            ventes_id: lastSale[0].id,
            produits_id: item.id,
            quantite: item.quantity,
            pu: item.selected_ppv,
            remise: item.remise,
            type_remise: item.type_remise,
            PPV_app: item.selected_ppv,
            PPH_app: item.pph?.[0] ?? 0,
            created_at: formattedDate,
            updated_at: formattedDate,
            deleted_at: null,
            pharmacy_id: user.company_id,
        })));

        return NextResponse.json(
            { message: 'Sale added successfully', status: 200, id : lastSale[0].id}
        );
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add sale' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic'