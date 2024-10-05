import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export default function PaymentStatus({ paymentMethod, reference, onChange, statut, livree, ordonnance, }: { paymentMethod: string, reference: string, onChange: any, statut: string, livree: string, ordonnance: number }) {
    return (
        <div className="grid grid-cols-4 grid-rows-4 gap-y-4 gap-x-3 items-center">
            <div className="col-span-2 row-span-1 grid grid-cols-3 2xl:grid-cols-2 items-center">
                <label className="block text-sm text-[#344051] mb-1 font-medium">Statut</label>
                <Select
                    value={statut}
                    onValueChange={(value) => onChange('status', value)}
                >
                    <SelectTrigger className="bg-[#F5F6FB] text-[#9DA1C0] text-sm text-left rounded p-3 outline-none ml-1 col-span-2 2xl:col-span-1">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Payée totalement</SelectItem>
                        <SelectItem value="0">Payée partiellement</SelectItem>
                        <SelectItem value="2">Crédit</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="row-span-4 col-span-2 row-start-1 col-start-3 grid grid-rows-4 xl:grid-cols-2 gap-2 justify-center items-center">
                <button 
                    className={`px-1  min-h-12 rounded-md text-sm ${paymentMethod === 'Espèces' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`} 
                    onClick={() => onChange('paymentMethod', 'Espèces')}
                >
                    Espèces
                </button>
                <button 
                    className={`px-1  min-h-12 rounded-md text-sm ${paymentMethod === 'Chèque' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`} 
                    onClick={() => onChange('paymentMethod', 'Chèque')}
                >
                    Chèque
                </button>
                <button 
                    className={`px-1  min-h-12 rounded-md text-sm ${paymentMethod === 'Carte bancaire' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`} 
                    onClick={() => onChange('paymentMethod', 'Carte bancaire')}
                >
                    Carte bancaire
                </button>
                <button 
                    className={`px-1  min-h-12 rounded-md text-sm ${paymentMethod === 'Lettre de change' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`} 
                    onClick={() => onChange('paymentMethod', 'Lettre de change')}
                >
                    Lettre de change
                </button>
            </div>
            <div className="col-span-2 col-start-1 row-start-2 grid grid-cols-3 2xl:grid-cols-2 items-center">
                <label className="block text-sm text-[#344051] mb-1 font-medium">Référence</label>
                <input 
                    type="text" 
                    value={reference || ''} 
                    onChange={(e) => onChange('reference', e.target.value)}
                    className="p-2 border bg-[#F5F6FB] text-[#344051] rounded col-span-2 2xl:col-span-1"
                    disabled={true}
                />
            </div>
            <div className='col-span-2 grid grid-cols-2 items-center'>
                <label className="block text-sm font-medium text-[#344051] mb-1">Livrée</label>
                <div className="flex space-x-2 items-center">
                    <button 
                        className={`px-3 ml-1 py-1 rounded-md text-sm ${livree === '1' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`} 
                        onClick={() => onChange('livree', '1')}
                    >
                        Oui
                    </button>
                    <button 
                        className={`px-3 py-1 rounded-md text-sm ${livree === '0' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`} 
                        onClick={() => onChange('livree', '0')}
                    >
                        Non
                    </button>
                </div>
            </div>
            <div className='col-span-2 row-start-4 grid grid-cols-2 items-center'>
                <label className="block text-sm font-medium text-[#344051] mb-1">Sur ordonnance</label>
                <div className="flex space-x-2 items-center">
                    <button 
                        className={`px-3 ml-1 py-1 rounded-md text-sm ${ordonnance === 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`} 
                        onClick={() => onChange('ordonnance', 1)}
                    >
                        Oui
                    </button>
                    <button 
                        className={`px-3 py-1 rounded-md text-sm ${ordonnance === 0 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`} 
                        onClick={() => onChange('ordonnance', 0)}
                    >
                        Non
                    </button>
                </div>
            </div>
        </div>
    );
}