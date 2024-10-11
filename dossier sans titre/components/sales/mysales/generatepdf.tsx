import { formatDate } from "./salespage";

type Params = {
    page: number;
    per_page: number;
    search: string;
    from: string;
    to: string;
    orderBy: string;
    order: string;
  };

  // Function to generate date
const generateDate = (dateString: string): string => {
    const date = new Date(dateString);
    date.setDate(date.getDate());
    return date.toISOString().split('T')[0]; // Return the date in YYYY-MM-DD format
  };

// Function to generate print content
export const generatePrintContent = (data: any[], params: Params) => {
    const	date = new Date();

    const header = `
      <div style="text-align: left; margin-bottom: 20px;">
        <h1>Ventes </h1>
        <p> Données extraites le ${new Date().toLocaleDateString()} pour la période du   ${params?.from ? formatDate(generateDate(params?.from)) : new Date(2020, 0, 1)} au ${params?.to ? formatDate(generateDate(params?.to)) : date}</p>
      </div>
    `;

    const tableRows = data.map(item => `
      <tr>
        <td>${item.Références}</td>
        <td>${item.Livrée}</td>
        <td>${item.Clients}</td>
        <td>${item.Dates}</td>
        <td>${item.Qtés}</td>
        <td>${item.Totaux}</td>
        <td>${item.Crédits}</td>
        <td>${item.États}</td>
      </tr>
    `).join('');
  
    const table = `
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead style="color: blue;">
          <tr>
            <th>Références</th>
            <th>Livrée</th>
            <th>Client</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Credit</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
  
    const footer = `
      <div style="text-align: right; margin-top: 20px;">
        <p>ventes</p>
      </div>
    `;
  
    return `
      <html>
        <head>
          <title>Ventes</title>
          <style>
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${header}
          ${table}
          ${footer}
        </body>
      </html>
    `;
  };
