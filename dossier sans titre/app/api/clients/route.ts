import { db } from '@/db';
import { NextResponse } from 'next/server';
import { clients } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';
import getSession from '@/lib/getsession';
import { Client } from '@/types/types';
import { UserSession } from '@/types/usersession';

export async function GET(request: Request) {
    try {
        const user: UserSession | null = await getSession();
        if (!user?.id) {
            throw new Error('User not authenticated');
        }

        const clientsData = await db.select({
            id: clients.id,
            name: clients.name,
            firstName: clients.first_name,
            type: clients.type,
            phone: clients.tele,
            email: clients.email,
            credit: clients.credit,
            plafan_credit: clients.plafan_credit,
        }).from(clients).where(eq(clients.creer_par, user?.id));

        const mappedClientsData: Client[] = clientsData.map(client => ({
            id: client.id.toString(),
            name: client.name || "",
            first_name: client.firstName || "",
            type: client.type || "",
            phone: client.phone || "",
            email: client.email || "",
            credit: parseFloat(client.credit) || 0,
            plafan_credit: parseFloat(client.plafan_credit ?? '0') || 0,
        }));
        return NextResponse.json(mappedClientsData);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
    }
}