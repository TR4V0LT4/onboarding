import { DataTable } from "@/components/sales/mysales/data-table";
import Link from "next/link";
import States from "@/components/sales/mysales/states";
import { columns } from "@/components/sales/mysales/columns"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import { Sale } from "@/types/types";
import NewOrderIcon from "@/public/new-order.svg";
import ManageFavIcon from "@/public/manage-fav.svg";
import Heading from "@/components/sales/mysales/heading";
import MarketPlace from "@/components/home/marketplace";


  
type Params = {
    page: number;
    per_page: number;
    search: string;
    from: string;
    to: string;
    orderBy: string;
    order: string;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

function  SalesPage({params, all, path}: {params : Params, all : any, path: string}) {

    const mappedSales: Sale[] = all.data.map((sale: any )=> ({
        id: sale.id.toString(),
        waiting: sale.waiting === "1" || sale.waiting === 'Oui',
        reference: sale.reference || "", 
        client: sale.client || "",
        date: formatDate(sale.date) || "",
        quantity: sale.quantity,
        total: parseFloat(sale.total?.toString() || "0"),
        credit: parseFloat(sale.credit?.toString() || "0"),
        state: sale.state || "", 
        creer_par: sale.creer_par || "",
    }));

    const data = mappedSales;
    const total = all.total
    return (
        <main className="p-[22px]">
        <div
                  className="h-20 w-full bg-[#F6F9FF] mb-[30px] border-dashed border-[1px] border-[#2C71F6]"
        />
        <Heading/>
        <div className="flex flex-row gap-x-2">
          <Button className="bg-white border border-[#2C71F6] text-[#2C71F6] rounded-[8px] gap-2 hover:bg-blue-300 hover:text-white hover:border-white">
            <NewOrderIcon />
            Nouvelle commande
          </Button>
          <Button className="bg-white border text-[#344051] rounded-[8px] gap-2 hover:bg-gray-300">
            <ManageFavIcon />
            Gérer mes favoris
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-10 w-full" >
          <Card className="p-0 col-span-3 flex flex-col rounded-[20px] border-2 border-white w-full">
            <CardHeader className="flex flex-row justify-between">
              <h1 className="text-[#344051] font-bold text-lg">Les ventes d'aujourd'hui</h1>
              <States />
            </CardHeader>
            <Separator className="self-center justify-self-center w-[97%]"/>
            <CardContent>
              <DataTable columns={columns} data={data} params={params} total={total} path={path} />
            </CardContent>
          </Card>
                  <MarketPlace /> 
              </div>
      </main>
        // <div>
        //     <div className="flex justify-end items-center gap-3 pr-10">
        //         <Button className="bg-white text-[#2C71F6] border border-[#2C71F6] hover:bg-[#2C71F6] hover:text-white my-[30px]">Afficher les ventes annulées</Button>
        //         <Link href='/add-sale'>
        //             <Button className="bg-[#2C71F6] text-white border border-[#2C71F6] hover:bg-white hover:text-[#2C71F6] " >
        //                 Nouvelle vente (n)
        //             </Button>
        //         </Link>
        //     </div>
        //     <div className="px-10"> 
        //         <div className={`h-full$`}>
        //             <Card className="p-0 col-span-3 flex flex-col rounded-[20px] border-2 border-white w-full">
        //                 <CardHeader className="flex flex-row justify-between">
        //                     <h1 className="text-[#344051] font-bold text-lg">Toutes mes ventes</h1>
        //                     <States />
        //                 </CardHeader>
        //                 <Separator className="self-center justify-self-center w-[97%]"/>
        //                 <CardContent>
        //                     <DataTable columns={columns} data={data} params={params} total={total} path={path}/>
        //                 </CardContent>
        //             </Card>
        //         </div>
        //     </div>
        // </div>
    );
}

export default SalesPage;