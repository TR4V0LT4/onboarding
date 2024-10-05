import SalesDashboard from '@/components/sales/addsale/salesdashboard';
import { Toaster } from '@/components/ui/toaster';

const AddSale = () => {

    return (
        <div className='h-full w-full'>
            <div className="p-[22px] flex flex-col items-center">
                {/* <span className='font-bold text-[30px] text-[#344051] self-start'>Mes ventes</span>  */}
                {/* <div
		    		className="lg:h-[90px] h-[50px] lg:w-[728px] w-[320px] bg-[#F6F9FF] border-dashed border-[1px] border-[#2C71F6] text-[#2C71F6] font-bold text-[16px]/[18px] flex justify-center items-center"
		    	></div> */}
                <SalesDashboard />
                <Toaster />
            </div>
        </div>
    );
}

export default AddSale;