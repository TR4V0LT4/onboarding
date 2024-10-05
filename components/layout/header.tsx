"use client";

import { Card, CardFooter } from "../ui/card";
import Profile from "./profile";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Menu from "@/public/menu.svg";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import LeftSection from "./leftsection";

export default function Header() {
	const pathname = usePathname();
	const	[windowWidth, setWindowWidth] = useState<number>();

	useEffect(() => {
		if (typeof window != "undefined")
			setWindowWidth(window.innerWidth);
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}
		
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [])

	if (pathname)
		return (
			['/login', '/sign-up', '/sign-up/pharmacy'].includes(pathname) ? null :
			<Card
				className="flex h-fit w-full border-none shadow-none bg-transparent justify-between items-center select-none p-5 header:p-0 header:pr-5"
			>
				{
					(windowWidth && windowWidth > 1400) ?
						<LeftSection /> :
						<DropdownMenu>
							<DropdownMenuTrigger
								className="bg-white rounded-[8px] shadow-header hover:bg-opacity-10 w-10 h-10 flex justify-center items-center outline-none">
								<Menu />
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="ml-24"
							>
								<LeftSection />
							</DropdownMenuContent>
						</DropdownMenu>
				}
				<CardFooter
					className="p-0"
				>
					<Profile />
				</CardFooter>
			</Card>
		)
	return null;
}
