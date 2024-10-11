import { Client } from "@/types/types";
import { Button } from '@/components/ui/button';

interface ClientCreditProps {
    sale: {
        client: Client | null;
        montant_credit: number;
    };
    onChange: (value: number) => void;
}

export default function ClientCredit({ sale, onChange }: ClientCreditProps) {
    const isCreditPositive = (sale.client?.credit ?? 0) > 0;
    const isMontantCreditPositive = sale.montant_credit > 0;

    return (
        <>
            <div className="grid grid-cols-4 items-center gap-x-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Solde Client</label>
                <span className={`p-2 text-base font-bold ${isCreditPositive ? 'text-red-500' : 'text-green-500'}`}>
                    {sale.client?.credit?.toFixed(2) ?? '0.00'} Dhs
                </span>
                {isCreditPositive && (
                    <Button onClick={() => onChange(0)} className="bg-red-500 text-white font-semibold text-base p-2 rounded-[8px] w-7/12 hover:bg-red-400">
                        Crédit
                    </Button>
                )}
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reste à payer</label>
                <span className={`p-2 text-base font-medium ${isMontantCreditPositive ? 'text-red-500 font-semibold' : 'text-[#344051]'}`}>
                    {sale.montant_credit.toFixed(2)} Dhs
                </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Plafond du crédit</label>
                <span className="p-2 text-[#344051] text-base font-medium">{sale.client?.plafan_credit?.toFixed(2) ?? '0.00'} Dhs</span>
            </div>
        </>
    );
}