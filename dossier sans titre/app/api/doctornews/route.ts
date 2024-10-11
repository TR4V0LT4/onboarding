import { getDoctorNews } from "@/actions/doctornews";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const	data = await getDoctorNews(request);

	return Response.json({
		data: data
	});
}

export const dynamic = 'force-dynamic'
