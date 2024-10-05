"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	VisibilityState
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button";
import Vector18 from "@/public/Vector18.svg";
import TertiaryButton from "../utils/tertiarybutton";
import Vector15 from "@/public/Vector15.svg";
import Vector19 from "@/public/Vector19.svg";
import { Orders } from "@/types/orders";
import Vector13 from "@/public/Vector13.svg";
import { useState } from "react";
import Actions from "./actions";

interface DataTableProps<TValue> {
	columns: ColumnDef<Orders, TValue>[],
	data: Orders[]
}

export default function DataTable<TValue>({ columns, data }: DataTableProps<TValue>) {
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const	table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			columnVisibility
		}
	});

	return (
		<div>
			<Actions
				table={table}
			/>
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
													className={`font-medium text-[13px] text-[#637083] ${((header.id == "units" || header.id == "amount") ? "text-right" : "text-left") }`}
												>
													<div
														className={`flex items-center ${ (header.id == "actions" || header.id == "state" || header.id == "connectivity") ? "justify-center" : ((header.id == "units" || header.id == "amount") ? "justify-end" : "justify-start") }`}
													>
														{
															(
																header.id != "actions" &&
																	header.id != "units" &&
																	header.id != "amount"
															) ?
																<Button
																	className="bg-inherit hover:bg-inherit pl-0"
																>
																	<Vector18 />
																</Button> :
																null
														}
														{
															header.isPlaceholder ?
																null :
																flexRender(header.column.columnDef.header, header.getContext())
														}
														{
															!(header.id != "units" && header.id != "amount") ?
																<Button
																	className="bg-inherit hover:bg-inherit pr-0"
																>
																	<Vector18 />
																</Button> :
																null
														}
													</div>
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
														className={`font-normal text-[#344051] text-[12px] ${cell.column.id == "date" ? "whitespace-nowrap" : "" } ${ (cell.column.id == "units" || cell.column.id == "amount") ? "text-right" : "text-left" }`}
													>
														{
															cell.column.id != "actions" &&
																cell.column.id != "state" &&
																cell.column.id != "connectivity" ?
																	flexRender(cell.column.columnDef.cell, cell.getContext()) :
																	(
																		cell.column.id == "actions" ?
																			<div
																				className="flex gap-[8px] justify-center"
																			>
																				<TertiaryButton
																					content={
																						<Vector19 />
																					}
																					className="w-[30px] h-[30px] p-0"
																				/>
																				<TertiaryButton
																					content={
																						<Vector15
																							stroke="#2C71F6"
																							strokeWidth="1.5"
																						/>
																					}
																					className="w-[30px] h-[30px] p-0"
																				/>
																			</div> :
																			(
																				cell.column.id == "state" ?
																					<div
																						className="flex justify-center"
																					>
																						{
																							cell.row.original.state == "delivered" ?
																								<Vector13
																									fill="#40BF7F"
																									width="10"
																									height="10"
																								/> :
																								(
																									cell.row.original.state == "partially delivered" ?
																										<Vector13
																											fill="#FFB21A"
																											width="10"
																											height="10"
																										/> :
																										<Vector13
																											fill="#F64C4C"
																											width="10"
																											height="10"
																										/>
																								)
																						}
																					</div> :
																					<div
																						className="flex justify-center"
																					>
																						{
																							cell.row.original.connectivity == "online" ?
																								<Vector13
																									fill="#40BF7F"
																									width="10"
																									height="10"
																								/> :
																								<Vector13
																									fill="#FFB21A"
																									width="10"
																									height="10"
																								/>
																						}
																					</div>
																			)
																	)
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
	);
}
