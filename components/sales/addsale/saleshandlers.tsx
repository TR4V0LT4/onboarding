// salesHandlers.ts
import { z } from 'zod';
import { SaleSchema } from '@/components/sales/addsale/saleschema';
import { format } from 'date-fns';
import { Product } from '@/types/types';

export const handleAddToCart = (setSaleState: any, product: Product) => {
    setSaleState((prevState: any) => {
        const existingProduct = prevState.cart.find((item: Product) => item.id === product.id);
        const updatedCart = existingProduct
            ? prevState.cart.map((item: Product) =>
                item.id === product.id ? { ...item, quantity: (item.quantity ?? 0) + 1, selected_ppv: Number(item.ppv[0]), remise: 0, type_remise: '-1' } : item
            )
            : [{ ...product, quantity: 1, selected_ppv: Number(product.ppv[0]), remise: 0, type_remise: '-1' }, ...prevState.cart];
        return { ...prevState, cart: updatedCart };
    });
};

export const handleQuantityChange = (setSaleState: any, productId: string, quantity: number) => {
    setSaleState((prevState: any) => ({
        ...prevState,
        cart: prevState.cart.map((item: Product) =>
            item.id === productId ? { ...item, quantity: quantity } : item
        )
    }));
};

export const handleRemoveFromCart = (setSaleState: any, productId: string) => {
    setSaleState((prevState: any) => ({
        ...prevState,
        cart: prevState.cart.filter((item: Product) => item.id !== productId)
    }));
};

export const handleSubmit = (saleState: any, setSavedSaleState: any, setShowSummary: any, toast: any) => {
    try {
        SaleSchema.parse(saleState); // Validate the sale data

        setSavedSaleState(saleState); // Save the current state
        setShowSummary(true);
    } catch (error) {
        if (error instanceof z.ZodError) {
            toast({
                title: error.errors[0].message,
                className: "bg-red-500 text-white",
                variant: 'destructive',
                duration: 3000,
            });
            console.error('Validation errors:', error.errors);
        }
    }
};

export const handleValidate = async (saleState: any, setShowSummary: any, setSaleState: any, toast: any, router: any) => {
    try {
        SaleSchema.parse(saleState); // Validate the sale data

        const response = await fetch('/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saleState),
        });

        if (!response.ok) {
            throw new Error('Failed to submit sale');
        } else {
            toast({
                title: "Vente ajoutée avec succès",
                className: "bg-green-500 text-white",
                duration: 3000
            });
            setShowSummary(false);
            // Clear the form and increment the sale counter
            setSaleState({
                client: null,
                operator: null,
                date: new Date(),
                cart: [],
                reference: '',
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
            const fetchNextReference = async () => {
                try {
                    const formattedDate = format(saleState.date, 'yyyy-MM-dd');
                    const response = await fetch(`/api/sales/reference?date=${formattedDate}`);
                    const data = await response.json();
                    setSaleState((prevState: any) => ({
                        ...prevState,
                        reference: data.reference,
                    }));
                } catch (error) {
                    console.error('Failed to fetch next reference:', error);
                }
            };

            fetchNextReference();
            const res = await response.json();
            router.push('/sale/' + res.id);
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation errors
            toast({
                title: error.errors[0].message,
                className: "bg-red-500 text-white",
                variant: 'destructive',
                duration: 3000,
            });
            console.error('Validation errors:', error.errors);
        } else {
            // Handle other errors
            toast({
                title: "Erreur de soumission",
                className: "bg-red-500 text-white",
                variant: 'destructive',
                duration: 3000,
            });
            console.error('Submission error:', error);
        }
    }
};

export const handleCancel = (savedSaleState: any, setSaleState: any, setShowSummary: any) => {
    if (savedSaleState) {
        setSaleState(savedSaleState); // Revert to the saved state
    }
    setShowSummary(false);
};

export const handleSaleStateChange = (setSaleState: any, field: string, value: any) => {
    setSaleState((prevState: any) => ({
        ...prevState,
        [field]: value,
    }));
};

export const handleUpdateProduct = (setSaleState: any, product: Product) => {
    setSaleState((prevState: any) => ({
        ...prevState,
        cart: prevState.cart.map((item: Product) =>
            item.id === product.id ? product : item
        )
    }));
};