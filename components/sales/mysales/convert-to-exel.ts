import * as XLSX from 'xlsx';
import { utils, writeFile } from "xlsx-js-style";
import { formatDate } from './salespage';
type Params = {
    page: number;
    per_page: number;
    search: string;
    from: string;
    to: string;
    orderBy: string;
    order: string;
  };

  // Function to add one day to a date
const generateDate = (dateString: string): string => {
    const date = new Date(dateString);
    date.setDate(date.getDate());
    return date.toISOString().split('T')[0]; // Return the date in YYYY-MM-DD format
  };

// Helper function to convert table data to Excel format
export const convertToExcel = (exportedData: any[], params: Params) => {
    if (!exportedData || !Array.isArray(exportedData) || exportedData.length === 0) {
      console.error("Invalid data provided for export");
      return;
    }
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportedData);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

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
        
            	worksheet[cellAddress0] = { v: "Ventes", s: titleStyle };
        		const	date = new Date();
        
            	worksheet[cellAddress1] = { v: `Données extraites le ${formatDate(date.toISOString())} pour la période du ${params?.from ? formatDate(generateDate(params?.from)) : new Date(2020, 0, 1)} au ${params?.to ? formatDate(generateDate(params?.to)) : date}`, s: titleStyle };
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
        								if (exportedData[row - 3]["Livrée"] == 1)
        									worksheet[cellAddress].s = GreenCellStyle;
        								else
                                            worksheet[cellAddress].s = redCellStyle;
                                        // if (exportedData[row - 3]["États"] == false)
        							}
        							else if (col == 1) {
        								if (exportedData[row - 3]["Références"])
        									worksheet[cellAddress].s = GreenCellStyle;
        								else
        									worksheet[cellAddress].s = yellowCellStyle;
        							}
        							else {
        								if (exportedData[row - 3]["Clients"])
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

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    return new Blob([excelBuffer], { type: "application/octet-stream" });
  };