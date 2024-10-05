import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import ProductsTable from '../addsale/productstable';
import PayementDetails from './payementdetails';
import { calculateTotalHT, calculateTotalTTC, calculatePPVR } from '@/lib/utils';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import PrimaryButton from '@/components/utils/primarybutton';
import SecondaryButton from '@/components/utils/secondarybutton';
import TertiaryButton from '@/components/utils/tertiarybutton';

const SaleDetailsComponent = ({ saleData, productsData }: { saleData: any, productsData: any }) => {

    const calculateTotalRemise = () => {
        return productsData.reduce((acc: number, item: any) => {
            if (item.type_remise === '0') {
                return acc + (item.remise ?? 0) * (item.quantity ?? 0);
            } else if (item.type_remise === '1') {
                return acc + ((item.selected_ppv ?? 0) * (item.remise ?? 0) / 100) * (item.quantity ?? 0);
            } else {
                return acc;
            }
        }, 0);
    };

    const totalHT = productsData.reduce((acc: any, item: any) => acc + calculateTotalHT(item), 0);

    return (
        <div className="p-4 grid grid-cols-6 gap-x-5 gap-y-4">
            <header className="flex justify-between items-center mb-6 col-span-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#344051]">Facture</h1>
                    <div className="text-[#A6ACBE] text-sm">
                        <Link href="/" className="hover:text-blue-400">Accueil</Link>
                        <span> &gt; </span>
                        <Link href="#" className="hover:text-blue-400">Facture</Link>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <TertiaryButton content="Annuler" />
                    <SecondaryButton content="Retour sur vente" />
                    <SecondaryButton content="Ticket" />
                    <SecondaryButton content="Facture" />
                    <SecondaryButton content="Facture BL" />
                    <SecondaryButton content="Dupliquer" />
                </div>
            </header>

            <Card className="mb-4 col-span-4 border-0">
                <CardHeader className="text-xl font-bold text-[#344051] p-4">
                    {saleData.reference}
                </CardHeader>
                <CardContent>
                    <h2 className="font-semibold mb-2">Informations de la facture</h2>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="text-gray-500">Client</label>
                            <p>{saleData.client}</p>
                        </div>
                        <div>
                            <label className="text-gray-500">Date de la vente</label>
                            <p>{saleData.date}</p>
                        </div>
                        <div>
                            <label className="text-gray-500">Livrée</label>
                            <p>{saleData.waiting === '1' ? "Oui" : "Non"}</p>
                        </div>
                        <div>
                            <label className="text-gray-500">Sur ordonnance</label>
                            <p>{saleData.ordonnance === '1' ? "Oui" : "Non"}</p>
                        </div>
                    </div>

                    <ProductsTable cart={productsData} />

                    <div className="flex justify-end mt-4">
                        <div className="bg-blue-500 text-white p-4 rounded justify-between">
                            <p className='flex justify-between'>Sous-total HT : <span className='text-right'>{totalHT.toFixed(2)} Dhs</span></p>
                            <p className='flex justify-between'>TVA : <span className='text-right'>0 Dhs</span></p>
                            <p className='flex justify-between'>Total remise : 
                                <span className='text-right'>
                                    {calculateTotalRemise().toFixed(2)} Dhs
                                </span></p>
                            <p className="font-bold flex justify-between">Total à payer (TTC) : {productsData.reduce((acc: any, item: any) => acc + calculateTotalTTC(item), 0).toFixed(2)} Dhs</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="col-span-2 gap-y-4">
                <Card 
                    className={`flex gap-x-4  items-center border-0 p-4 mb-4 font-medium ${saleData.status === '1' ? "bg-green-100 text-[#10B981]" : (saleData.status === '0' ? "bg-yellow-100 text-[#F59E0B]" : "bg-red-100 text-[#EF4444]")}`}
                >
                    {saleData.status === '1' ? (
                        <ThumbsUp size={24} style={{ color: '#10B981' }} />
                        ) : (saleData.status === '0' ? (
                            <ThumbsUp size={24} style={{ color: '#F59E0B' }} />
                            ) : (
                                <ThumbsDown size={24} style={{ color: '#EF4444' }} />
                    )
                    )}
                    <p >{saleData.status === '1' ? "Payée totalement" : (saleData.status === '0' ? "Payée partiellement" : "Crédit")}</p>
                </Card>
                <Card className="text-[#344051] border-0 p-4 mb-4 flex gap-x-5">
                    <p>Reste à payer</p>
                    <p className="font-bold">{saleData.montant_credit} Dhs</p>
                </Card>
                <Card className="border-0 p-4 flex flex-col justify-between gap-y-4">
                    <h3 className="font-semibold text-[#344051]">Informations de traçabilité</h3>
                    <p className='flex gap-x-5 text-[#344051]'>Créée par: <span className='font-bold'>{saleData.first_name + " " + saleData.last_name}</span></p>
                    <p className='flex gap-x-8 text-[#344051]'>Créée le: <span className='font-bold'>{saleData.date}</span></p>
                </Card>
            </div>
            {saleData.paymentMethod === 'Chèque' || saleData.paymentMethod === 'Lettre de change' && (
                <PayementDetails saleData={saleData} />
            )}

        </div>
    );
}

export default SaleDetailsComponent;