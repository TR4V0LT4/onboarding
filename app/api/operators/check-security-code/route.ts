import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const operator = await db.select({ id: users.id })
            .from(users)
            .where(
                and(
                    eq(users.id, body.id),
                    eq(users.code, body.security_code)
                )
            )

        if (!operator) {
            return NextResponse.json({ error: 'Invalid security code' }, { status: 400 });
        }

        return NextResponse.json(operator);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to check security code' }, { status: 500 });
    }
}