import { getSales } from '@/lib/sales/getSales';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, per_page, search, from, to, orderBy, order } = req.query;

  
  const sessionCookie = cookies().get('/api/sales/getSales'); // Ensure this is in API route/server-side code

  if (!sessionCookie) {
    throw new Error('No session cookie found');
  }

  const params = {
    page: Number(page) || 1,
    per_page: Number(per_page) || 10000,
    search: search as string || "",
    from: from as string || "",
    to: to as string || "",
    orderBy: orderBy as string || "date",
    order: order as string || "desc",
  };

  try {
      const data = getSales(params, "my-sales");
      console.log("Params: ", data);
      res.status(200).json(data);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales data' });
  }
}