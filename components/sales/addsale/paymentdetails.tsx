import DatePickerDemo from '@/components/sales/addsale/datepicker';

export default function PaymentDetails({ paymentDetails, onChange } : { paymentDetails: any, onChange: any }) {
    return (
        <div className="flex flex-col justify-items-start mt-8 p-0">
            <span className="text-[#344051] font-medium self-start">Informations de paiement</span>
            <div className="mt-4 grid grid-cols-2 gap-x-4 items-center">
                <div className="grid grid-cols-2 mb-4 items-center gap-x-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">N° du chèque</label>
                    <input 
                        type="text" 
                        value={paymentDetails.chequeNumber} 
                        onChange={(e) => onChange('paymentDetails', { ...paymentDetails, chequeNumber: e.target.value })} 
                        className="p-2 col-start-2 rounded-md bg-[#F5F6FB] text-center text-[#344051] text-base  focus:outline-none focus-visible:ring-0" 
                    />
                </div>
                <div className="grid grid-cols-4 2xl:grid-cols-3 mb-4 items-center gap-x-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <DatePickerDemo 
                        date={paymentDetails.chequeDate ? new Date(paymentDetails.chequeDate) : null} 
                        setDate={(date) => onChange('paymentDetails', { ...paymentDetails, chequeDate: date.toISOString().split('T')[0] })} 
                    />
                </div>
                <div className="grid grid-cols-2 mb-4 items-center gap-x-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Banque</label>
                    <input 
                        type="text" 
                        value={paymentDetails.bank} 
                        onChange={(e) => onChange('paymentDetails', { ...paymentDetails, bank: e.target.value })} 
                        className=" p-2 rounded-md bg-[#F5F6FB] text-left text-[#344051] text-base  focus:outline-none focus-visible:ring-0" 
                    />
                </div>
                <div className="grid grid-cols-4 2xl:grid-cols-3 mb-4 items-center gap-x-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Émetteur</label>
                    <input 
                        type="text" 
                        value={paymentDetails.issuer} 
                        onChange={(e) => onChange('paymentDetails', { ...paymentDetails, issuer: e.target.value })} 
                        className="col-span-2 p-2 rounded-md bg-[#F5F6FB] text-[#344051] text-base  focus:outline-none focus-visible:ring-0" 
                    />
                </div>
            </div>
        </div>
    );
}