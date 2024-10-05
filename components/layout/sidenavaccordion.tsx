"use client";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { NavItem } from "@/types/types";
import { IconRenderer } from "./sideNav";
import { usePathname } from "next/navigation";

const SideNavAccordion = ({ item, onItemClick, isExpanded }: Readonly<{ item: NavItem, onItemClick: () => void, isExpanded: boolean }>) => {
    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
    const pathname = usePathname();

    return (
        <Link href="/my-sales" className="p-0 flex w-full" onClick={onItemClick}>
        <Accordion type="single" value={(isAccordionExpanded && isExpanded) ? item.name : '' } className="flex w-full items-center" collapsible>
            <div
                className={`flex-none h-9 w-[3px] rounded-r-xl mr-3 self-start mt-4`}
                style={{ backgroundColor: item.active ? item.color : '' }}
            />
            <AccordionItem
                value={item.name}
                className={`${isExpanded ? 'w-11/12' : 'w-8/12'}`}
                onMouseEnter={() => setIsAccordionExpanded(true)}
                onMouseLeave={() => setIsAccordionExpanded(false)}
            >
                <AccordionTrigger
                    className={`flex flex-row p-3 ${isExpanded ? 'justify-start w-11/12' : 'justify-center w-8/12'} gap-x-6 items-center  h-12 my-2 rounded-[15px] transition-colors duration-300 ${
                        item.active ? 'text-white stroke-white' : 'hover:bg-gray-200 stroke-[#20C9BF]'
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
                        className={` ${isExpanded ? 'inline-block' : 'hidden'} text-nowrap ${
                            item.active ? 'text-white font-bold' : 'text-[#7D8FB3]'
                        }`}
                    >
                        {item.name}
                    </span>
                </AccordionTrigger>
                <AccordionContent className={`flex flex-col w-full`}>
                    <ul>
                        {item.sublinks.map((sublink: any, index: string) => (
                            <li key={index} className="flex flex-row items-center justify-center gap-x-4 w-full">
                                <Link
                                    href={sublink.href}
                                    className="flex ml-12 p-3 justify-start text-center gap-x-6 items-center w-full h-10 rounded-[15px] hover:bg-gray-200"
                                    onClick={onItemClick}
                                >
                                    <span 
                                        className={`text-nowrap ${pathname === sublink.href ? 'text-[#20C9BF]' : 'text-[#7D8FB3]'}`}
                                    >
                                        {sublink.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        </Link>
    );
};

export default SideNavAccordion;