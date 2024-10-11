import { Column, Table } from "@tanstack/react-table";
import Eye from "@/public/eye.svg";
import Eyeclosed from "@/public/eyeclosed.svg";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SecondaryButton from "@/components/utils/secondarybutton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const replaceid = (id: string) => {
    if (id === "waiting") {
        return "Livrée/En attente";
    } else if (id === "reference") {
        return "Références";
    } else if (id === "quantity") {
        return "Qtés";
    } else if (id === "total") {
        return "Totaux";
    } else if (id === "credit") {
        return "Crédits";
    } else if (id === "state") {
        return "États";
    } else if (id === "client") {
        return "Clients";
    }else if (id === "date") {
        return "Dates";
    } else {
        return id;
    }
}

export default function ShowColumn({ table}: { table: Table<any>}) {
	function filterColums(column: Column<any, unknown>) {
		return column.getCanHide();
	}

	return (
        <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
            <DialogTrigger>
              <svg width="25" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 16L21 11M1 16L11 21L21 16M11 1L1 6L11 11L21 6L11 1Z" stroke="#344051" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Afficher les colonnes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DialogContent className="grid grid-cols-3 p-[40px]">
                {table.getAllColumns().filter(filterColums).map((column: Column<any>, i: number) => {
                    return (
                        <SecondaryButton
                            content={
                            <div className="flex items-center gap-1">
                            {
                            column.getIsVisible() ?
                              <Eye fill="#2C71F6" /> :
                              <Eyeclosed fill="#2C71F6" />
                            }
                            {replaceid(column.id)}
                            </div>
                            }
                            key={column.id}
                            onClick={() => column.toggleVisibility(!column.getIsVisible())}
                        />
                    );})
                }
            </DialogContent>
        </Dialog>
	);
}
