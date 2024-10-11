import { NextResponse } from 'next/server';
import { getSales } from '@/lib/sales/getSales';

export async function GET(request: Request) {
  // Parse query params from the request URL
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const per_page =  '10000';
  const search = searchParams.get('search') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const orderBy = searchParams.get('orderBy') || 'date';
  const order = searchParams.get('order') || 'desc';

  const params = {
    page: Number(page),
    per_page: Number(per_page),
    search: search as string,
    from: from as string,
    to: to as string,
    orderBy: orderBy as string,
    order: order as string,
  };

  try {
    const data = await getSales(params, "my-sales");
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("Params: ", error);
    return NextResponse.json({ error: 'Failed to fetch sales data' }, { status: 500 });
  }
}

// import { getSales } from '@/lib/sales/getSales';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';

// export async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { page, per_page, search, from, to, orderBy, order } = req.query;

  
// //   const sessionCookie = cookies().get('/api/sales/getSales'); // Ensure this is in API route/server-side code

// //   if (!sessionCookie) {
// //     throw new Error('No session cookie found');
// //   }

//   const params = {
//     page: Number(page) || 1,
//     per_page: Number(per_page) || 10000,
//     search: search as string || "",
//     from: from as string || "",
//     to: to as string || "",
//     orderBy: orderBy as string || "date",
//     order: order as string || "desc",
//   };

//   try {
//       const data = getSales(params, "my-sales");
//       console.log("Params: ", data);
//       res.status(200).json(data);
//     } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch sales data' });
//   }
// }