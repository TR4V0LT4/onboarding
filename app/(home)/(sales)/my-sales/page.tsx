import SalesPage from "@/components/sales/mysales/salespage";
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

async function MySalesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const params: Params = {
      page: Number(searchParams.page) || 1,
      per_page: Number(searchParams.per_page) || 5,
      search: (searchParams.search as string) || "",
      from: (searchParams.from as string) || "",
      to: (searchParams.to as string) || "",
      orderBy: (searchParams.orderBy as string) || "date",
      order: (searchParams.order as string) || "desc",
    };

    const all =  await getSales(params, "my-sales");

  return (
    <div className="bg-white h-full w-full">
        <SalesPage path="my-sales" all={all}  params={params}/>
    </div>
  );
}

export default MySalesPage;