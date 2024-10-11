"use server";

import { db } from "@/db";
import { actualities, users } from "@/db/schema";
import { NextRequest } from "next/server";
import { eq, desc } from "drizzle-orm";

export async function getDoctorNews(request: NextRequest) {
	const	doctinews = await db
		.select({
			created_at: actualities.created_at,
			content: actualities.content,
			id: actualities.id,
			source: actualities.source
		})
		.from(actualities)
		.limit(3)
		.leftJoin(users, eq(users.id, actualities.created_by))
		.where(eq(actualities.type, "doctinews"))
		.orderBy(desc(actualities.created_at));

	return doctinews.map((doctinew) => {
		const	created_at = new Date(doctinew.created_at ? doctinew.created_at : "");
		const	now = new Date();
		const	diff = now.getTime() - created_at.getTime();
		const	seconds = Math.floor(diff / 1000);
		const	minutes = Math.floor(seconds / 60);
		const	hours = Math.floor(minutes / 60);
		const	days = Math.floor(hours / 24);
		const	months = Math.floor(days / 30);
		const	years = Math.floor(months / 12);

		return {
			userName: doctinew.source ? doctinew.source : `Blinkpharma`,
			durations: `il y a ${ years > 0 ? years + " an" + (years > 1 ? "s" : "") : ( months > 0 ? months + " mois" : ( days > 0 ? days + " jour" + (days > 1 ? "s" : "") : ( hours > 0 ? hours + " heure" + (hours > 1 ? "s" : "") : ( minutes > 0 ? minutes + " minute" + (minutes > 1 ? "s" : "") : ( seconds + " seconde" + (seconds > 1 ? "s" : "") ) ) ) ) ) }`,
			content: doctinew.content,
			id: doctinew.id
		};
	});
}
