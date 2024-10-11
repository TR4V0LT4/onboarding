"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectItem } from '@/components/ui/select';
import { Product, Molecule } from '@/types/types';
import ProductsTable from './productsuggestions';
import Molecules from './molecules';

interface FirstCardContentProps {
    onAddToCart: (product: Product) => void;
    id?: string; // Add id prop
}

const FirstCardContent = ({ onAddToCart, id }: FirstCardContentProps) => {
    const [searchMolecule, setSearchMolecule] = useState('');
    const [searchFilters, setSearchFilters] = useState({
        nameOrCode: '',
        name: '',
        ppv: '',
        pph: '',
        zone: '',
        molecule: '',
        searchType: 'startsWith',
    });
    const [selectedMolecule, setSelectedMolecule] = useState<Molecule | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                return;
            }
            inputRef.current?.focus();
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleFilterChange = (filterName: string, value: string) => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    return (
        <div id={id} className="flex flex-col mb-4 gap-y-4 placeholder:text-[#97A1AF] text-gray-600 font-normal text-sm">
            <div className="grid grid-cols-6 gap-2 h-8 w-full">
                <input type="text" 
                    placeholder={"DCI"}
                    className={"card-dci w-full col-span-2 outline-none p-2 border border-[#AFB4C5] rounded-[8px] mb-2 " + (selectedMolecule ? 'bg-[#F0F4F8]' : '')}
                    value={selectedMolecule ? selectedMolecule.name : searchMolecule}
                    onChange={(e) => { 
                        setSearchMolecule(e.target.value)
                        if (selectedMolecule) {
                            setSelectedMolecule(null);
                            handleFilterChange('molecule', '');
                        }
                    }}
                />
                <input
                    type="text"
                    placeholder="Nom ou code barre"
                    className="card-NOC w-full col-span-4 outline-none p-2 border border-[#AFB4C5] rounded-[8px] mb-2"
                    value={searchFilters.nameOrCode}
                    onChange={(e) => handleFilterChange('nameOrCode', e.target.value)}
                    ref={inputRef}
                />
            </div>
            <Molecules 
                searchMolecule={searchMolecule}
                setSearchMolecule={setSearchMolecule}
                selectedMolecule={selectedMolecule}
                setSelectedMolecule={setSelectedMolecule}
                handleFilterChange={handleFilterChange}
            />
            <div className="grid grid-cols-6 gap-2 h-8 w-full">
                <Select onValueChange={(value) => handleFilterChange('searchType', value)}>
                    <SelectTrigger className="col-span-2 flex flex-row w-full gap-x-2 bg-white border border-[#AFB4C5] rounded-[8px] outline-none card-select">
                        <SelectValue className='text-base ' placeholder="Commence par" />
                        <ChevronDown className="stroke-[#97A1AF]" />
                    </SelectTrigger>
                    <SelectContent className="outline-none">
                        <SelectGroup>
                            <SelectItem value="startsWith">Commence par</SelectItem>
                            <SelectItem value="endsWith">Se termine par</SelectItem>
                            <SelectItem value="contains">Contient</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="p-2 border border-[#AFB4C5] rounded-[8px] flex flex-row justify-between items-center card-name ">
                    <input 
                        type="text" 
                        placeholder="Nom" 
                        className="w-10/12 outline-none justify-start " 
                        value={searchFilters.name}
                        onChange={(e) => handleFilterChange('name', e.target.value)}
                    />
                    <Search className='stroke-[#97A1AF] w-4 h-4' />
                </div>
                <div className="p-2 border border-[#AFB4C5] rounded-[8px] flex flex-row justify-start items-center   card-ppv">
                    <input 
                        type="text" 
                        placeholder="PPV" 
                        className="w-10/12 outline-none "
                        value={searchFilters.ppv}
                        onChange={(e) => handleFilterChange('ppv', e.target.value)}
                    />
                    <Search className='stroke-[#97A1AF] w-4 h-4' />
                </div>
                <div className="p-2 border border-[#AFB4C5] rounded-[8px] flex flex-row justify-start items-center card-pph">
                    <input 
                        type="text" 
                        placeholder="PPH" 
                        className="w-10/12 outline-none " 
                        value={searchFilters.pph}
                        onChange={(e) => handleFilterChange('pph', e.target.value)}
                    />
                    <Search className='stroke-[#97A1AF] w-4 h-4' />
                </div>
                <Select>
                    <SelectTrigger className="flex flex-row w-full gap-x-2 bg-white border border-[#AFB4C5] rounded-[8px] outline-none card-zone">
                        <SelectValue className='text-base' placeholder="Zone" />
                        <ChevronDown className="stroke-[#97A1AF]" />
                    </SelectTrigger>
                    <SelectContent className="outline-none">
                        <SelectGroup>
                            <SelectItem value="com">COM</SelectItem>
                            <SelectItem value="sirop">Siropp</SelectItem>
                            <SelectItem value="tiroire">Titoire</SelectItem>
                            <SelectItem value="tableau">Tableau</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center mb-4">
                <input type="checkbox" id="showUsedProducts" className="mr-2 w-4 h-4" />
                <label htmlFor="showUsedProducts" className="text-[#344051] text-base">Afficher uniquement les produits utilisés</label>
            </div>
            <div className="bg-white rounded mt-2">
                <ProductsTable 
                    searchFilters={searchFilters} 
                    onAddToCart={onAddToCart} 
                    setSearchFilters={setSearchFilters}
                />
            </div>
        </div>
    );
};

export default FirstCardContent;