"use server";

import { getAllOrders } from "@/actions/orders";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const	data = await getAllOrders(request);

	return Response.json({
		data: data
	});
}
