"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import Elements1 from "@/public/elements1.svg";
import { DoctorNews } from "@/types/doctornews";

export default function DoctorNewsCard({ data, index, isExpanded }: { data: DoctorNews, index: number, isExpanded: boolean }) {
	function clickDoctorNews() {
		if (isExpanded)
			window.open("https://doctinews.com/", "_blank");
	}

	return (
		<Card
			className={`border-none shadow-product p-[20px] rounded-[20px] flex flex-col gap-3 transition-transform duration-300 cursor-pointer h-[155px] ${index > 0 ? "absolute" : ""} ${index == 0 ? "z-30" : (index == 1 ? "z-20 top-[20px] scale-90" : "z-10 top-[40px] scale-[.8]")}`}
			onClick={clickDoctorNews}
		>
			<CardHeader
				className="p-0 flex flex-row gap-[14px] items-center"
			>
				<Avatar
					className="shadow-product0 rounded-[16px] w-[55px] h-[55px]"
				>
					<AvatarImage />
					<AvatarFallback>
						<Image
							src={"/healthnews.jpeg"}
							alt={"une image de journal"}
							width={360}
							height={480}
						/>
					</AvatarFallback>
				</Avatar>
				<div
					className="flex flex-col gap-[10px]"
				>
					<CardTitle
						className="text-[16px] font-bold text-[#344051]"
					>
						{ data.userName }
					</CardTitle>
					<CardDescription
						className="text-[#767B87] text-[14px] font-normal flex items-center gap-[2px]"
					>
						<Elements1 />
						{ data.durations }
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent
				className="p-0"
			>
				<div
					className="font-normal text-[#767676] text-[14px] overflow-hidden text-ellipsis line-clamp-2 [&_p]:text-[14px]"
					dangerouslySetInnerHTML={{ __html: data.content ?? "" }}
				></div>
			</CardContent>
		</Card>
	);
}
