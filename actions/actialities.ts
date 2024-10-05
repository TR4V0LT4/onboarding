"use server";

import { db } from "@/db";
import { actualities, users, actualite_like } from "@/db/schema";
import { Actuality } from "@/types/actualities";
import { and, eq, desc, or, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function getActialities(request: NextRequest) {
	const	searchParams = request.nextUrl.searchParams
	const	page = searchParams.get('page');
	const	user = searchParams.get('user');
	const	actualitys = await db
		.select({
			source: actualities.source,
			created_at: actualities.created_at,
			libelle: actualities.libelle,
			title: actualities.title,
			content: actualities.content,
			id: actualities.id,
			image: actualities.image,
			likes: sql`COUNT(${actualite_like.id})`,
			liked: sql`SUM(CASE WHEN actualite_like.user_id = ${user} THEN 1 ELSE 0 END) > 0`
		})
		.from(actualities)
		.leftJoin(users, eq(actualities.created_by, users.id))
		.leftJoin(actualite_like, eq(actualite_like.actualite_id, actualities.id))
		.where(or(eq(actualities.type, "actualite"), eq(actualities.type, "formations")))
		.offset(10 * parseInt(page || "0"))
		.groupBy(actualities.id, actualities.source, actualities.created_at, actualities.libelle, actualities.title, actualities.content, actualities.image)
		.orderBy(desc(actualities.created_at))
		.limit(5)
	const	now = new Date();

	function getDifferenceString(futureDateString: string | null) {
		const	created_at = new Date(futureDateString ? futureDateString : "");
		const	diff = now.getTime() - created_at.getTime();
		const	seconds = Math.floor(diff / 1000);
		const	minutes = Math.floor(seconds / 60);
		const	hours = Math.floor(minutes / 60);
		const	days = Math.floor(hours / 24);
		const	months = Math.floor(days / 30);
		const	years = Math.floor(months / 12);

		return `il y a ${ years > 0 ? years + " an" + (years > 1 ? "s" : "") : ( months > 0 ? months + " mois" : ( days > 0 ? days + " jour" + (days > 1 ? "s" : "") : ( hours > 0 ? hours + " heure" + (hours > 1 ? "s" : "") : ( minutes > 0 ? minutes + " minute" + (minutes > 1 ? "s" : "") : ( seconds + " seconde" + (seconds > 1 ? "s" : "") ) ) ) ) ) }`;
	}

	const	result: Actuality[] = actualitys.map( (actuality) => {
		return {
			userName: actuality.source ? actuality.source : "Blinkpharma",
			durations: getDifferenceString(actuality.created_at),
			labeled: actuality.libelle,
			title: actuality.title,
			content: actuality.content,
			likes: actuality.likes as number,
			liked: actuality.liked as number > 0,
			id: actuality.id,
			image: actuality.image ? `https://crm.blinkpharmacie.ma/${actuality.image}` : null
		}
	});

	return result;
}

export async function like(user_id: string, actualite_id: string) {
	const	time = new Date().toISOString().slice(0, 19).replace("T", " ");

	await db.insert(actualite_like).values({ actualite_id: actualite_id, user_id: user_id, created_at: time, updated_at: time });
}

export async function disLike(user_id: string, actualite_id: string) {
	await db
		.delete(actualite_like)
		.where(and(eq(actualite_like.actualite_id, actualite_id), eq(actualite_like.user_id, user_id)));
}
