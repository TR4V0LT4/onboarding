"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Vector10 from "@/public/Vector10.svg";
import Vector3 from "@/public/Vector3.svg";
import { Button } from "../ui/button";
import DoctorNewsCard from "./doctornewscard";
import { useEffect, useState } from "react";
import type { DoctorNews } from "@/types/doctornews";
import Loading from "../utils/Loading";

export default function DoctorNews() {
	const	[data, setData] = useState<DoctorNews[]>([]);
	const	[loading, setLoading] = useState<boolean>(true);
	const	[isExpanded, setIsExpanded] = useState<boolean>(false);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const	data = await fetch("/api/doctornews");
			const	json = await data.json();

			setData(json.data);
			setLoading(false);
		}
		fetchData();
	}, []);

	function handleCardClick() {
		setIsExpanded(true);
	}

	return (
		<Card
			className="border-none shadow-none p-0 bg-inherit flex flex-col gap-[10px] w-full"
		>
			<CardHeader
				className="p-0 flex flex-row justify-between items-center"
			>
				<div
					className="flex items-center gap-[10px]">
					<div
						className="p-[11px] rounded-[10px] bg-opacity-10 bg-[#24D6A5] flex justify-center items-center w-fit"
					>
						<Vector3
							stroke="#24D6A5"
							width="20"
							hight="17"
						/>
					</div>
					<CardTitle
						className="text-[#24D6A5] text-[16px] font-bold"
					>
						DoctiNews
					</CardTitle>
				</div>
				<Button
					variant={'ghost'}
					className="rounded-full"
				>
					<Vector10 />
				</Button>
			</CardHeader>
			<CardContent
				className={`p-0 flex flex-col gap-5 relative`}
				onClick={handleCardClick}
			>
				{
					loading ?
						<Loading
							stroke="#24D6A5"
						/> :
						data.map((d, index) => (
							<DoctorNewsCard
								key={index}
								data={d}
								index={!isExpanded ? index : 0}
								isExpanded={isExpanded}
							/>
						))
				}
			</CardContent>
		</Card>
	);
}
