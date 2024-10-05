"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"
import SearchInput from "./search-input"
import Pagination from "./pagination"
import ActionsButtons from "./actions-buttons"
import DateRangeInput from "./date-range-input"

type Params = {
    page: number;
    per_page: number;
    search: string;
    from: string;
    to: string;
    orderBy: string;
    order: string;
  };


interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[]
    // columns: {createColumns(params, total, path)}
  data: TData[]
  params: Params
    total: number
    path: string
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
 params,
  total,
  path,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const router = useRouter()


  const table = useReactTable({
      data,
      columns,
    //   columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
        pagination: {
          pageSize: 40, // Set the desired page size here
        },
    },
})

  const handleRowClick = (id: string) => {
    router.push(`/sale/${id}`)
  }

  return (
    <div className="p-0">
      <div className="flex justify-between items-center py-5 data-table-tools">
        < div className="data-table-buttons">
          <ActionsButtons table={table} data={data} params={params}/>
        </div>
        <div className="flex justify-end gap-24 ">
            <div className="flex gap-2 data-table-date">
            {path === "my-sales" &&
                <DateRangeInput
                    searchparams={params}
                    path={path}
                />
            }
            </div>
            <div className="data-table-search">

            <SearchInput  table={table} params={params}  path={path}/>
            </div>
        </div>
      </div>
      <Table>
        <TableHeader className="data-table-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="  px-2" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="data-table-body">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => handleRowClick(data[row.index].id)}
                // className="r hover:bg-gray-100"
				className={ ` cursor-pointer ${ row.index % 2 == 0 ? "bg-[#F7F7F7]" : "bg-inherit" }` }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Aucune donnée disponible dans le tableau
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      { path === "my-sales" &&
          <div className="data-table-pagination flex justify-center items-center py-5">
        <Pagination 55 table={table} params={params} total={total} path={path}/>
      </div>
    }
    </div>
  )
}