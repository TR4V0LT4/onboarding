'use server';

import { general_conditions } from "@/db/schema";
import { db } from "@/db";
import { desc, asc } from 'drizzle-orm';

export default async function getCGU(split: boolean = false) {
    try {
        const cgu = (await db.select().from(general_conditions).orderBy(desc(general_conditions.created_at)).limit(1).execute())[0];
        return cgu.content
    }
    catch (error) {
        ////console.log(error);
        return null;
    }
}