"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SelectOperator from '@/components/sales/addsale/selectoperator';
import { Client, Product } from '@/types/types';
import SelectClient from '@/components/sales/addsale/selectclient';
import DatePickerDemo from '@/components/sales/addsale/datepicker';
import FirstCardContent from './firstcardcontent';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast";
import Cart from '@/components/sales/addsale/cart';
import SaleSummary from '@/components/sales/addsale/salesummary';
import { generateReference, calculateCartTotal } from '@/lib/utils';
import { Operator } from '@/types/types';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
    handleAddToCart,
    handleQuantityChange,
    handleRemoveFromCart,
    handleSubmit,
    handleValidate,
    handleCancel,
    handleSaleStateChange,
    handleUpdateProduct
} from './saleshandlers';
import PrimaryButton from "@/components/utils/primarybutton";
import SecondaryButton from '@/components/utils/secondarybutton';
import Joyride, { CallBackProps, STATUS ,Step} from 'react-joyride';
import { title } from 'process';
import { useTour } from "@/components/layout/TourContext";

const steps = [
    
    {
        target: '.select-client',
        content: 'Sélectionnez un client pour cette vente.',
        disableBeacon: true,
    },
   
    {
        target: '.card-NOC',
        content: 'Saisir nom ou code du produit.',
    },
    {
      target: '.operator-select',
      content: 'Choisissez l\'opérateur en charge de la vente.',
    },
    {
        target: '.card-date',
        content: 'Choisissez l\'opérateur en charge de la vente.',
    },
    {
        target: '.cart-section',
        content: 'Les produits que vous avez ajoutés.',
    },
    {
        target: '.approve-button',
        content: 'Cliquez ici pour approuver la vente.',
    },
];

