"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Switch } from "@/components/ui/switch"
import ColumnHeader from "./columnheader";
import { Sale } from "@/types/types";
import TertiaryButton from "@/components/utils/tertiarybutton";

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "waiting",
    header: ({ column }) => <ColumnHeader text="Livrée/En attente" column={column} />,
    cell: ({ row }) => (
      <div className="">
        <Switch className={`data-[state=checked]:bg-[#40BF7F] data-[state=unchecked]:bg-[#F64C4C] h-6 rounded-full `} checked={row.original.waiting} />
      </div>
    ),
  },
  {
    accessorKey: "reference",
    header: ({ column }) => <ColumnHeader text="Références" column={column} />,
  },
  {
    accessorKey: "client",
    header: ({ column }) => <ColumnHeader text="Clients" column={column} />,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <ColumnHeader text="Dates" column={column}  />,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <ColumnHeader text="Qtés" column={column}  />,
  },
  {
    accessorKey: "total",
    header: ({ column }) => <ColumnHeader text="Totaux" column={column}  />,
    cell: ({ row }) => `${row.original.total.toFixed(2)}`,
  },
  {
    accessorKey: "credit",
    header: ({ column }) => <ColumnHeader text="Crédits" column={column} />,
    cell: ({ row }) => `${row.original.credit.toFixed(2)}`,
  },
  {
    accessorKey: "state",
    header: ({ column }) => <ColumnHeader text="États" column={column}/>,
    cell: ({ row }) => (
      <div className={`w-2 h-2 rounded-full ${
        row.original.state === '1' ? 'bg-green-500' : 
        row.original.state === '0' ? 'bg-yellow-500' : 'bg-red-500'
      }`} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex justify-start items-start space-x-1 p-0" id="actionsculomn" >
        <TertiaryButton className="w-[30px] h-[30px] p-0" toltip="Retour sur vente" content={<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11 0.25C7.27208 0.25 4.25 3.27208 4.25 7V9.18934L1.53033 6.46967C1.23744 6.17678 0.762563 6.17678 0.46967 6.46967C0.176777 6.76256 0.176777 7.23744 0.46967 7.53033L3.76256 10.8232C4.44598 11.5066 5.55402 11.5066 6.23744 10.8232L9.53033 7.53033C9.82322 7.23744 9.82322 6.76256 9.53033 6.46967C9.23744 6.17678 8.76256 6.17678 8.46967 6.46967L5.75 9.18934V7C5.75 4.10051 8.1005 1.75 11 1.75H13C15.8995 1.75 18.25 4.10051 18.25 7V9C18.25 11.8995 15.8995 14.25 13 14.25H10C9.58579 14.25 9.25 14.5858 9.25 15C9.25 15.4142 9.58579 15.75 10 15.75H13C16.7279 15.75 19.75 12.7279 19.75 9V7C19.75 3.27208 16.7279 0.25 13 0.25H11Z" fill="#2C71F6"/></svg>}/>
        <TertiaryButton className="w-[30px] h-[30px] p-0" toltip="Ticket" content={<svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.46429 9.90086V8.85644C2.84046 8.67264 3.93287 7.53015 3.93287 6.09928C3.93287 4.66841 2.84046 3.52592 1.46429 3.34212V2.08282C1.46429 1.34755 2.06193 0.739022 2.88125 0.750149L2.88125 0.750218H2.89144H19.0914C19.9033 0.750218 20.5186 1.38212 20.5186 2.09935V3.43C19.3167 3.74803 18.41 4.81224 18.41 6.11581C18.41 7.42557 19.3253 8.4937 20.5357 8.8061V9.90086C20.5357 10.6181 19.9204 11.25 19.1086 11.25H2.89144C2.07962 11.25 1.46429 10.6181 1.46429 9.90086Z" stroke="#2C71F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.5714 4.2846C14.0448 4.2846 14.4286 3.90084 14.4286 3.42746C14.4286 2.95407 14.0448 2.57031 13.5714 2.57031C13.098 2.57031 12.7143 2.95407 12.7143 3.42746C12.7143 3.90084 13.098 4.2846 13.5714 4.2846Z" fill="#2C71F6"/><path d="M13.5714 6.85882C14.0448 6.85882 14.4286 6.47506 14.4286 6.00167C14.4286 5.52829 14.0448 5.14453 13.5714 5.14453C13.098 5.14453 12.7143 5.52829 12.7143 6.00167C12.7143 6.47506 13.098 6.85882 13.5714 6.85882Z" fill="#2C71F6"/><path d="M13.5714 9.42913C14.0448 9.42913 14.4286 9.04537 14.4286 8.57199C14.4286 8.0986 14.0448 7.71484 13.5714 7.71484C13.098 7.71484 12.7143 8.0986 12.7143 8.57199C12.7143 9.04537 13.098 9.42913 13.5714 9.42913Z" fill="#2C71F6"/></svg>}/>
        <TertiaryButton className="w-[30px] h-[30px] p-0" toltip="Facture" content={<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.25002 1.5L12.8334 6.1875M8.25002 1.5V5.35417C8.25002 5.8144 8.62312 6.1875 9.08335 6.1875H12.8334M8.25002 1.5H3.66669C2.28598 1.5 1.16669 2.61929 1.16669 4V14C1.16669 15.3807 2.28598 16.5 3.66669 16.5H10.3334C11.7141 16.5 12.8334 15.3807 12.8334 14V6.1875M4.50002 9.83333H9.50002M4.50002 13.1667H9.50002" stroke="#2C71F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>}/>
        <TertiaryButton className="w-[30px] h-[30px] p-0" toltip="Dupliquer" content={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0455 13.7727L11.0455 14.6818C11.0455 15.686 10.2314 16.5 9.22727 16.5L3.31818 16.5C2.31403 16.5 1.5 15.686 1.5 14.6818L1.5 8.77273C1.5 7.76857 2.31403 6.95455 3.31818 6.95455L4.22727 6.95455M14.6818 1.5L8.31818 1.5C7.31403 1.5 6.5 2.31403 6.5 3.31818L6.5 9.68182C6.5 10.686 7.31403 11.5 8.31818 11.5L14.6818 11.5C15.686 11.5 16.5 10.686 16.5 9.68182L16.5 3.31818C16.5 2.31403 15.686 1.5 14.6818 1.5Z" stroke="#2C71F6" stroke-width="1.5" stroke-linecap="round"/></svg>}/>
      </div>
    ),
  },
];