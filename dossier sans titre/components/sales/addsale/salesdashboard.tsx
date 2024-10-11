"use client";

import { useState, useEffect,useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import SelectOperator from '@/components/sales/addsale/selectoperator';
import { Client, Product } from '@/types/types';
import SelectClient from '@/components/sales/addsale/selectclient';
import DatePickerDemo from '@/components/sales/addsale/datepicker';
import FirstCardContent from './firstcardcontent';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast";
import Cart from '@/components/sales/addsale/cart';
import SaleSummary from '@/components/sales/addsale/salesummary';
import { generateReference } from '@/lib/utils';
import { Operator } from '@/types/types';
import { useRouter } from 'next/navigation';
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
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useTour } from "@/components/layout/TourContext";
import { CSS } from '@dnd-kit/utilities'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { Settings, Target, GripVertical } from 'lucide-react'


interface ExtendedStep extends Step {
    target: string;
    content: string;
    placment?: 'top' | 'bottom' | 'left' | 'right';
    isActive: boolean;
}

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
    
    const SortableTableRow = ({ step, index, handleStepChange, handleToggleStep }) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
        } = useSortable({ id: index })
      
        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        }
      
        const handleDeleteStep = (index) => {
            const updatedSteps = steps.filter((_, i) => i !== index);
            setSteps(updatedSteps);
        };
        return (
            <TableRow ref={setNodeRef} style={style} className="hover:bg-gray-50">
            <TableCell>
                <div {...attributes} {...listeners} className="cursor-move">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                </div>
            </TableCell>
            <TableCell>{index + 1}</TableCell>
            <TableCell className='w-32'>
                <Input 
                    value={step.placement}               
                    onChange={(e) => handleStepChange(index, 'placement', e.target.value)} 
                    className="border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                />
            </TableCell>
            <TableCell>
                <Input 
                    value={step.target}
                    onChange={(e) => handleStepChange(index, 'target', e.target.value)}
                    className="border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                />
            </TableCell>
            <TableCell>
                <Input 
                    value={step.content}
                    onChange={(e) => handleStepChange(index, 'content', e.target.value)}
                    className="border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                />
            </TableCell>
            <TableCell>
                <Switch
                    checked={step.isActive}
                    onCheckedChange={() => handleToggleStep(index)}
                    className="data-[state=checked]:bg-yellow-400"
                />
            </TableCell>
            <TableCell>
    <Button onClick={handleDeleteStep}>Delete</Button>
</TableCell>

        </TableRow>
        )
    }

    const [savedSaleState, setSavedSaleState] = useState<typeof saleState | null>(null);
    const [showSummary, setShowSummary] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { runTour, setRunTour } = useTour();
    const [showStepsDialog, setShowStepsDialog] = useState(false);
    const [steps, setSteps] = useState<ExtendedStep[]>(() => {
        const savedSteps = typeof window !== 'undefined' ? localStorage.getItem('tourSteps') : null;
        return savedSteps ? JSON.parse(savedSteps) : [
            {
                target: '.select-client',
                content: 'Sélectionnez un client pour cette vente.',
                placement: 'top',
                isActive: true,
            },
            {
                target: '.card-NOC',
                content: 'Saisir nom ou code du produit.',
                placement: 'right',
                isActive: true,
            },
            {
                target: '#first-card-content',      
                content: 'Sélectionnez un client pour cette vente.',
                placement: 'right',
                isActive: true,
            },
            {
                target: '.product-suggestions',      
                content: 'Sélectionnez un client pour cette vente.',
                placement: 'right',
                isActive: true,
                
            },
            {
                target: '.cart-section',
                 placement: 'top',
                content: 'Les produits que vous avez ajoutés.',
                isActive: true,
            },
            {
                target: '.edit-ppv',
                content: 'modifier le prix de vente.',
                placement: 'top',
                isActive: true,
            },
            {
                target: '.remove-button',
                content: 'effacer le produit.',
                placement: 'top',
                isActive: true,
            },
            {
                target: '.edit-button',
                content: 'modifier le produit.',
                placement: 'top',       
                isActive: true,
            },
            {
                target: '.edit-table',
                content: 'tableau de modifications produits.',
                placement: 'top',
                isActive: true,
            },
            {
                target: '.ohter-ppv',
                content: 'Cliquez ici pour approuver la vente.',
                placement: 'top',
                isActive: true,
            },
            {
                target: '.type-remise',
                content: 'Cliquez ici pour approuver la vente.',
                postion: 'top',
                isActive: true,
            },
            {
                target: '.applique-remise',
                content: 'Cliquez ici pour approuver la vente.',
                placement: 'top',
                isActive: true,
            },
            {
                target: '.edit-date',
                content: 'Cliquez ici pour approuver la vente.',
                placement: 'top',
                isActive: true,
            },
            {
                target: '.operator-select',
                content: 'Choisissez l\'opérateur en charge de la vente.',
                placement: 'right',
                isActive: true,
            },
            {
                target: '.card-date',
                content: 'Choisissez l\'opérateur en charge de la vente.',
                placement: 'left',
                isActive: true,
            },
            {
                target: '.approve-button',
                content: 'Cliquez ici pour approuver la vente.',
                placement: 'left', 
                isActive: true,
            },
        ];
    });
    const previousStepRef = useRef<number | null>(null);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        localStorage.setItem('tourSteps', JSON.stringify(steps));
    }, [steps]);

    const highlightStep = (stepIndex: number) => {
        const step = steps[stepIndex];
        if (step && step.target) {
            const target = document.querySelector(step.target);
            if (target) {
                target.classList.add('highlight');
            }
        }
    };
    
    const handleDragEnd = (event) => {
        const { active, over } = event

        if (active.id !== over.id) {
            setSteps((items) => {
                const oldIndex = active.id
                const newIndex = over.id
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    const clearAllHighlights = () => {
        steps.forEach(step => {
            if (step.target) {
                const target = document.querySelector(step.target) as HTMLElement;
                if (target) {
                    target.classList.remove('highlight');
                }
            }
        });
    };

    const handleStepChange = (index: number, field: keyof ExtendedStep, value: string | boolean) => {
        setSteps(prevSteps => 
            prevSteps.map((step, i) => 
                i === index ? { ...step, [field]: value } : step
            )
        );
    };

    const handleToggleStep = (index: number) => {
        setSteps(prevSteps => 
            prevSteps.map((step, i) => 
                i === index ? { ...step, isActive: !step.isActive } : step
            )
        );
    };
    const [newStep, setNewStep] = useState<ExtendedStep>({
        target: '',
        content: '',
        placement: 'top', // default placement
        isActive: true,
    });

    const handleNewStepChange = (field: keyof ExtendedStep, value: string | boolean) => {
        setNewStep(prev => ({ ...prev, [field]: value }));
    };

    const handleAddStep = () => {
        if (newStep.target && newStep.content) {
            setSteps(prevSteps => [...prevSteps, newStep]);
            setNewStep({ target: '', content: '', placement: 'top', isActive: true }); // reset the new step
        } else {
            toast({ title: 'Please fill all fields', variant: 'destructive' }); // Show an error if fields are empty
        }
    };
    

    
        
    

    const handleJoyrideCallback = (data: CallBackProps) => {
        
        const { status, index, type } = data;
        const activeSteps = steps.filter(step => step.isActive);
        const activeIndex = activeSteps.findIndex((_, i) => i === index);
        const previousStep = activeSteps[activeIndex - 1];
    
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRunTour(false);
            clearAllHighlights();
        } else if (status === STATUS.RUNNING) {
          
            if (activeIndex !== -1) {
                const stepIndex = steps.findIndex(step => step === activeSteps[activeIndex]);
                clearAllHighlights();
                highlightStep(stepIndex);
            
               
                // if(previousStepRef.current && previousStepRef.current > stepIndex ) {
               
                //     removeHighlight(previousStepRef.current); 
                // }
                // else if(stepIndex -1 >= 0) 
                //     removeHighlight(stepIndex - 1);
                    
                // previousStepRef.current = stepIndex;
            }
        }
    };

    

    return (
        <div className="grid grid-cols-2 gap-x-4 p-2 rounded-[8px]">
            {isClient && (
                <>
                {runTour && (
                        <div className="overlayx"></div>
                    )}    
                <Joyride
                    steps={steps.filter(step => step.isActive)}
                    run={runTour}
                    continuous={true} 
                    showProgress={true} 
                    showSkipButton={true}
                    disableOverlayClose={true}
                    disableOverlay={true}
                    callback={handleJoyrideCallback}
                    styles={{
                        options: {
                            zIndex: 10000,
                            primaryColor: 'rgb(101, 198, 191)', 
                            textColor: '#ffd60a', 
                            backgroundColor: '#6c757d', 
                            // overlayColor: 'rgba(101, 198, 191, 0.5)',
                        },
                        tooltip: {
                            borderRadius: '8px', 
                            boxShadow: '0 2px 16px #6c757d',
                            padding: '12px', 
                        },
                        buttonNext: {
                            backgroundColor: '#ffd60a', 
                            color: '#000000',
                            borderRadius: '4px', 
                            border: 'none', 
                            padding: '10px 16px', 
                            transition: 'background-color 0.3s ease',
                        },
                        buttonBack: {
                            color: '#ffd60a', 
                            border: 'none',
                            backgroundColor: 'transparent', 
                            padding: '10px 16px',
                            transition: 'color 0.3s ease',
                        },
                        overlay: {
                            pointerEvents: 'none',
                        },
                        buttonSkip: {
                            color: '#ffd60a', 
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
                        <div className="flex gap-2">
                            <Button onClick={() => setShowStepsDialog(true)} variant="outline">
                                <Settings className="w-4 h-4 mr-2" />
                                Gérer les étapes
                            </Button>
                            <PrimaryButton 
                                content="Approuver (F12)"
                                onClick={() => handleSubmit(saleState, setSavedSaleState, setShowSummary, toast)} 
                                className="approve-button"
                            />
                        </div>
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
                                    <div id="" className="flex items-center gap-x-2 card-date ">
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
        
            <Dialog open={showStepsDialog} onOpenChange={setShowStepsDialog}>
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
            <DialogTitle>Gérer les étapes du tour</DialogTitle>
        </DialogHeader>
        <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Étape</TableHead>
                        <TableHead>Cible</TableHead>
                        <TableHead>Contenu</TableHead>
                        <TableHead>Actif</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                <SortableContext 
                                items={steps.map((_, index) => index)}
                                strategy={verticalListSortingStrategy}
                            >
                                {steps.map((step, index) => (
                                    <SortableTableRow 
                                        key={index}
                                        step={step}
                                        index={index}
                                        handleStepChange={handleStepChange}
                                        handleToggleStep={handleToggleStep}
                                        // handleDeleteStep={handleDeleteStep}
                                    />
                                ))}
                            </SortableContext>
                    <SortableContext 
                        items={steps.map((_, index) => index)}
                        strategy={verticalListSortingStrategy}
                    >
                        {steps.map((step, index) => (
                            <SortableTableRow 
                                key={index}
                                step={step}
                                index={index}
                                handleStepChange={handleStepChange}
                                handleToggleStep={handleToggleStep}
                                handleDeleteStep={() => handleDeleteStep(index)}
                            />
                        ))}
                    </SortableContext>

                    {/* New Step Input Row */}
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    
                        <TableCell>
                            <Input 
                                placeholder="placement"
                                value={newStep.placement}
                                onChange={(e) => handleNewStepChange('placement', e.target.value)}
                                className="border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                            />
                        </TableCell>
                        <TableCell>
                            <Input 
                                placeholder="Cible"
                                value={newStep.target}
                                onChange={(e) => handleNewStepChange('target', e.target.value)}
                                className="border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                            />
                        </TableCell>
                        <TableCell>
                            <Input 
                                placeholder="Contenu"
                                value={newStep.content}
                                onChange={(e) => handleNewStepChange('content', e.target.value)}
                                className="border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                            />
                        </TableCell>
                        <TableCell>
                            <Switch
                                checked={newStep.isActive}
                                onCheckedChange={(checked) => handleNewStepChange('isActive', checked)}
                                className="data-[state=checked]:bg-yellow-400"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </DndContext>
        <DialogFooter>
            <Button onClick={handleAddStep}>Save Step</Button>
            <Button onClick={() => setShowStepsDialog(false)}>Fermer</Button>
        </DialogFooter>
    </DialogContent>
</Dialog>

        </div>
    );
}



export default SalesDashboard;