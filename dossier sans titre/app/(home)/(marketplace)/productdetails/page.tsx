"use client";

import Heading from "@/components/home/heading";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Back from "@/public/back.svg";
import ProductDetails from "@/components/profuctdetails/productdetails";

export default function Page() {
	const	[isScrollingUp, setIsScrollingUp] = useState(true);
	const	[lastScrollTop, setLastScrollTop] = useState(0);
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
					index={1}
					name="Détails du produit"
				/>
			</div>
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
			<ProductDetails />
		</main>
	);
}
