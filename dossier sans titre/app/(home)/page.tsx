"use client";

import Heading from "@/components/home/heading";
import MarketPlace from "@/components/home/marketplace";
import MedIndexCard from "@/components/home/medindexcard";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import HealthNews from "@/components/home/healthnews";
import DoctorNews from "@/components/home/doctornews";
import MedicationNews from "@/components/home/medicationnews";
import PostList from "@/components/home/postlist";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Back from "@/public/back.svg";

export default function Home() {
	const	[isScrollingUp, setIsScrollingUp] = useState(true);
	const	[lastScrollTop, setLastScrollTop] = useState(0);
	const	[windowWidth, setWindowWidth] = useState<number>();
	const	[isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
    	function handleScroll() {
    		const scrollTop = document.documentElement.scrollTop;

    		if (scrollTop > lastScrollTop)
        		setIsScrollingUp(false);
      		else
        		setIsScrollingUp(true);
      		setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    	};

		window.addEventListener('scroll', handleScroll);
    	return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollTop]);
	useEffect(() => {
		if (typeof window != "undefined")
			setWindowWidth(window.innerWidth);
		function handelResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handelResize);
		return () => window.removeEventListener("resize", handelResize);
	}, []);
	useEffect(() => {
		function handleScroll() {
			if (window.scrollY > 0)
				setIsScrolled(true);
			else
				setIsScrolled(false);
		}

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	function clickGoUp() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	return (
		<main
			className="p-[22px] flex flex-col items-center"
		>
			<div
				className="lg:h-[90px] h-[50px] lg:w-[728px] w-[320px] bg-[#F6F9FF] border-dashed border-[1px] border-[#2C71F6]"
			></div>
			<div
				className={ `w-full sticky top-[80px] bg-[#F7F8FB] z-40 py-[20px] transition-transform duration-300 ${ isScrollingUp ? "transform translate-y-0" : "transform -translate-y-full" }` }
			>
				<Heading
					index={0}
					name="Fil d’actualité"
				/>
			</div>
			<Card
				className="shadow-none border-none bg-inherit p-0 grid grid-cols-4 gap-4"
			>
				{
					(windowWidth && windowWidth > 1400) &&
						<CardHeader
							className="p-0 flex flex-col gap-10"
						>
							<MarketPlace />
							<MedIndexCard />
						</CardHeader>
				}
				<CardContent
					className="p-0 col-span-4 flex flex-col gap-5 header:col-span-2"
				>
					<PostList />
				</CardContent>
				{
					(windowWidth && windowWidth > 1400) &&
						<CardFooter
							className="p-0 flex flex-col gap-10"
						>
							<HealthNews />
							<DoctorNews />
							<MedicationNews />
						</CardFooter>
				}
			</Card>
			{
				isScrolled &&
					<Button
						className="sticky bottom-3 ml-auto rounded-full z-50 p-0 w-[50px] h-[50px]"
						variant={"ghost"}
						onClick={clickGoUp}
					>
						<Back />
					</Button>
			}
		</main>
	);
}

