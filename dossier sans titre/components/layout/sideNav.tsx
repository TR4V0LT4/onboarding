"use client";
import Link from "next/link";
import { useState } from "react";
import { NavItem } from "@/types/types";
import { NavItems } from "@/components/layout/navItems";
import PremiumLogo from "@/public/sidenav-icons/blink-premium.svg";
import PremiumFullLogo from "@/public/sidenav-icons/blink-premium-full.svg";
import SideNavAccordion from "./sidenavaccordion";
import '@/app/globals.css';

export default function SideNav() {
    const [isExpanded, setIsExpanded] = useState(false);
    const navItems = NavItems();

    const handleItemClick = () => {
        setIsExpanded(false);
    };

    return (
        <div
            className={`fixed z-50 inset-y-0 left-0 custom-scrollbar h-screen transition-all ease-linear duration-200 ${
                isExpanded ? 'w-96' : 'w-24'
            } bg-white`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className={`sticky flex z-40  ${isExpanded ? 'justify-start' : 'justify-center'} p-2 mt-[14px]`}>
                <PremiumLogo className={`${isExpanded ? 'hidden' : 'inline-block'}`} />
                <PremiumFullLogo className={`${isExpanded ? 'inline-block' : 'hidden'} ml-3`} />
            </div>
            <hr className={`mx-auto my-4 border-[1px] border-[#E4E7F0] rounded-xl ${isExpanded ? 'w-9/12' : 'w-5/12'}`} />
            <ul className="flex flex-col items-center justify-center">
                {navItems.map((item, index) => (
                    <li key={index} className="w-full flex items-center">
                        {item.sublinks ? (
                            <SideNavAccordion item={item} onItemClick={handleItemClick} isExpanded={isExpanded} />
                        ) : (
                            <SideNavItem item={item} onItemClick={handleItemClick} isExpanded={isExpanded} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const SideNavItem = ({ item, onItemClick, isExpanded }: Readonly<{ item: NavItem, onItemClick: () => void, isExpanded: boolean }>) => {
    return (
        <div className="w-full flex items-center">
            <div
                className="flex-none h-9 w-[3px] rounded-r-xl mr-3"
                style={{ backgroundColor: item.active ? item.color : '' }}
            />

            {item.name !== 'Accueil' && item.name !== 'Mes ventes' && item.name != "Commandes" ? (
                <div
                    className={`flex flex-row p-3 r ${isExpanded ? 'justify-start' : 'justify-center'} gap-x-6 items-center  ${isExpanded ? 'w-11/12' : 'w-8/12'} h-12 my-2 rounded-[15px] transition-colors duration-300 ${
                        item.active ? 'text-white' : 'hover:bg-gray-200'
                    }`}
                    style={{
                        backgroundColor: item.active ? item.color : '',
                        filter: item.active ? `drop-shadow(0 15px 35px ${item.shadowColor})` : '',
                    }}
                >
                    <span className={`${isExpanded ? 'ml-2' : ''}`}>
                        <IconRenderer item={item} />
                    </span>
                    <span
                        className={`${isExpanded ? 'inline-block' : 'hidden '} text-nowrap ${
                            item.active ? 'text-white font-bold' : 'text-[#7D8FB3]'
                        }`}
                    >
                        {item.name}
                    </span>
                </div>
            ) : (
                <Link
                    href={item.href}
                    className={`flex flex-row p-3 r ${isExpanded ? 'justify-start' : 'justify-center'} gap-x-6 items-center  ${isExpanded ? 'w-11/12' : 'w-8/12'} h-12 my-2 rounded-[15px] transition-colors duration-300 ${
                        item.active ? 'text-white' : 'hover:bg-gray-200'
                    }`}
                    style={{
                        backgroundColor: item.active ? item.color : '',
                        filter: item.active ? `drop-shadow(0 15px 35px ${item.shadowColor})` : '',
                    }}
                    onClick={onItemClick}
                >
                    <span className={`${isExpanded ? 'ml-2' : ''}`}>
                        <IconRenderer item={item} />
                    </span>
                    <span
                        className={`${isExpanded ? 'inline-block' : 'hidden '} text-nowrap ${
                            item.active ? 'text-white font-bold' : 'text-[#7D8FB3]'
                        }`}
                    >
                        {item.name}
                    </span>
                </Link>
            )}
        </div>
    );
};

export const IconRenderer = ({ item }: { item: NavItem }) => {
    const commonProps = {
        fill: item.active ? 'white' : item.color,
    };

    if (['Accueil', 'Réglages', 'Mes avoirs', 'Mon stock', 'Ma caisse', 'Mes rapports'].includes(item.name)) {
        return <item.icon {...commonProps} />;
    }

    if (item.name === 'Mes clients') {
        return <item.icon {...commonProps} fillRule="evenodd" clipRule="evenodd" />;
    }

    return (
        <item.icon
            stroke={item.active ? 'white' : item.color}
            strokeWidth={item.active ? (item.name === 'Mes ventes' ? '2.5' : '2') : '1.5'}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    );
};

