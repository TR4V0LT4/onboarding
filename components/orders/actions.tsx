import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import Vector14 from "@/public/Vector14.svg";
import Vector15 from "@/public/Vector15.svg";
import Vector16 from "@/public/Vector16.svg";
import Vector17 from "@/public/Vector17.svg";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Orders } from "@/types/orders";
import { Column, Table } from "@tanstack/react-table";
import SecondaryButton from "../utils/secondarybutton";
import Eye from "@/public/eye.svg";
import Eyeclosed from "@/public/eyeclosed.svg";
import getSession from "@/lib/getsession";
import { utils, writeFile } from "xlsx-js-style";
import { ChangeEvent, useEffect, useRef } from "react";
// import { useReactToPrint } from "react-to-print";
// import { ComponentToPrint } from "./componenttoprint";
import { useRouter } from "next/navigation";
// import html2pdf from "html2pdf.js";
// import Test from "./test";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Actions({ table }: { table: Table<Orders> }) {
	const	componentRef = useRef<HTMLDivElement | null>(null);
	// const	handlePrint = useReactToPrint({
	// 	content: () => componentRef.current,
	// 	documentTitle: "Commandes"
	// });
	const	router = useRouter();
	const	inputRef = useRef<HTMLInputElement>(null);

	function formatDate(date: Date, sec?: boolean): string {
		return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}${sec ? `:${String(date.getMinutes()).padStart(2, '0')}` : ""}`;
	}
	function filterColums(column: Column<Orders, unknown>) {
		return column.getCanHide();
	}
	async function getAllData() {
		const	session = await getSession();
		const	responce = await fetch(`/api/orders/all?company_id=${session?.company_id}`);
		const	data = await responce.json();

		return data.data.map((d: any) => {
			return {
				"États": d.status == 1 || d.status == 11 ? "Non livrée" : (d.status == 10 ? "Livrée partiellement" : "Livrés"),
				"Mode de commande": d.connectivity == "online" ? "Connectée" : "Non connectée",
				"Références": d.reference,
				"Fournisseurs": d.supplier,
				"Dates": d.date,
				"Nbr d’unités": d.units,
				"Montants (DH)": d.amount,
				"Statuts": d.status == 1 ?
					"En brouillon" :
					(d.status == 10 ? "Livrée partiellement" : (d.status == 11 ? "Non livrée" : "Validé")),
			};
		});
	}
	async function exportData() {
		const	exportedData = await getAllData();
		const	workbook = utils.book_new();
		const	worksheet = utils.json_to_sheet(exportedData);
		const	headerStyle = {
			font: { bold: true },
			border: {
				top: { style: 'thin' },
				right: { style: 'thin' },
				bottom: { style: 'thin' },
				left: { style: 'thin' },
			},
			alignment: {
				horizontal: 'center',
				vertical: 'center'
			}
		};
		const	titleStyle = {
			font: { bold: true },
			alignment: {
				horizontal: 'center',
				vertical: 'center'
			}
		};
		const	headerStyleSum = {
			font: { bold: true },
			border: {
				top: { style: 'thin' },
				right: { style: 'thin' },
				bottom: { style: 'thin' },
				left: { style: 'thin' },
			},
			alignment: {
				horizontal: 'right',
				vertical: 'center'
			}
		};
		const	cellStyle = {
			border: {
				top: { style: 'thin' },
				right: { style: 'thin' },
				bottom: { style: 'thin' },
				left: { style: 'thin' },
			},
			alignment: {
				vertical: 'center'
			}
		};
		const	redCellStyle = {
			border: {
				top: { style: 'thin' },
				right: { style: 'thin' },
				bottom: { style: 'thin' },
				left: { style: 'thin' },
			},
			alignment: {
				vertical: 'center'
			},
			fill: {
				fgColor: {
					rgb: "F64C4C"
				}
			}
		};
		const	yellowCellStyle = {
			border: {
				top: { style: 'thin' },
				right: { style: 'thin' },
				bottom: { style: 'thin' },
				left: { style: 'thin' },
			},
			alignment: {
				vertical: 'center'
			},
			fill: {
				fgColor: {
					rgb: "FFB21A"
				}
			}
		};
		const	GreenCellStyle = {
			border: {
				top: { style: 'thin' },
				right: { style: 'thin' },
				bottom: { style: 'thin' },
				left: { style: 'thin' },
			},
			alignment: {
				vertical: 'center'
			},
			fill: {
				fgColor: {
					rgb: "40BF7F"
				}
			}
		};
		const	amountStyle = {
			border: {
				top: { style: 'thin' },
				right: { style: 'thin' },
				bottom: { style: 'thin' },
				left: { style: 'thin' },
			},
			alignment: {
				horizontal: 'right',
				vertical: 'center'
			}
		};
		const	dateStyle = {
			border: {
				top: { style: 'thin' },
				right: { style: 'thin' },
				bottom: { style: 'thin' },
				left: { style: 'thin' },
			},
			alignment: {
				horizontal: 'center',
				vertical: 'center'
			}
		};
		const range = utils.decode_range(worksheet['!ref'] ? worksheet['!ref'] : "A1:Z1");

		for (let row = range.e.r; row >= range.s.r; row--) {
			for (let col = range.s.c; col <= range.e.c; col++) {
				const oldCellAddress = utils.encode_cell({ r: row, c: col });
				const newCellAddress = utils.encode_cell({ r: row + 2, c: col });
				worksheet[newCellAddress] = worksheet[oldCellAddress];
				delete worksheet[oldCellAddress];
			}
		}
		range.e.r += 2;
		worksheet['!ref'] = utils.encode_range(range);
		const cellAddress0 = utils.encode_cell({ r: 0, c: 0 });
		const cellAddress1 = utils.encode_cell({ r: 1, c: 0 });

    	worksheet[cellAddress0] = { v: "Résumé des Bons de Commande", s: titleStyle };
		const	date = new Date();
		const dates = exportedData.map((d: any) => new Date(d["Dates"]));
    	const minDate = new Date(Math.min(...dates));
    	const maxDate = new Date(Math.max(...dates));

    	worksheet[cellAddress1] = { v: `Données extraites le ${formatDate(date)} pour la période du ${formatDate(minDate)} au ${formatDate(maxDate)}`, s: titleStyle };
		for (let row = 2; row <= range.e.r; row++) {
			if (row == 2)
				for (let col = range.s.c; col <= range.e.c; col++) {
					const cellAddress = utils.encode_cell({ r: row, c: col });

					if (worksheet[cellAddress])
						worksheet[cellAddress].s = headerStyle;
				}
			else
				for (let col = range.s.c; col <= range.e.c; col++) {
					const cellAddress = utils.encode_cell({ r: row, c: col });

					if (worksheet[cellAddress]) {
						if (col == 6) {
							worksheet[cellAddress].s = amountStyle;
							worksheet[cellAddress].t = "n";
							worksheet[cellAddress].z = "0.00";
						}
						else if (col == 4) {
							worksheet[cellAddress].s = dateStyle;
							worksheet[cellAddress].t = "d";
                			worksheet[cellAddress].z = "dd/mm/yyyy hh:mm";
						}
						else if (col == 5) {
							worksheet[cellAddress].s = cellStyle;
							worksheet[cellAddress].t = "n";
							worksheet[cellAddress].z = "0";
						}
						else if (exportedData[row - 3] && (col == 0 || col == 1 || col == 3)) {
							if (col == 0) {
								if (exportedData[row - 3]["États"] == "Livrés")
									worksheet[cellAddress].s = GreenCellStyle;
								else if (exportedData[row - 3]["États"] == "Non livrée")
									worksheet[cellAddress].s = redCellStyle;
								else if (exportedData[row - 3]["États"] == "Livrée partiellement")
									worksheet[cellAddress].s = yellowCellStyle;
							}
							else if (col == 1) {
								if (exportedData[row - 3]["Mode de commande"] == "Connectée")
									worksheet[cellAddress].s = GreenCellStyle;
								else
									worksheet[cellAddress].s = yellowCellStyle;
							}
							else {
								if (exportedData[row - 3]["Fournisseurs"] == "Non défini")
									worksheet[cellAddress].s = yellowCellStyle;
								else
									worksheet[cellAddress].s = cellStyle;
							}
						}
						else
							worksheet[cellAddress].s = cellStyle;
					}
				}
		}
		worksheet['!autofilter'] = { ref: `A3:H${range.e.r}` };
		range.e.r += 3;
		worksheet["!ref"] = utils.encode_range(range);
		const totalRow = range.e.r;

    	worksheet[utils.encode_cell({ r: totalRow - 1, c: 0 })] = { v: "Nombre total d’unités", t: "s", s: headerStyle };
    	worksheet[utils.encode_cell({ r: totalRow, c: 0 })] = { v: "Montant total (DH)", t: "s", s: headerStyle };
    	worksheet[utils.encode_cell({ r: totalRow - 1, c: 1 })] = { f: `SUM(F4:F${totalRow})`, t: "n", s: headerStyleSum };
    	worksheet[utils.encode_cell({ r: totalRow, c: 1 })] = {
			f: `SUM(G4:G${totalRow})`,
			t: "n",
			s: headerStyleSum,
			z: "0.00"
		};
    	worksheet['!merges'] = [
			{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } },
			{ s: { r: 1, c: 0 }, e: { r: 1, c: 7 } }
		];
		worksheet["!cols"] = [
			{ wpx: 200 },
			{ wpx: 200 },
			{ wpx: 200 },
			{ wpx: 300 },
			{ wpx: 100 },
			{ wpx: 100 },
			{ wpx: 100 },
			{ wpx: 200 }
		];
		const rowCount = worksheet["!ref"] ? parseInt(worksheet["!ref"].split(':')[1].replace(/\D/g, '')) : 0;
		worksheet["!rows"] = Array(rowCount).fill({ hpx: 25 });
		utils.book_append_sheet(workbook, worksheet, "Commandes");
		writeFile(workbook, `Commandes${formatDate(date, true)}.xlsx`);
	}
	function handleSearch(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length > 2)
			router.push(`orders?page=1&search=${event.target.value}`);
		else
			router.push(`orders?page=1`);
	}
	function transformDate(input: string): string {
		const [datePart, timePart] = input.split(' ');
		const [year, month, day] = datePart.split('-');
		const [hour, minute, second] = timePart.split(':');
	
		return `${day}/${month}/${year} ${hour}:${minute}`;
	}
	function formatNumberWithSpace(number: number): string {
		return new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(number).replace(/,/g, '\u00A0');
	}
	async function handlePrint() {
		const	doc = new jsPDF()
		const	tableColumn = [
			"États",
			"Mode de commande",
			"Références",
			"Fournisseurs",
			"Dates",
			"Nbr d'unités",
			"Montants (DH)",
			"Statuts"
		];
		const	data = await getAllData();
		const 	dates = data.map((d: any) => new Date(d["Dates"]));
    	const 	minDate = new Date(Math.min(...dates));
    	const 	maxDate = new Date(Math.max(...dates));
		const	tableRows = data.map((d: any) => {
			return [
				d["États"],
				d["Mode de commande"],
				d["Références"],
				d["Fournisseurs"],
				transformDate(d["Dates"]),
				d["Nbr d’unités"],
				formatNumberWithSpace(d["Montants (DH)"]),
				d["Statuts"]
			];
		});
		const totalUnits = tableRows.reduce((sum: number, row: any) => sum + parseInt(row[5]), 0)
    	const totalAmount = tableRows.reduce((sum: number, row: any) => sum + parseInt(row[6]), 0)
    	const activeOrders = tableRows.filter((row: any) => row[7].toLowerCase() === 'Validé').length
    	const pendingOrders = tableRows.filter((row: any) => row[7].toLowerCase() === 'Livrée partiellement').length

		const addSummaryTable = (doc: jsPDF, y: number) => {
			doc.setFontSize(14)
			doc.setTextColor(40)
			doc.text('Résumé', 14, y)
	  
			autoTable(doc, {
			  startY: y + 5,
			  head: [['Métrique', 'Valeur']],
			  body: [
				['Total des unités', totalUnits.toString()],
				['Montant total', `${totalAmount}€`],
				['Commandes actives', activeOrders.toString()],
				['Commandes en attente', pendingOrders.toString()],
				['Nombre total de commandes', tableRows.length.toString()],
			  ],
			  theme: 'grid',
			  headStyles: { fillColor: [200, 200, 200], textColor: 40, fontStyle: 'bold' },
			  styles: { fontSize: 10, cellPadding: 2 },
			  columnStyles: {
				0: { cellWidth: 80 },
				1: { cellWidth: 40, halign: 'right' },
			  },
			})
		}
		autoTable(doc, {
			head: [tableColumn],
			body: tableRows,
			theme: 'grid',
			styles: {
				valign: "middle",
				cellPadding: 1,
				fontSize: 7
			},
			columnStyles: { 
			  0: { halign: "left" },
			  1: { halign: "left" },
			  2: { halign: "left" },
			  3: { halign: "left" },
			  4: { halign: "center", cellWidth: 20 },
			  5: { halign: "right" },
			  6: { halign: "right" },
			  7: { halign: "left" },
			},
			headStyles: {
				fillColor: "#2C71F6",
				textColor: "#FFFFFF",
				halign: "center"
			},
			rowPageBreak: "avoid",
			didDrawPage: (data) => {
				doc.setFontSize(14);
				doc.text(`Résumé des Bons de Commande`, doc.internal.pageSize.width / 2, 10, { align: "center" });
				doc.setFontSize(7);
				doc.text(`Données extraites le ${formatDate(new Date)} pour la période du ${formatDate(minDate)} au ${formatDate(maxDate)}`, doc.internal.pageSize.width / 2, 15, { align: "center" });
				data.settings.margin.top = 20;
				doc.text(`Page ${data.pageNumber} sur ${doc.getNumberOfPages()}`, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, { align: "right" });
				// console.log(doc.getNumberOfPages())
				// if (data.pageCount === doc.getCurrentPageInfo().pageNumber) {
				// 	addSummaryTable(doc, data.cursor?.y ? data.cursor?.y + 10 : 20)
				//   }
			},
			willDrawCell: (data) => {
				if (data.section != "head" && data.row.index % 2 == 0) {
					doc.setFillColor(245, 245, 245);
				}
				if (data.section == "body") {
					if (data.column.index == 0) {
						if (data.cell.raw == "Livrés")
							doc.setFillColor(64, 191, 127);
						else if (data.cell.raw == "Non livrée")
							doc.setFillColor(246, 76, 76);
						else if (data.cell.raw == "Livrée partiellement")
							doc.setFillColor(255, 178, 26);
					}
					else if (data.column.index == 1) {
						if (data.cell.raw == "Connectée")
							doc.setFillColor(64, 191, 127);
						else
							doc.setFillColor(255, 178, 26);
					}
					else if (data.column.index == 3) {
						if (data.cell.raw == "Non défini")
							doc.setFillColor(255, 178, 26);
					}
				}
			},
			startY: 20
		});
		doc.save(`Commandes${formatDate(new Date(), true)}.pdf`);
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
		  if (inputRef.current) {
			inputRef.current.focus();
		  }
		};
	
		window.addEventListener('keydown', handleKeyDown);
	
		return () => {
		  window.removeEventListener('keydown', handleKeyDown);
		};
	  }, []);

	return (
		<Card
			className="shadow-none border-none flex items-center justify-between"
		>
			<CardHeader
				className="p-0 flex flex-row items-center gap-[8px]"
			>
				<Dialog>
					<DialogTrigger
						className="bg-inherit hover:bg-inherit focus-visible:ring-0 focus-visible:ring-offset-0 px-[16px] py-[8px]"
					>
						<Vector17 />
					</DialogTrigger>
					<DialogContent
						className="grid grid-cols-3 p-[40px]"
					>
						{
							table.getAllColumns().filter(filterColums).map((column, i) => {
								return (
									<SecondaryButton
										content={
											<div
												className="flex items-center gap-1"
											>
												{
													column.getIsVisible() ?
														<Eye
															fill="#2C71F6"
														/> :
														<Eyeclosed
															fill="#2C71F6"
														/>
												}
												{column.columnDef.header as string}
											</div>
										}
										key={column.id}
										onClick={() =>
											column.toggleVisibility(!column.getIsVisible())
										}
									/>
								);})
						}
					</DialogContent>
				</Dialog>
				<Button
					className="!mt-0 h-[33px] bg-inherit hover:bg-inherit focus-visible:ring-0 focus-visible:ring-offset-0"
					onClick={exportData}
				>
					<Vector16 />
				</Button>
				<Button
					className="!mt-0 h-[33px] bg-inherit hover:bg-inherit focus-visible:ring-0 focus-visible:ring-offset-0"
					onClick={handlePrint}
				>
					<Vector15
						stroke="#344051"
					/>
				</Button>
				{/* <ComponentToPrint ref={componentRef} /> */}
				{/* <Test /> */}
			</CardHeader>
			<CardContent
				className="p-0 relative"
			>
				<Input
					placeholder="Recherche..."
					className="h-[30px] rounded-[8px] border-[1px] p-[10px] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#AFB4C5] placeholder:text-[#97A1AF] font-normal text-[12px] text-[#344051] w-[141px] pr-[30px]"
					onChange={handleSearch}
					ref={inputRef}
				/>
				<div
					className="absolute top-1/2 right-2 transform -translate-y-1/2"
				>
					<Vector14 />
				</div>
			</CardContent>
		</Card>
	);
}
