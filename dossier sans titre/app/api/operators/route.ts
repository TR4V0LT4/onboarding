import { NextResponse } from "next/server";
import { db } from "@/db/";
import getSession from "@/lib/getsession";
import { users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { UserSession } from "@/types/usersession";

export async function GET(request: Request) {
    try {
        const user: UserSession | null = await getSession();
        if (!user?.id) {
            throw new Error('User not authenticated');
        }
        const operators = await db.select({
            id: users.id,
            first_name: users.first_name,
            last_name: users.last_name,
            role: users.role_id,
        })
        .from(users)
        .where(
            and(
                eq(users.company_id, user?.company_id),
                // eq(users.role_id, "operator")
            )
        )
        .limit(20);

        return NextResponse.json(operators);

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch operators' }, { status: 500 });
    }
}