import { Orders } from "@/types/orders";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Orders>[] = [
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
	},
	{
		accessorKey: "actions",
		header: "Actions"
	}
]
