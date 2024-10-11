"use server";

import { db } from "@/db";
import { companies, lab_offer_conditions, lab_offers, lab_packs, remises } from "@/db/schema";
import { Marketplace } from "@/types/marketplace";
import { eq, and, gt, lt, isNull } from "drizzle-orm";

export async function getMarketplaces() {
	const	date = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const	labOffers = await db
							.select()
							.from(lab_offers)
							.leftJoin(companies, and(eq(lab_offers.lab_id, companies.id), isNull(companies.deleted_at)))
							.leftJoin(lab_packs, and(eq(lab_packs.lab_offer_id, lab_offers.id), isNull(lab_packs.deleted_at)))
							.leftJoin(lab_offer_conditions, and(
									eq(lab_offer_conditions.lab_pack_id, lab_packs.id),
									eq(lab_offer_conditions.reward_type, "discount"),
									isNull(lab_offer_conditions.deleted_at)
								))
							.where(and(
									eq(lab_offers.active, 1),
									gt(lab_offers.end_date, date),
									lt(lab_offers.start_date, date),
									isNull(lab_offers.deleted_at)
								))
							.orderBy(lab_offers.end_date);
	const validLabOffers: Marketplace[] = await Promise.all(labOffers.map(async (offer) => {
		return {
			id: offer.lab_offers.id,
			logo: offer.companies?.logo ? `https://crm.blinkpharmacie.ma/uploads/${offer.companies?.logo}` : null,
			name: offer.companies?.name,
			remise: offer.lab_offer_conditions?.reward?.slice(0, 2),
			type: offer.companies?.company_type,
			endDate: getDifferenceString(offer.lab_offers.end_date)
		}
	}));

	function getDifferenceString(futureDateString: string | null) {
		if (!futureDateString)
			return null;
		const futureDate = new Date(futureDateString);
		const now = new Date();
	  
		let diff = futureDate.getTime() - now.getTime();
	  
		const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
		diff -= years * 1000 * 60 * 60 * 24 * 365;
	  
		const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
		diff -= months * 1000 * 60 * 60 * 24 * 30;
	  
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		diff -= days * 1000 * 60 * 60 * 24;
	  
		const hours = Math.floor(diff / (1000 * 60 * 60));
		diff -= hours * 1000 * 60 * 60;
	  
		const minutes = Math.floor(diff / (1000 * 60));
		diff -= minutes * 1000 * 60;
	  
		return `${ years > 0 ? years + "an: " : "" }${ months > 0 ? months + "m: " : "" }${ days > 0 ? days + "j: ": "" }${ hours > 0 ? hours + "h: ": "" }${ minutes > 0 ? minutes + "min" : "" }`;
	}

	return Object.values(
		validLabOffers.reduce<Record<string, Marketplace>>((acc, curr) => {
			const	id = curr.id;

			if (!curr.remise)
				return acc;
			const	remise =parseInt(curr.remise);

			if (!acc[id] || remise > parseInt(acc[id].remise as string))
				acc[curr.id] = curr;

			return acc;
		}, {})
	).slice(0, 3);
}
