import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Vector9 from "@/public/Vector9.svg";
import Vector11 from "@/public/Vector11.svg";
import Vector12 from "@/public/Vector12.svg";

export default function ProductInitialInformations() {
	return (
		<Card
			className="p-0 border-none shadow-none flex flex-col gap-[30px] bg-inherit"
		>
			<CardHeader
				className="p-0 flex flex-row gap-[39px]"
			>
				<Avatar
					className="w-[128px] h-[128px] border-[1px] border-[#E7EAF4] rounded-[26px] shadow-product0"
				>
					<AvatarImage />
					<AvatarFallback
						className="rounded-none font-bold text-[26px] text-[#2C71F6] bg-post"
					>
						N
					</AvatarFallback>
				</Avatar>
				<div
					className="flex flex-col gap-[25px]"
				>
					<div>
						<CardTitle
							className="font-bold text-[26px] text-[#2C71F6]">
							NESTLÉ
						</CardTitle>
						<CardDescription
							className="font-bold text-[20px] text-[#344051]"
						>
							Offre commerciale - Avril 2024
						</CardDescription>
					</div>
					<div
						className="flex gap-[4px]"
					>
						<Button
							className="h-[28px] rounded-[22px] py-[6px] px-[8px] bg-[#EAF2FF] font-medium text-[11px] text-[#2C71F6]"
						>
								Remise Financière
						</Button>
						<Button
							disabled
							className="h-[28px] rounded-[22px] py-[6px] px-[8px] bg-[#EAF2FF] font-medium text-[11px] text-[#2C71F6]"
						>
								Unité Gratuite
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent
				className="p-0"
			>
				<ul
					className="flex justify-between max-w-[896px] flex-col lg:flex-row gap-[10px]"
				>
					<li
						className="flex gap-[10px] items-center"
					>
						<div
							className="w-[30px] h-[30px] rounded-[5px] bg-[#FFFFFF] shadow-product1 flex justify-center items-center"
						>
							<Vector9 />
						</div>
						<p
							className="font-medium text-[14px] text-[#767B87]"
						>
							Jusqu’à <span
								className="font-bold text-[16px] text-[#344051]"
							>
								30% de remise
							</span>
						</p>
					</li>
					<li
						className="flex gap-[10px] items-center"
					>
						<div
							className="w-[30px] h-[30px] rounded-[5px] bg-[#FFFFFF] shadow-product1 flex justify-center items-center"
						>
							<Vector11 />
						</div>
						<p
							className="font-medium text-[14px] text-[#767B87]"
						>
							Expire dans : <span
								className="font-bold text-[16px] text-[#344051]"
							>
								12j : 11h : 30min
							</span>
						</p>
					</li>
					<li
						className="flex gap-[10px] items-center"
					>
						<div
							className="w-[30px] h-[30px] rounded-[5px] bg-[#FFFFFF] shadow-product1 flex justify-center items-center"
						>
							<Vector12 />
						</div>
						<p
							className="font-bold text-[16px] text-[#344051]"
						>
							Laboratoire
						</p>
					</li>
				</ul>
			</CardContent>
			<div
				className="border-[1px] border-[#E4E7F0]"
			></div>
		</Card>
	);
}
