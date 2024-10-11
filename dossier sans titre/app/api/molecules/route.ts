import { NextRequest } from "next/server";
import { db } from "@/db";
import { molecules } from "@/db/schema";
import { NextResponse } from "next/server";
import { Molecule } from "@/types/types";
import { and, like } from "drizzle-orm";

export async function GET(request: NextRequest) {
    const searchTerm = request.nextUrl.searchParams.get('search');

    if (!searchTerm) {
        return NextResponse.json({ data: [] });
    }
    const res = await db
        .select({
            id: molecules.id,
            name: molecules.name,
        })
        .from(molecules)
        .where(like(molecules.name, `${searchTerm}%`))
        .orderBy(molecules.name)
    
    const data: Molecule[] = res.map((molecule) => ({
        id: molecule.id,
        name: molecule.name,
    }));

    console.log(data);
    return NextResponse.json({ data });
}

export const dynamic = 'force-dynamic'

