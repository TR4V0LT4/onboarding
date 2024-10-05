"use client";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Vector10 from "@/public/Vector10.svg";
import Vector1 from "@/public/Vector1.svg";
import Product from "./product";
import { useEffect, useState } from "react";
import { Marketplace } from "@/types/marketplace";
import Loading from "../utils/Loading";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export default function MarketPlace() {
	const	[marketplace, setMarketplace] = useState<Marketplace[]>([]);
	const	[loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const	data = await fetch("/api/marketplace", { cache: "no-cache" });
			const	json = await data.json();

			setMarketplace(json.data);
			setLoading(false);
		}
		fetchData();
	}, []);

	return (
		<Card
			className="shadow-none border-none p-0 bg-inherit flex flex-col gap-[10px] w-full"
		>
			<CardHeader
				className="p-0 flex flex-row justify-between items-center"
			>
				<div
					className="flex gap-2 justify-center items-center"
				>
					<div
						className="bg-[#2C71F61A] w-10 h-10 rounded-[10px] flex justify-center items-center"
					>
						<Vector1
							stroke="#2C71F6"
							width="20"
							height="20"
						/>
					</div>
					<CardTitle>
						<p
							className="font-bold text-[#2C71F6] text-[18px]"
						>
							Marché
						</p>
					</CardTitle>
				</div>
				<Button
					variant="ghost"
					className="rounded-full"
				>
					<Vector10 />
				</Button>
			</CardHeader>
			<CardContent
				className="p-0 flex flex-col gap-5"
			>
				{
					loading ?
						<Loading
							stroke={"#2C71F6"}
						/> :
						<Carousel
							plugins={[
								Autoplay({
									delay: 3000,
								})
							]}
							className="relative"
						>
							<CarouselContent>
								{
									marketplace.map((product) => (
										<CarouselItem
											key={ product.id }
										>
											<Product
												product={ product }
											/>
										</CarouselItem>
									))
								}
							</CarouselContent>
							<CarouselPrevious
								className="absolute left-0"
							/>
							<CarouselNext
								className="absolute right-0"
							/>
						</Carousel>
				}
			</CardContent>
		</Card>
	);
}
