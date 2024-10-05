"use client";

import { DataTable } from "@/components/sales/mysales/data-table";
import Link from "next/link";
import States from "@/components/sales/mysales/states";
import { columns } from "@/components/sales/mysales/columns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import { Sale } from "@/types/types";
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { useEffect, useState } from 'react';
import { useTour } from "@/components/layout/TourContext";

const steps = [
    {target: '.show-cancelled-button',content: 'Cliquer ici pour voir les ventes annulées.',},
    {target: '.new-sale-button',content: 'Utilisez ce bouton pour ajouter une nouvelle vente.',},
    {target: '.sales-header',content: 'Cliquez ici pour filtrer les ventes par état.',},
    {target: '.content',content: 'Voici vos données de ventes présentées sous forme de tableau.',},
    {target: '.data-table-tools', content: 'Utilisez ces outils ',},
    {target: '.data-table-buttons', content: 'pour exporter les données ou imprimer le tableau.',},
    {target: '.data-table-date', content: 'Utilisez ces filtres pour afficher les ventes dans une plage de dates spécifique.',},
    {target: '.data-table-search', content: 'Utilisez cette barre de recherche pour trouver rapidement des ventes spécifiques.',},
    {target: '.data-table-header', content: ' Cliquez sur les en-têtes de colonne pour trier les données.',},
    {target: '.data-table-body', content: ' Cliquez sur les en-têtes de colonne pour trier les données.',},
    {target: '.data-table-pagination', content: ' Cliquez sur les en-têtes de colonne pour trier les données.',
    },
    
];


type Params = {
    page: number;
    per_page: number;
    search: string;
    from: string;
    to: string;
    orderBy: string;
    order: string;
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

function SalesPage({ params, all, path }: { params: Params; all: any; path: string }) {
    const [isClient, setIsClient] = useState(false);
    const { runTour, setRunTour } = useTour();


    useEffect(() => {
        setIsClient(true);
    }, []);

    const mappedSales: Sale[] = all.data.map((sale: any) => ({
        id: sale.id.toString(),
        waiting: sale.waiting === "1" || sale.waiting === 'Oui',
        reference: sale.reference || "",
        client: sale.client || "",
        date: formatDate(sale.date) || "",
        quantity: sale.quantity,
        total: parseFloat(sale.total?.toString() || "0"),
        credit: parseFloat(sale.credit?.toString() || "0"),
        state: sale.state || "",
        creer_par: sale.creer_par || "",
    }));

    const data = mappedSales;
    const total = all.total;

    

    return (
        <div>
            {isClient && (
                <Joyride
                    steps={steps}
                    run={runTour}
                    continuous={true}
                    showProgress={true}
                    showSkipButton={true}
                    // disableOverlayClose={true}
                    // spotlightClicks={true}
                    callback={(data: CallBackProps) => {
                        const { status } = data;
                        if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
                            setRunTour(false);
                        }
                    }}
                    styles={{
                        options: {
                            zIndex: 10000,
                            primaryColor: '#2C71F6', 
                            textColor: '#344051', 
                            backgroundColor: '#FFFFFF', 
                            overlayColor: 'rgba(0, 0, 0, 0.5)',
                            
                        },
                        tooltip: {
                            borderRadius: '8px', 
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Deeper box shadow for a more lifted effect
                            padding: '12px', 
                            border: '1px solid #2C71F6',
                        },
                        buttonNext: {
                            backgroundColor: '#2C71F6', 
                            color: '#FFFFFF',
                            borderRadius: '4px', 
                            border: 'none', 
                            padding: '10px 16px', 
                            transition: 'background-color 0.3s ease', // Smooth hover effect
                        },
                        buttonBack: {
                            color: '#2C71F6', 
                            border: 'none',
                            backgroundColor: 'transparent', 
                            padding: '10px 16px',
                            transition: 'color 0.3s ease',
                        },
                        buttonSkip: {
                            color: '#2C71F6', 
                            border: 'none',
                            backgroundColor: 'transparent', 
                            padding: '10px 16px',
                            transition: 'color 0.3s ease',
                        },
                      
                        beacon: {
                            border: '2px solid #2C71F6', // Change border color
                            backgroundColor: '#FFFFFF',   // Circle background color
                            borderRadius: '50%',           // Make it circular
                            width: '40px',                 // Change size
                            height: '40px',                // Change size
                        },
                    }}
                    locale={{
                        next: 'Suivant',
                        back: 'Retour',
                        last: 'Terminer',
                        skip: 'Passer',
                    }}
                 
                />
            )}
            
            
            <div className="flex justify-end items-center gap-3 pr-10">
                <Button className="show-cancelled-button bg-white text-[#2C71F6] border border-[#2C71F6] hover:bg-[#2C71F6] hover:text-white my-[30px]">
                    Afficher les ventes annulées
                </Button>
                <Link href='/add-sale'>
                    <Button className="new-sale-button bg-[#2C71F6] text-white border border-[#2C71F6] hover:bg-white hover:text-[#2C71F6]">
                        Nouvelle vente (n)
                    </Button>
                </Link>
            </div>
            <div className="px-10"> 
                <div className="h-full bg-[#F7FBF5] rounded-xl p-8">
                    <Card className="p-0 col-span-3 flex flex-col rounded-[20px] border-2 border-white w-full ">
                        <CardHeader className="flex flex-row justify-between sales-header">
                            <h1 className="text-[#344051] font-bold text-lg">Toutes mes ventes</h1>
                            <States />
                        </CardHeader>
                        <Separator className="self-center justify-self-center w-[97%]"/>
                        <CardContent className="content">
                            <DataTable columns={columns} data={data} params={params} total={total} path={path} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default SalesPage;
