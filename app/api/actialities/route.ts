import { disLike, getActialities, like } from "@/actions/actialities";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const	data = await getActialities(request);

	return Response.json({
		data: data
	});
}

export async function POST(request: NextRequest) {
	const	body = await request.json();

	like(body.user, body.actuality);
	return Response.json(200);
}

export async function DELETE(request: NextRequest) {
	const	body = await request.json();

	disLike(body.user, body.actuality);
	return Response.json(200);

}

export const dynamic = 'force-dynamic'
