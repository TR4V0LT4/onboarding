"use client";

import { useState, useEffect, useRef } from 'react';
import { Molecule } from '@/types/types';

interface MoleculesProps {
    searchMolecule: string;
    setSearchMolecule: (value: string) => void;
    selectedMolecule: Molecule | null;
    setSelectedMolecule: (molecule: Molecule | null) => void;
    handleFilterChange: (filterName: string, value: string) => void;
}

const Molecules = ({ searchMolecule, setSearchMolecule, selectedMolecule, setSelectedMolecule, handleFilterChange }: MoleculesProps) => {
    const [molecules, setMolecules] = useState<Molecule[]>([]);

    const handleMoleculeSelect = (molecule: Molecule) => {
        handleFilterChange('molecule', molecule.name);
        setSearchMolecule(molecule.name);
        setSelectedMolecule(molecule);
        setMolecules([]);
    };

    useEffect(() => {
        const fetchMolecules = async () => {
            const response = await fetch(`/api/molecules?search=${searchMolecule}`, { cache: "no-cache" });
            const data = await response.json();
            setMolecules(data.data);
            setSelectedMolecule(null);
        };

        if (searchMolecule.trim().length > 2 && searchMolecule !== selectedMolecule?.name) {
            fetchMolecules();
        } else {
            setMolecules([]);
            // handleFilterChange('molecule', '');
        }
    }, [searchMolecule]);

    return (
        <>
            
            {molecules.length > 0 && (
                <div className="bg-white border rounded z-20">
                    <ul className="max-h-[40svh] overflow-y-scroll">
                        {molecules.map((molecule: Molecule, index) => (
                            <li key={index} 
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleMoleculeSelect(molecule)}
                            >
                                {molecule.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Molecules;