"use server";

import { db } from "@/db";
import { orders, suppliers } from "@/db/schema";
import { eq, and, isNull, desc, sql, like, or } from "drizzle-orm";
import { NextRequest } from "next/server";

function transformDate(input: string): string {
    const [datePart, timePart] = input.split(' ');
    const [year, month, day] = datePart.split('-');
	const [hour, minute, second] = timePart.split(':');

	return `${day}/${month}/${year} ${hour}:${minute}`;
}

function formatNumberWithSpace(number: number): string {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number).replace(/,/g, '\u00A0');
}

export async function getOrders(request: NextRequest) {
	const	companyId = request.nextUrl.searchParams.get("company_id");
	let		page = request.nextUrl.searchParams.get("page");
	const	pageSize = 5;
	const	search = request.nextUrl.searchParams.get("search");
	const	sort = request.nextUrl.searchParams.get("sort");
	
	if (!companyId) {
		return [];
	}
	const	wheres = [];

	wheres.push(eq(orders.pharmacy_id, companyId), isNull(orders.deleted_at));
	if (search) {
		wheres.push(
			or(
				like(orders.reference, `%${search}%`),
				like(suppliers.name, `%${search}%`)
			)
		);
	}
	const	neededOrders = await db
		.select({
			id: orders.id,
			status: orders.order_status_id,
			reference: orders.reference,
			supplier: suppliers.name,
			date: orders.created_at,
			units: orders.nb_products,
			amount: orders.paid_price_ttc,
			count: sql<number>`COUNT(*) OVER()`,
			connectivity: orders.order_type
		})
		.from(orders)
		.leftJoin(suppliers, eq(orders.wholesaler_id, suppliers.id))
		.where(and(...wheres))
		.limit(pageSize)
		.offset(page ? (parseInt(page) - 1) * pageSize : 0)
		.orderBy(desc(orders.created_at));

	return neededOrders.map((orders) => {
		return {
			...orders,
			date: transformDate(orders.date as string),
			amount: formatNumberWithSpace(parseFloat(orders.amount ? orders.amount : "0")),
			supplier: orders.supplier ? orders.supplier : "Non défini"
		}
	});
}

export async function getAllOrders(request: NextRequest) {
	const	companyId = request.nextUrl.searchParams.get("company_id");

	if (!companyId) {
		return [];
	}
	const	allOrders = await db
		.select({
			id: orders.id,
			status: orders.order_status_id,
			reference: orders.reference,
			supplier: suppliers.name,
			date: orders.created_at,
			units: orders.nb_products,
			amount: orders.paid_price_ttc,
			connectivity: orders.order_type
		})
		.from(orders)
		.leftJoin(suppliers, eq(orders.wholesaler_id, suppliers.id))
		.where(and(
				eq(orders.pharmacy_id, companyId),
				isNull(orders.deleted_at)
			))
		.orderBy(desc(orders.created_at))

	return allOrders.map((orders) => {
		return {
			...orders,
			// date: transformDate(orders.date as string),
			supplier: orders.supplier ? orders.supplier : "Non défini",
			// amount: formatNumberWithSpace(parseFloat(orders.amount ? orders.amount : "0"))
			amount: parseFloat(orders.amount ? orders.amount : "0")
		}
	});
}
