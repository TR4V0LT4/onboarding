import { db } from '@/db'; // Ensure this path is correct
import getSession from '@/lib/getsession';
import { ventes, clients } from '@/db/schema'; // Import the schema for ventes and clients
import { and, count, eq, sql, desc, or, like, gte, lte, between } from 'drizzle-orm';
import { addDays } from 'date-fns';
import { cookies } from 'next/headers'; // Ensure this is in a server context
type Params = {
    page: number;
    per_page: number;
    search?: string; // Add search parameter
    from?: string; // Add from parameter
    to?: string; // Add to parameter
    orderBy?: string; // Add orderBy parameter
    order?:  string; // Add order parameter with correct type
};

// Define a mapping object for valid columns
const validColumns = {
    id: ventes.id,
    waiting: ventes.livree,
    reference: ventes.reference,
    client: ventes.client_id,
    date: ventes.created_at,
    quantity: ventes.qte_total,
    total: ventes.montant_PU,
    credit: ventes.montant_credit,
    state: ventes.status,
    creer_par: ventes.creer_par,
    // Add other columns as needed
  };

  // Function to get the corresponding column from the ventes table
function getOrderColumn(orderBy: keyof typeof validColumns) {
    return validColumns[orderBy];
  }
  
  // Function to get order parameters
  function getOrderParams(params: Params) {
    const orderBy = params.orderBy || 'date'; // Default to 'created_at' if not provided
    const order = params.order || 'desc'; // Default to 'asc' if not provided
    return { orderBy, order };
  }

export async function getSales(params: Params, path: string) {

    const user = await getSession();

    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD

    // Define the date range condition
    const dateCondition = params?.from && params?.to
    ? between(
            ventes.created_at,
            params.from.toString().split('T')[0],
            addDays(new Date(params.to.toString().split('T')[0]), 1).toISOString().split('T')[0]
      )
    : params?.from
    ? between(
        ventes.created_at,
        params.from.toString().split('T')[0],
        addDays(todayString, 1).toISOString().split('T')[0]
    )
    // gte(ventes.created_at, params.from.toString().split('T')[0])
    : params?.to
    ? lte(ventes.created_at, params.to.toString().split('T')[0])
    : sql`1=1`; // Fallback to a condition that is always true

    // Define the search condition
    const searchCondition = params?.search && params.search.length
    ? 
    or(
        like(ventes.reference, `%${params.search}%`),
        like(clients.name, `${params.search}%`),
        like(ventes.montant_credit, `${params.search}%`),
        like(ventes.montant_PU, `${params.search}%`),
        like(ventes.qte_total, `%${params.search}%`)
      )
    // sql`${ventes.reference} LIKE ${`%${params.search}%`} OR ${clients.name} LIKE ${`%${params.search}%`} OR ${ventes.montant_credit} LIKE ${`%${params.search}%`} OR ${ventes.montant_PU} LIKE ${`%${params.search}%`} OR ${ventes.qte_total} LIKE ${`%${params.search}%`}`
    : dateCondition;

        // Ensure user?.company_id is always a string
        const companyId = user?.company_id ?? '';

        // Use the companyId in the comparison
        const condition = eq(ventes.pharmacy_id, companyId);
    
    const todayCondition = gte(ventes.created_at, todayString);

  const perPage =  Number(params?.per_page) || 10; // Fallback to 10 if per_page is not valid
  const offset = (Number(params?.page) - 1) * perPage;

    const {orderBy = 'created_at', order = 'desc' } = getOrderParams(params); // Get the order by and order parameters

  // Get the corresponding column from the ventes table
  const orderColumn = orderBy === 'client' ? clients.name : getOrderColumn(orderBy as keyof typeof validColumns);

  const limitValue = path === 'todayssales' ? 1000 : perPage;

    const { data, total } = await db.transaction(async (tx) => {
        // Query for ventes data
      const data = await tx
        .select({
          id: ventes.id,
          waiting: ventes.livree,
          reference: ventes.reference,
          client: clients.name,
          date: ventes.created_at,
          quantity: ventes.qte_total,
          total: ventes.montant_PU,
          credit: ventes.montant_credit,
          state: ventes.status,
          creer_par: ventes.creer_par,
        })
        .from(ventes)
        .leftJoin(clients, eq(clients.id, ventes.client_id))
        .where(and(
                condition,
                path == "todaysales" ? todayCondition : dateCondition,
                searchCondition,
            )
        )
        .orderBy(order === 'asc' ? orderColumn : desc(orderColumn))// Order by the specified column and order
        .limit(limitValue) // Correct LIMIT usage
        .offset(offset) // Correct OFFSET usage

        // Query for total count of ventes
        const total = await tx
        .select({ count: count() })
        .from(ventes)
        .leftJoin(clients, eq(clients.id, ventes.client_id))
        .where(and(
            condition,
            path == "todaysales" ? sql`DATE(${ventes.created_at}) = ${todayString}` : dateCondition,
            searchCondition,
        )
    );
    
      return {
        data,
        total: total[0].count,
      };
    });

    return { data, total };
}
