import { useRouter } from "next/navigation";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  


type Params = {
    page: number;
    per_page: number;
    search: string; // Add search parameter
    from: string; // Add from parameter
    to: string; // Add to parameter
    orderBy?: string; // Add orderBy parameter
    order?: string; // Add order parameter with correct type
};

function TablePagination({ table, params, total, path } : { table: any, params: Params, total: number, path: string}) {
    const router = useRouter();

    const totalPages = Math.ceil(total / params?.per_page) ?? 1;
    const currentPage = Number(params?.page);

    // Calculate start and end pages to ensure only 5 pages are displayed
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Adjust if less than 5 pages are displayed
    if (endPage - startPage < 4) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + 4);
        } else if (endPage === totalPages) {
            startPage = Math.max(1, endPage - 4);
        }
    }

    return (
        <Pagination>
            <PaginationContent className="space-x-2">
                <PaginationItem
                    className={params?.page <= 1 ? "opacity-50" : ""}
                >
                    <PaginationPrevious
                        className="cursor-pointer bg-white w-[32px] h-[32px] rounded-[8px] border-[2px] border-[#CED2DA] p-0 hover:bg-[#F3F3F3] hover:shadow-product1 disabled:border-[#F2F4F7]"
                        onClick={() => {
                            if (params?.page > 1) {
                                router.push(`/${path}?page=${params?.page - 1}&per_page=${params?.per_page}&search=${params?.search}&from=${params?.from}&to=${params?.to}&orderBy=${params?.orderBy}&order=${params?.order}`)
                            }
                        }}
                    />
                </PaginationItem>
                    {startPage > 1 && (
                    <>
                        <PaginationItem
                        >
                            <PaginationLink
                                className="cursor-pointer bg-white w-[32px] h-[32px] rounded-[8px] hover:border-[2px] hover:border-[#CED2DA] p-0 hover:bg-[#F3F3F3] hover:shadow-product1 disabled:border-[#F2F4F7]"
                                onClick={() => {
                                router.push(`/${path}?page=1&per_page=${params?.per_page}&search=${params?.search}&from=${params?.from}&to=${params?.to}&orderBy=${params?.orderBy}&order=${params?.order}`);
                                }}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {(params?.page > 4) &&
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        }
                    </>
                    )}
                <PaginationItem className={`space-x-2 ${totalPages === 1 && "opacity-50"}`}>
                    {Array.from({ length: endPage - startPage + 1})
                          .map( (_, i) => {
                            const pageIndex = startPage + i;
                        return (
                        <PaginationLink 
                            key={pageIndex}
                            onClick={() => {
                                if (pageIndex !== currentPage) {
                                    router.push(`/${path}?page=${pageIndex}&per_page=${params?.per_page}&search=${params?.search}&from=${params?.from}&to=${params?.to}&orderBy=${params?.orderBy}&order=${params?.order}`)
                                }
                            }}
                            className={`cursor-pointer bg-white w-[32px] h-[32px]  rounded-[8px] hover:border-[2px] hover:border-[#CED2DA] p-0 hover:bg-[#F3F3F3] hover:shadow-product1 disabled:border-[#F2F4F7] ${pageIndex === currentPage && "border-[2px] border-[#CED2DA] text-[#2C71F6] bg-withe" }`}
                        >
                            
                            {pageIndex}
                        </PaginationLink>
                    )})}
                </PaginationItem>
                {endPage < totalPages && (
                    <>
                        {(totalPages - params?.page > 3) &&
                         <PaginationItem>
                           <PaginationEllipsis />
                         </PaginationItem>
                        }
                         <PaginationItem
                         >

                           <PaginationLink
                             className="cursor-pointer bg-white w-[32px] h-[32px] rounded-[8px] hover:border-[2px] hover:border-[#CED2DA] p-0 hover:bg-[#F3F3F3] hover:shadow-product1 disabled:border-[#F2F4F7]"
                             onClick={() => {
                                 router.push(`/${path}?page=${totalPages}&per_page=${params?.per_page}&search=${params?.search}&from=${params?.from}&to=${params?.to}&orderBy=${params?.orderBy}&order=${params?.order}`);
                                }}
                                >
                             {totalPages}
                           </PaginationLink>
                         </PaginationItem>
                    </>
                )}
                <PaginationItem
                    className={params?.page >= totalPages ? "opacity-50" : ""}
                >
                    <PaginationNext
                        className="cursor-pointer bg-white w-[32px] h-[32px] rounded-[8px] border-[2px] border-[#CED2DA] p-0 hover:bg-[#F3F3F3] hover:shadow-product1 disabled:border-[#F2F4F7]"
                        onClick={() => {
                            if (params?.page < totalPages) {
                                router.push(`/${path}?page=${params?.page + 1}&per_page=${params?.per_page}&search=${params?.search}&from=${params?.from}&to=${params?.to}&orderBy=${params?.orderBy}&order=${params?.order}`)
                            }
                        }}
                        />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default TablePagination;




// this is the old pagination code
//          <div className="flex items-center space-x-6 lg:space-x-8">
//      <div className="flex items-center space-x-2">
//        <p className="text-sm font-medium">Articles par page</p>
//       <Select
//         value={`${Number(params?.per_page)}`}
//         onValueChange={(value) => {
//           router.push(`/${path}?page=1&per_page=${value}&search=${params?.search}&from=${params?.from}&to=${params?.to}&orderBy=${params?.orderBy}&order=${params?.order}`)
//         }}
//         >
//         <SelectTrigger className="h-8 w-[70px]">
//             {/* <div className="flex justify-between items-center"> */}
//             <SelectValue placeholder={params?.per_page} />
//             <ChevronDown color="gray" size={20} />
//             {/* </div> */}
//         </SelectTrigger>
//         <SelectContent side="top">
//           {[5, 10, 20, 30, 40].map((pageSize) => (
//                 <SelectItem key={pageSize} value={`${pageSize}`}>
//                     {pageSize}
//                 </SelectItem>
//           ))}
//         </SelectContent>
//        </Select>
//    </div>
//     <div className="flex  items-center justify-center text-sm font-medium">
//      Page {params?.page} sur{" "}
//        {Math.ceil(total / params?.per_page)}
//      </div>
    
//      <div className="flex items-center space-x-2">
//        <Button
//          variant="outline"
//          className="hidden h-8 w-8 p-0 lg:flex"
//          onClick={handelFirst}
//           disabled={Number(params?.page) > 1 ? false : true}
//        >
//         <span className="sr-only">Go to first page</span>
        
//      <ChevronFirst  className="h-4 w-4" />
//        </Button>
//        <Button
//          variant="outline"
//          className="h-8 w-8 p-0"
//          onClick={handelPrevece}
//           disabled={Number(params?.page) > 1 ? false : true}
//          >
//          <span className="sr-only">Go to previous page</span>
//          <ChevronLeftIcon className="h-4 w-4" />
//        </Button>
//        <Button
//          variant="outline"
//         className="h-8 w-8 p-0"
//         onClick={handelNexet}
//          disabled={Number(params?.page) < Math.ceil(total / 5) ? false : true}
//        >
//          <span className="sr-only">Go to next page</span>
//          <ChevronRightIcon className="h-4 w-4" />
//        </Button>
//        <Button
//          variant="outline"
//          className="hidden h-8 w-8 p-0 lg:flex"
//          onClick={handelLast}
//          disabled={Number(params?.page) < Math.ceil(total / 5) ? false : true}
//        >
//          <span className="sr-only">Go to last page</span>
//          <ChevronLast className="h-4 w-4" />
//        </Button>
//        </div>
// </div>