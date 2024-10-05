import React from 'react';

export default function States() {
    return (
        <div className="flex items-center space-x-3 text-[12px]/[20px] font-medium">
            <span className="text-sm text-gray-700">États:</span>
            <div className="flex items-center space-x-3">
              <div className="flex items-center border p-1 rounded-full border-[#9FDFBF99]">
                <div className="w-2 h-2 rounded-full bg-[#40BF7F] m-1"></div>
                <span className="text-[#40BF7F]">Payée totalement</span>
              </div>
              <div className="flex items-center border p-1 rounded-full border-[#FFD48099]">
                <div className="w-2 h-2 rounded-full bg-[#FFB21A] m-1"></div>
                <span className=" text-[#FFB21A]">Payée partiellement</span>
              </div>
              <div className="flex items-center border p-1 rounded-full border-[#F9868699]">
                <div className="w-2 h-2 rounded-full bg-[#F64C4C] m-1"></div>
                <span className="text-[#F64C4C]">Crédit</span>
              </div>
            </div>
        </div>
    );
}