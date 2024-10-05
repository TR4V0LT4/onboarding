"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import NavigationBar from "./navigationbar";
import Vector5 from "@/public/Vector5.svg";
import Link from "next/link";

export default function Heading({ index, name }: { index: number, name: string }) {
	const	[windowWidth, setWindowWidth] = useState<number>();

	useEffect(() => {
		if (typeof window != "undefined")
			setWindowWidth(window.innerWidth);
		function handelResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handelResize);
		return () => window.removeEventListener("resize", handelResize);
	}, []);
	return (
		<Card
			className="border-none shadow-none bg-inherit p-0 grid grid-cols-4 header:justify-between"
		>
			{
				(windowWidth && windowWidth > 1400) &&
					<CardHeader
						className="p-0 col-span-1 flex justify-center"
					>
						<CardTitle>
							<p
								className="font-bold text-[30px] text-[#344051]"
							>
								{ name }
							</p>
						</CardTitle>
					</CardHeader>
			}
			<CardContent
				className={`p-0 flex justify-center ${ (windowWidth && windowWidth > 1400) ? "col-span-2" : "col-span-4" }`}
			>
				<NavigationBar
					i={index}
				/>
			</CardContent>
			{
				((windowWidth && windowWidth > 1400) && (index == 0)) &&
					<CardFooter
						className="p-0 col-span-1 flex justify-center"
					>
						<Link
							href="/todaysales"
							className="bg-[#2C71F6] text-white flex justify-center items-center gap-2 h-[46px] rounded-[40px] py-[10px] px-[30px] hover:bg-[#2C71F6A1] font-bold text-[18px] shadow-heading"
						>
							<Vector5 />
							<p>
								Mes ventes d’aujourd’hui
							</p>
						</Link>
					</CardFooter>
			}
		</Card>
	)
}