const SalesDashboard = () => {
    const [saleState, setSaleState] = useState({
        client: null as Client | null,
        operator: null as Operator | null,
        date: new Date(),
        cart: [] as Product[],
        reference: generateReference(new Date(), 1),
        status: '1',
        livree: '1',
        montant_recu: 0,
        montant_credit: 0,
        montant_rendre: 0,
        ordonnance: 1,
        remise: 0,
        type_remise: '-1',
        paymentMethod: 'Espèces',
        paymentDetails: {
            chequeNumber: '',
            chequeDate: '',
            bank: '',
            issuer: ''
        }
    });
    
    const [savedSaleState, setSavedSaleState] = useState<typeof saleState | null>(null);
    const [showSummary, setShowSummary] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isClient, setIsClient] = useState(false);
    // const [runTour, setRunTour] = useState(true);
    const { runTour, setRunTour } = useTour();
    const [currentStep, setCurrentStep] = useState<number | null>(null);
    const [previousStep, setPreviousStep] = useState<number | null>(null);



    useEffect(() => {
        setIsClient(true);
    }, []);

    const highlightCurrentStep = (step: { target: string }) => {
        const target = document.querySelector(step.target);
        if (target) {
            target.classList.add('highlight');
        }
    };

    const removeHighlight = (step: { target: string }) => {
        const target = document.querySelector(step.target);
        console.log("target", target)
        if (target) {
            target.classList.remove('highlight');
            console.log("removing highlight", target)
        }
    };
    const clearAllHighlights = () => {
        steps.forEach(step => {
            const target = document.querySelector(step.target) as HTMLElement; 
            if (target) {
                target.classList.remove('highlight');
            }
        });
    };
    console.log("running", runTour)
    return (
        <div className="grid grid-cols-2 gap-x-4 p-2 rounded-[8px]">
            {isClient && (
                <>
                {runTour && (
                        <div className="overlayx"></div>
                    )}    
                <Joyride
                    steps={steps}
                    run={runTour}
                    continuous={true} 
                    showProgress={true} 
                    showSkipButton={true}
                    disableOverlayClose={true}
                    disableOverlay={true}
                    callback={(data: CallBackProps) => {
                        console.log(data); // Log callback data
                        const { status, step,index } = data;
                        console.log("status============>", status)
                        if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
                            setRunTour(false);
                            clearAllHighlights();
                        } else if (status === STATUS.RUNNING) {
                            if (previousStep !== null) {
                                removeHighlight(steps[previousStep]); // Remove highlight from last step
                            }
                            setPreviousStep(index); // Store the current step index as previous
                            highlightCurrentStep(steps[index]); // Highlight the current step
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
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            padding: '12px', 
                            border: '1px solid #2C71F6',
                        },
                        buttonNext: {
                            backgroundColor: '#2C71F6', 
                            color: '#FFFFFF',
                            borderRadius: '4px', 
                            border: 'none', 
                            padding: '10px 16px', 
                            transition: 'background-color 0.3s ease',
                        },
                        buttonBack: {
                            color: '#2C71F6', 
                            border: 'none',
                            backgroundColor: 'transparent', 
                            padding: '10px 16px',
                            transition: 'color 0.3s ease',
                        },
                        overlay: {
                            pointerEvents: 'none', // Allows interaction with underlying elements
                        },
                        buttonSkip: {
                            color: '#2C71F6', 
                            border: 'none',
                            backgroundColor: 'transparent', 
                            padding: '10px 16px',
                            transition: 'color 0.3s ease',
                        },
                    }}
                    locale={{
                        next: 'Suivant',
                        back: 'Retour',
                        last: 'Terminer',
                        skip: 'Passer',
                    }}
                />
            </>
            )}
            {!showSummary ? (
                <>
                    <header className={`flex flex-row col-span-2 justify-between items-center mb-6`}>
                        <h1 className="flex flex-col text-2xl font-bold text-[30px] text-[#344051] new-sale-title">
                            <span className="text-[#344051] font-bold text-lg mt-4">Nouvelle vente</span>
                            <div className="flex text-[#A6ACBE] font-medium text-sm ">
                                <Link href="/" type="ghost" className="hover:text-blue-400">Accueil&nbsp;</Link>&gt;
                                <Link href="" className="hover:text-blue-400">&nbsp;Nouvelle vente</Link>
                            </div>
                        </h1>
                        <PrimaryButton 
                            content="Approuver (F12)"
                            onClick={() => handleSubmit(saleState, setSavedSaleState, setShowSummary, toast)} 
                            className="approve-button"
                        />
                    </header>
                    <div className="bg-[#F7FBF5] rounded-t-[20px] col-span-2 flex gap-x-4 p-4 w-full min-h-[60svh] justify-center">
                        <Card className="rounded-[10px] max-w-3/6 col-span-1">
                            <CardHeader className="p-0 flex w-full items-center">
                                <SelectClient 
                                    client={saleState.client} 
                                    setClient={(client) => setSaleState(prevState => ({ ...prevState, client }))} 
                                    className="select-client"
                                />
                            </CardHeader>
                            <CardContent className='mt-3 p-4'>
                            <FirstCardContent 
                                id="first-card-content"
                                onAddToCart={(product) => handleAddToCart(setSaleState, product)} 
                            />
                            </CardContent>
                        </Card>
                        <Card className="rounded-[10px] w-full col-span-1" >
                            <CardHeader className="p-0 flex flex-row w-full items-center">
                                <div className="w-full bg-[#BFDFA099] p-[17px] rounded flex justify-between items-center">
                                    <div className="flex items-center gap-x-2 operator-select ">
                                        <label className="block mb-2 text-[#172266] font-bold text-sm">Opérateur<span className="text-red-600">*</span></label>
                                        <SelectOperator 
                                            operator={saleState.operator} 
                                            setOperator={(operator) => setSaleState(prevState => ({ ...prevState, operator }))} 
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-2 card-date">
                                        <label className="block mb-2 text-[#172266] font-medium text-sm text-nowrap ">Date de la vente</label>
                                        <DatePickerDemo date={saleState.date} setDate={(date) => setSaleState(prevState => ({ ...prevState, date }))} disableFutureDates={true} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-2 cart-section">
                               <Cart 
                                   cart={saleState.cart} 
                                   handleQuantityChange={(productId, quantity) => handleQuantityChange(setSaleState, productId, quantity)} 
                                   handleRemoveFromCart={(productId) => handleRemoveFromCart(setSaleState, productId)} 
                                   handleUpdateProduct={(product) => handleUpdateProduct(setSaleState, product)} 
                               />
                            </CardContent>
                        </Card>
                    </div>
                </>
            ) : (
                <div className="col-span-2 mt-4">
                    <SaleSummary
                        saleState={saleState}
                        onValidate={() => handleValidate(saleState, setShowSummary, setSaleState, toast, router)}
                        onCancel={() => handleCancel(savedSaleState, setSaleState, setShowSummary)}
                        onChange={(field, value) => handleSaleStateChange(setSaleState, field, value)}
                    />
                </div>
            )}
        </div>
    );
}

export default SalesDashboard; 