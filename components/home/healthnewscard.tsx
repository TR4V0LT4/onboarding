import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import Elements1 from "@/public/elements1.svg";

export default function HealthNewsCard() {
	return (
		<Card
			className="border-none shadow-product p-[20px] rounded-[20px] flex flex-col gap-3"
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
						Lorem ipsum
					</CardTitle>
					<CardDescription
						className="text-[#767B87] text-[14px] font-normal flex items-center gap-[2px]"
					>
						<Elements1 />
						il y a 12h
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent
				className="p-0"
			>
				<p
					className="font-normal text-[#767676] text-[14px]"
				>
					Homines enim eruditos et sobrios ut infaustos et inutiles vitant, eo quoque accedente quod ...
				</p>
			</CardContent>
		</Card>
	);
}
