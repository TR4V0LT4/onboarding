"use server";

import { db } from "@/db";
import { users as dbUsers } from "@/db/schema"
import { and, eq, isNotNull, isNull } from "drizzle-orm";
export async function getUser(email: string) {
    const result = await db.select().from(dbUsers).where(eq(dbUsers.email, email));
    return result[0];
}