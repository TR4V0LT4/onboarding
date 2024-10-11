import { z } from 'zod';
import { Product, Client, Operator } from '@/types/types';

export const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    selected_ppv: z.number(),
    disp: z.number(),
    quantity: z.number().min(1),
    remise: z.number().optional().default(0),
    type_remise: z.string().optional().default('1'),
});

export const SaleSchema = z.object({
    client: z.object({
        id: z.string(),
        name: z.string(),
        type: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
    }).optional().default({
        id: '1',
        name: 'Client de passage',
        type: 'Client régulier',
        phone: '',
        email: '',
    }),
    operator: z.object({
        id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        phone: z.string().optional(),
    }).or(z.null()).optional().default(null),
    date: z.date(),
    cart: z.array(ProductSchema),
    reference: z.string().optional(),
    status: z.string().optional().default('1'),
    livree: z.string().optional().default('1'),
    monton_recu: z.number().optional(),
    montant_credit: z.number().optional(),
    montant_rendre: z.number().optional(),
    ordonnance: z.number().optional().default(1),
    remise: z.number().optional(),
    paymentMethod: z.string().optional().default('Espèces'),
    paymentDetails: z.object({
        chequeNumber: z.string().optional().default(''),
        chequeDate: z.string().optional().default(''),
        bank: z.string().optional().default(''),
        issuer: z.string().optional().default(''),
    }).optional().default({
        chequeNumber: '',
        chequeDate: '',
        bank: '',
        issuer: '',
    }),
})
.superRefine((data, ctx) => {

    if (data.date > new Date()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "La date de la vente ne peut pas être dans le futur",
            fatal: true,
        });

        return z.NEVER;
    }

    if (data.cart.length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Panier vide! Essayez d'ajouter des produits au panier",
            fatal: true,
        });

        return z.NEVER;
    }

    if (!data.client) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Veuillez sélectionner un client",
            fatal: true,
        })

        return z.NEVER;
    }

    if (!data.operator) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Veuillez sélectionner un opérateur",
            fatal: true,
        })

        return z.NEVER;
    }

    if (data.paymentMethod === 'Chèque' || data.paymentMethod === 'Lettre de change') {
        if (!data.paymentDetails.chequeNumber || data.paymentDetails.bank === '' || data.paymentDetails.issuer === '') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:`Veuillez remplir les détails du paiement par ${data.paymentMethod}`,
                fatal: true,
            });
        }

        return z.NEVER;
    }

    if (data.status !== '1' && data.client.name === 'Client de passage') {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Impossible de créer une vente à crédit pour un client de passage",
            fatal: true,
        });

        return z.NEVER;
    }

});


export interface Sale {
    client: Client;
    operator?: '';
    date: Date;
    cart: Product[];
    reference?: string;
    status?: string;
    livree?: string;
    monton_recu?: number;
    montant_credit?: number;
    ordonnance?: number;
    remise?: number;
}