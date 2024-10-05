"use server";

import { getOrders } from "@/actions/orders";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const	data = await getOrders(request);

	return Response.json({
		data: data
	});
}