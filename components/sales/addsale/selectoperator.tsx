"use client";

import { Select, SelectContent, SelectTrigger, SelectLabel, SelectValue, SelectGroup, SelectItem } from '@/components/ui/select';
import OperatorIcon from '@/public/operator.svg';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Operator } from '@/types/types';
import { UserSession } from '@/types/usersession';
import getSession from '@/lib/getsession';

const SelectOperator = ({ operator, setOperator }: { operator: Operator | null, setOperator: (operator: Operator) => void }) => {

    const [operators, setOperators] = useState<Operator[]>([]);

    useEffect(() => {
        const fetchOperators = async () => {
            const response = await fetch('/api/operators');
            const data = await response.json();
            setOperators(data);
            const user: UserSession | null = await getSession();
            if (user?.id) {
                const selectedOperator = data.find((op: Operator) => op.id === user.id);
                if (selectedOperator) {
                    setOperator(selectedOperator);
                }
            }
        }

        fetchOperators();
    }, []);

    return (
        <Select
            value={operator?.id || ''}
            onValueChange={(value) => {
                const selectedOperator = operators.find(op => op.id === value);
                if (selectedOperator) {
                    setOperator(selectedOperator);
                }
            }}
        >
            <SelectTrigger className="flex flex-row w-full gap-x-2 bg-white border border-[#AFB4C5] rounded-[8px] outline-none text-[#97A1AF]">
                <OperatorIcon />
                <SelectValue className='text-sm' placeholder="Nom prénom">
                    {operator ? `${operator.first_name} ${operator.last_name}` : 'Nom prénom'}
                </SelectValue>
                <ChevronDown />
            </SelectTrigger>
            <SelectContent className="outline-none">
                <SelectGroup>
                    {operators.map((operator) => (
                        <SelectItem key={operator.id} value={operator.id}>
                            {operator.first_name} {operator.last_name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectOperator;