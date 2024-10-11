'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default function Test() {

  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = () => {
    setIsGenerating(true)

    const doc = new jsPDF()

    const tableColumn = ["Etats", "Mode de commande", "Références", "Fournisseurs", "Dates", "Nbr d'unités", "Montants", "Statuts"]
    const tableRows: string[][] = [
      ["État 1", "Commande 1", "Ref 1", "Fournisseur 1", "2023-05-20", "10", "1000€", "Actif"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      ["État 2", "Commande 2", "Ref 2", "Fournisseur 2", "2023-05-21", "20", "2000€", "En attente"],
      // Add more rows as needed
    ]

	const addPageNumber = (doc: jsPDF) => {
		const pageCount = doc.internal.pages.length - 1
		for (let i = 1; i <= pageCount; i++) {
		  doc.setPage(i)
		  doc.setFontSize(10)
		  doc.setTextColor(100)
		  doc.text('Page ' + i + ' of ' + pageCount, doc.internal.pageSize.width - 25, doc.internal.pageSize.height - 10)
		}
	  }

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 7, cellPadding: 1, overflow: 'linebreak' },
      columnStyles: { 
        0: { cellWidth: 20 },
        1: { cellWidth: 25 },
        2: { cellWidth: 20 },
        3: { cellWidth: 25 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 },
        7: { cellWidth: 20 },
      },
      headStyles: { fillColor: [200, 200, 200], textColor: 20 },
    })

	addPageNumber(doc)

    doc.save('table.pdf')

    setIsGenerating(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">PDF Table Generator</h1>
      <Button onClick={generatePDF} disabled={isGenerating}>
        {isGenerating ? 'Generating PDF...' : 'Generate PDF'}
      </Button>
    </div>
  )
}
