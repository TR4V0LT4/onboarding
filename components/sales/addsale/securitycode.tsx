"use client";

import { useState } from 'react';
import { Operator } from '@/types/types';
import PrimaryButton from '@/components/utils/primarybutton';

export default function SecurityCode({ operator }: { operator: Operator }) {
    const [securityCode, setSecurityCode] = useState('');

    const checkSecurityCode = async () => {
        const response = await fetch('/api/operators/check-security-code', {
            method: 'POST',
            body: JSON.stringify({
                id: operator.id,
                security_code: ''
            })
        });
        const data = await response.json();
        console.log(data);
    }
    
    return (
        <div className="flex flex-col justify-items-start mt-8 p-0">
            <span className="text-[#344051] font-medium self-start">Code de sécurité</span>
            <div className="mt-4 grid grid-cols-2 gap-x-4 items-center">
                <div className="grid grid-cols-2 mb-4 items-center gap-x-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Code de sécurité</label>
                    <input 
                        type="text" 
                        value={''} 
                        onChange={(e) => setSecurityCode(e.target.value)} 
                        className="p-2 col-start-2 rounded-md bg-[#F5F6FB] text-center text-[#344051] text-base  focus:outline-none focus-visible:ring-0" 
                    />
                </div>
            </div>
            <PrimaryButton content="Valider" onClick={checkSecurityCode} />
        </div>
    );
}