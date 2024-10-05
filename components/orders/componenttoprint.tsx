import getSession from "@/lib/getsession";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { ForwardedRef, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Orders } from "@/types/orders";

const columns: ColumnDef<Orders>[] = [
	{
		accessorKey: "state",
		header: "Etats"
	},
	{
		accessorKey: "connectivity",
		header: "Mode de commande"
	},
	{
		accessorKey: "reference",
		header: "Références"
	},
	{
		accessorKey: "supplier",
		header: "Fournisseurs"
	},
	{
		accessorKey: "date",
		header: "Dates"
	},
	{
		accessorKey: "units",
		header: "Nbr d’unités"
	},
	{
		accessorKey: "amount",
		header: "Montants"
	},
	{
		accessorKey: "statuse",
		header: "Statuts"
	}
]

export const ComponentToPrint = React.forwardRef<HTMLDivElement>((props, ref: ForwardedRef<HTMLDivElement>) => {
	const [data, setData] = useState<any[]>([]);
	const	table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	useEffect(() => {
		async function fetchData() {
			const	session = await getSession();
      		const	response = await fetch(`/api/orders/all?company_id=${session?.company_id}`);
      		const	data = await response.json();

      		for (let d of data.data) {
      			d.state = d.status == 1 || d.status == 11 ? "Non livrée" : (d.status == 10 ? "Livrée partiellement" : "Livrés");
      			d.statuse = d.status == 1 ?
      		    	"En brouillon" :
      		    	(d.status == 10 ? "Livrée partiellement" : (d.status == 11 ? "Non livrée" : "Validé"));
				d.connectivity = d.connectivity == "online" ? "Connectée" : "Non connectée";
      		}
		
      		setData(data.data);
		}

		fetchData();
	}, []);

	return (
		<div
			className="h-0 overflow-hidden !mt-0"
		>
			<div ref={ref}>
			<Table>
				<TableHeader>
					{
						table.getHeaderGroups().map((headerGroup) => {
							return (
								<TableRow
									key={headerGroup.id}
									className="hover:bg-inherit border-none"
								>
									{
										headerGroup.headers.map((header) => {
											return (
												<TableHead
													key={header.id}
													className={`font-medium text-[13px] text-[#637083] ${ (header.id == "units" || header.id == "amount") ? "text-right" : "text-left" }`}
												>
													{
														header.isPlaceholder ?
															null :
															flexRender(header.column.columnDef.header, header.getContext())
													}
												</TableHead>
											);
										})
									}
								</TableRow>
							);
						})
					}
				</TableHeader>
				<TableBody>
					{
						table.getRowModel().rows.length ?
							table.getRowModel().rows.map((row, index) => {
								return (
									<TableRow
										key={ row.id }
										data-state={ row.getIsSelected() && "selected" }
										className={ `border-none ${ index % 2 == 0 ? "bg-[#F7F7F7]" : "bg-inherit" }` }
									>
										{
											row.getVisibleCells().map((cell) => {
												return (
													<TableCell
														key={ cell.id }
														className={`font-normal text-[#344051] text-[12px] ${ (cell.column.id == "units" || cell.column.id == "amount") ? "text-right" : "text-left" }`}
														// break-words break-all whitespace-normal 
													>
														{
															flexRender(cell.column.columnDef.cell, cell.getContext())
														}
													</TableCell>
												);
											})
										}
									</TableRow>
								);
							}) :
							(
								<TableRow
									className="bg-[#F7F7F7] hover:bg-[#F7F7F7] text-center text-[#97A1AF] text-[14px] font-normal"
								>
									<TableCell
										colSpan={columns.length}
									>
										Aucune donnée disponible dans le tableau
									</TableCell>
								</TableRow>
							)
					}
				</TableBody>
			</Table>
			</div>
		</div>
	);
})

ComponentToPrint.displayName = 'ComponentToPrint';

export default ComponentToPrint;
