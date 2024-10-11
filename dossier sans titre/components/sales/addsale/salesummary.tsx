import React from 'react';
import { Client, Product, Operator } from '@/types/types';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductsTable from './productstable';
import PaymentDetails from './paymentdetails';
import PaymentStatus from './paymentstatus';
import ClientCredit from './clientcredit';
import { calculateTotalHT, calculateCartTotal } from '@/lib/utils';
import PrimaryButton from '@/components/utils/primarybutton';
import SecondaryButton from '@/components/utils/secondarybutton';

interface SaleSummaryProps {
    saleState: {
        client: Client | null;
        operator: Operator | null;
        date: Date;
        cart: Product[];
        reference?: string;
        status?: string;
        livree?: string;
        montant_recu?: number;
        montant_credit?: number;
        montant_rendre?: number;
        ordonnance?: number;
        remise?: number;
        paymentMethod: string;
        paymentDetails: {
            chequeNumber: string;
            chequeDate: string;
            bank: string;
            issuer: string;
        };
    };
    onValidate: () => void;
    onCancel: () => void;
    onChange: (field: string, value: any) => void;
}

const SaleSummary = ({ saleState, onValidate, onCancel, onChange }: SaleSummaryProps) => {
    const { client, operator, date, cart, reference, status, livree, montant_recu, montant_credit, montant_rendre, ordonnance, remise, paymentMethod, paymentDetails } = saleState;

    const totalHT = cart.reduce((acc, item) => acc + calculateTotalHT(item), 0);
    const totalTTC = calculateCartTotal(cart);
    const tva = totalTTC - totalHT;

    const handleMontantRecuChange = (value: number) => {
        const newMontantRecu = parseFloat(value.toFixed(2)) || 0;
        const remainingAmount = totalTTC - newMontantRecu;

        let newStatus = '2'; // Unpaid
        if (remainingAmount <= 0) {
            newStatus = '1'; // Fully paid
        } else if (remainingAmount > 0 && newMontantRecu > 0) {
            newStatus = '0'; // Partially paid
        }

        onChange('montant_recu', newMontantRecu);
        onChange('montant_credit', remainingAmount > 0 ? remainingAmount : 0);
        onChange('montant_rendre', totalTTC);
        onChange('status', newStatus);
    };

    return (
        <div className="bg-inherit p-4 rounded-lg ">
            <header className="flex justify-between items-center mb-6">
                <h1 className="flex flex-col text-2xl font-bold text-[30px] text-[#344051]">
                    <span className="text-[#344051] font-bold text-lg mt-4">Résumé de la vente</span>
                    <div className="flex text-[#A6ACBE] font-medium text-sm ">
                        <Link href="/" type="ghost" className="hover:text-blue-400">Accueil&nbsp;</Link>&gt;
                        <Link href="" className="hover:text-blue-400">&nbsp;Résumé de la vente</Link>
                    </div>
                </h1>
                <div className="flex space-x-4">
                    <SecondaryButton content="Retour" onClick={onCancel} />
                    <PrimaryButton content="Valider" onClick={onValidate} />
                </div>
            </header>
            <div className="grid grid-cols-2 gap-6 ">
                <Card className="p-6 border-0 bg-white rounded-lg">
                    <div className="grid grid-cols-4 mb-4 items-center gap-x-4">
                        <label className="block text-sm font-bold text-[#344051] mb-1">Montant reçu</label>
                        <input 
                            type="number" 
                            value={montant_recu || ''} 
                            placeholder='0.00'
                            onChange={(e) => handleMontantRecuChange(parseFloat(e.target.value))} 
                            className="p-2 rounded-md bg-[#F5F6FB] text-center text-[#344051] text-base font-extrabold focus:outline-none focus-visible:ring-0" 
                        />
                    </div>
                    <div className="grid grid-cols-4 mb-4 items-center gap-x-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Monnaie</label>
                        <input 
                            type="text" 
                            value={(montant_recu ? (montant_recu - totalTTC).toFixed(2) : '0.00') + ' Dhs'} 
                            className="p-2 rounded-md bg-[#F5F6FB] text-center text-[#344051] text-base font-medium focus:outline-none focus-visible:ring-0"
                            readOnly 
                        />
                    </div>
                    {client && client.name !== "Client de passage" && (
                        <ClientCredit sale={{ client, montant_credit: montant_credit || 0 }} onChange={handleMontantRecuChange} />
                    )}
                    <Separator className="my-4 p-[1px]" />
                    <div className="w-full mb-4 items-center gap-x-4">
                        <PaymentStatus paymentMethod={paymentMethod} reference={reference || ''} onChange={onChange} statut={status || ''} livree={livree || ''} ordonnance={ordonnance || 0} />
                    </div>
                    {(paymentMethod === 'Chèque' || paymentMethod === 'Lettre de change') && (
                        <div className='w-full'>
                            <Separator className="my-4 p-[1px]" />
                            <PaymentDetails paymentDetails={paymentDetails} onChange={onChange} />
                        </div>
                    )}
                </Card>
                <Card className="bg-white p-6 rounded-lg border-0">
                    <div className='grid grid-rows-5 grid-cols-2 grid-flow-col items-center mb-4'>
                        <span className="font-semibold text-[#344051]">Client :</span>
                        <span className="font-semibold text-[#344051]">Total commande HT:</span>
                        <span className="font-semibold text-[#344051]">TVA:</span>
                        <Separator className="col-span-3 my-2 p-[1px]" />
                        <span className="font-bold">Total à payer TTC:</span>
                        <span className=" text-[#344051] font-medium col-start-2">{client ? client.first_name + ' ' + client.name : 'Client de passage'}</span>
                        <span className=" float-right">{totalHT.toFixed(2)} Dhs</span>
                        <span className=" float-right">{tva.toFixed(2)} Dhs</span>
                        <span className="text-[#2C71F6] text-xl font-extrabold">{totalTTC.toFixed(2)} Dhs</span>
                    </div>
                    <span className="font-semibold text-[#344051]">Panier : </span>
                    < ProductsTable cart={cart} />
                </Card>
            </div>
        </div>
    );
};

export default SaleSummary;