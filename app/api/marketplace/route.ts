import { getMarketplaces } from "@/actions/marketplace";

export async function GET() {
	const	data = await getMarketplaces();

	return Response.json({
		data: data
	});
}

export const dynamic = 'force-dynamic'
