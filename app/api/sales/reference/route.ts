import { NextResponse } from 'next/server';
import { db } from '@/db';
import { ventes } from '@/db/schema';
import { format, startOfDay, endOfDay } from 'date-fns';
import { desc, between } from 'drizzle-orm';
import { NextRequest } from 'next/server';

function generateReference(date: Date, sequence: number): string {
    const formattedDate = format(date, 'yyMMdd');
    return `V${formattedDate}-${sequence.toString().padStart(4, '0')}`;
}

async function getLastSequence(date: Date): Promise<number> {
    const todayStart = startOfDay(date).toISOString();
    const todayEnd = endOfDay(date).toISOString();
    
    const lastSale = await db.select({ reference: ventes.reference, created_at: ventes.created_at })
        .from(ventes)
        .where(between(ventes.created_at, todayStart, todayEnd))
        .orderBy(desc(ventes.id))
        .limit(1)
        .execute();

    if (lastSale && lastSale[0]?.reference) {
        const lastSequence = parseInt(lastSale[0].reference.split('-')[1], 10);
        return lastSequence + 1;
    }
    return 1; // Start with 1 if no previous reference is found for the given date
}

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        let date = new Date();
        if (req.nextUrl.searchParams.has('date')) {
            date = new Date(req.nextUrl.searchParams.get('date') as string);
        }
        const sequence = await getLastSequence(date);
        const reference = generateReference(date, sequence);
        return NextResponse.json({ reference }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get next reference' }, { status: 500 });
    }
}