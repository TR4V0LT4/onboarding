'use client'
import { Button } from "@/components/ui/button";
import ShowColumn from "./show-column";

import * as XLSX from 'xlsx';
import { Sale } from "@/types/types";
import { getSales } from "@/lib/sales/getSales";
import { formatDate } from "./salespage";
import { utils, writeFile } from "xlsx-js-style";
import { convertToExcel } from "./convert-to-exel";
import { cookies } from "next/headers";
import TableButtons from "./table-buttons";
import { generatePrintContent } from "./generatepdf";

type Params = {
    page: number;
    per_page: number;
    search: string;
    from: string;
    to: string;
    orderBy: string;
    order: string;
  };

 const replaceid = (id: string) => {
    if (id === "waiting") {
        return "Livrée/En attente";
    } else if (id === "reference") {
        return "Références";
    } else if (id === "quantity") {
        return "Qtés";
    } else if (id === "total") {
        return "Totaux";
    } else if (id === "credit") {
        return "Crédits";
    } else if (id === "state") {
        return "États";
    } else if (id === "client") {
        return "Clients";
    }else if (id === "date") {
        return "Dates";
    } else {
        return id;
    }
}

  // Helper function to fetch all data based on filtered parameters
const fetchData = async (filters: any) => {
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/sales/getSales?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

function ActionsButtons({ table, data, params } : { table: any, data: any, params: Params }) {

    async function exportData() {
            const param: Params = {
            page: Number(params.page) || 1,
            per_page: 10000,
            search: (params.search as string) || "",
            from: (params.from as string) || "",
            to: (params.to as string) || "",
            orderBy: (params.orderBy as string) || "date",
            order: (params.order as string) || "desc",
        };
      
      const response = await fetch(`/api/sales/getsales?per_page=${param.per_page}&from=${param.from}&to=${param.to}&search=${param.search}&orderBy=${param.orderBy}&order=${param.order}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            // body: JSON.stringify(param),
          });
      
          const all = await response.json();

        //   const all =  await getSales(param, "my-sales");
    
          const mappedSales: Sale[] = all.data?.map((sale: any )=> ({ 
                id: sale.id.toString(),
                Livrée: sale.waiting === "1",
                Références: sale.reference || "", 
                Clients: sale.client || "",
                Dates: formatDate(sale.date) || "",
                Qtés: sale.quantity,
                Totaux: parseFloat(sale.total?.toString() || "0"),
                Crédits: parseFloat(sale.credit?.toString() || "0"),
                États: sale.state || "",
        }));

            // Generate excel data from table data and download it as excel file 
    const excelBlob = convertToExcel(mappedSales, params);
    if (excelBlob) {
      const url = URL.createObjectURL(excelBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ventes${new Date().toISOString()}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    }

        

        // convertToExcel(mappedSales);
	}

    
  const printData = async () => {
    const param: Params = {
        page: Number(params.page) || 1,
        per_page: 10000,
        search: (params.search as string) || "",
        from: (params.from as string) || "",
        to: (params.to as string) || "",
        orderBy: (params.orderBy as string) || "date",
        order: (params.order as string) || "desc",
    };
  
      const response = await fetch(`/api/sales/getsales?per_page=${param.per_page}&from=${param.from}&to=${param.to}&search=${param.search}&orderBy=${param.orderBy}&order=${param.order}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(param),
      });
  
      const all = await response.json();

    //   const all =  await getSales(param, "my-sales");

      const mappedSales: Sale[] =  all.data?.map((sale: any )=> ({ 
            id: sale.id.toString(),
            Livrée: sale.waiting === "1",
            Références: sale.reference || "", 
            Clients: sale.client || "",
            Dates: formatDate(sale.date) || "",
            Qtés: sale.quantity,
            Totaux: parseFloat(sale.total?.toString() || "0"),
            Crédits: parseFloat(sale.credit?.toString() || "0"),
            États: sale.state || "",
    }));

    const printContent =  generatePrintContent(mappedSales, param);
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

    // const printData = () => {
    //     // print table data
    //     window.print();
    //     // how can i pass data and make it a header and a table and a foter in the print page

    //   };
    

    return (
    <div className="flex gap-4 pl-5">
        <div
            className="bg-withe rounded-xl shdow-md hover:bg-gray-100 px-1 py-2"
        >
            <ShowColumn table={table}/>
        </div>
        <TableButtons
            className="bg-withe hover:bg-gray-100 px-1 py-2"
            onClick={exportData}
            content={<svg width="25" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2857 1L16.2941 7.25M10.2857 1V6.13889C10.2857 6.75254 10.7748 7.25 11.3782 7.25H16.2941M10.2857 1H3.18487C1.9782 1 1 1.99492 1 3.22222V18.7778C1 20.0051 1.9782 21 3.18487 21H3.73109M16.2941 7.25V18.7778C16.2941 20.0051 15.3159 21 14.1092 21H13.563M8.64706 11V19.8889M8.64706 19.8889L5.91597 17.1111M8.64706 19.8889L11.3782 17.1111" stroke="#344051" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>}
            toltip="Exporter"
        />
        <TableButtons
            className="bg-withe hover:bg-gray-100 px-1 py-2"
            onClick={printData}
            content={<svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.2308 17.25H24.0769V8.5C24.0769 7.11929 22.9289 6 21.5128 6H3.5641C2.14799 6 1 7.11929 1 8.5V17.25H4.84615M20.2308 9.75H17.6667M18.9487 6V3.5C18.9487 2.11929 17.8007 1 16.3846 1H8.69231C7.27619 1 6.12821 2.11929 6.12821 3.5V6H18.9487ZM6.12821 13.5H18.9487V18.5C18.9487 19.8807 17.8007 21 16.3846 21H8.69231C7.27619 21 6.12821 19.8807 6.12821 18.5V13.5Z" stroke="#344051" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>}
            toltip="Imprimer"
        />
    </div>
    );
}

export default ActionsButtons;