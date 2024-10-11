import SalesPage from "@/components/sales/todaysales/salespage";
import { getSales } from "@/lib/sales/getSales";

type Params = {
    page: number;
    per_page: number;
    search: string; // Add search parameter
    from: string; // Add from parameter
    to: string; // Add to parameter
    orderBy: string; // Add orderBy parameter
    order: string; // Add order parameter with correct type
};

async function TodaySalesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    // const params : Params= {page: 1, per_page: 10};
    // const params : Params = {page: Number(searchParams.page) || 1, per_page: Number(searchParams.per_page) || 10, search: searchParams.search as string || "", from: searchParams.from as string || "", to: searchParams.to as string || ""};
    
    // const order = (searchParams.order as string) === "asc" || (searchParams.order as string) === "desc" ? (searchParams.order as "asc" | "desc") : "desc";
    const params: Params = {
      page: Number(searchParams.page) || 1,
      per_page: Number(searchParams.per_page) || 10,
      search: (searchParams.search as string) || "",
      from: (searchParams.from as string) || "",
      to: (searchParams.to as string) || "",
      orderBy: (searchParams.orderBy as string) || "date",
      order: (searchParams.order as string) || "desc",
    };
    
    const all =  await getSales(params, "todaysales");

  return (
    <div className="h-full w-full">
        <SalesPage path="todaysales" all={all}  params={params}/>
    </div>
  );
}

export default TodaySalesPage;