import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Group1 from "@/public/Group1.svg";
import Group2 from "@/public/Group2.svg";
import { Button } from "../ui/button";
import Layer_1 from "@/public/Layer_1.svg";
import Vector6 from "@/public/Vector6.svg";
import Rectangle from "@/public/Rectangle.svg";
import Link from "next/link";

export default function MedIndexCard() {
	return (
		<Card
			className="border-none rounded-[20px] bg-[#D0D0E4] shadow-product p-5 flex"
		>
			<div
				className="flex flex-col gap-[10px]">
				<CardHeader
					className="p-0 flex flex-row items-center gap-2"
				>
					<div
						className="bg-medindexcard rounded-[14px] flex justify-center items-center shadow-medindexcard0 p-[7px]"
					>
						<Vector6
							width="23"
							hight="23"
						/>
					</div>
					<Group2 />
				</CardHeader>
				<CardContent
					className="p-0 flex flex-col gap-[10px]"
				>
					<p
						className="text-[#767676] text-[12px]"
					>
						La seule base de données sur les médicaments dans la région.
					</p>
					<Link
						href="https://medindex.vercel.app/"
						target="_blank"
					>
						<Button
							className="rounded-[40px] bg-[#2C71F6] font-bold text-[10px] h-[23px] hover:bg-[#2C71F6A1]">
							Visiter le site
						</Button>
					</Link>
				</CardContent>
			</div>
			<CardFooter
				className="p-0"
			>
				<Layer_1 />
			</CardFooter>
		</Card>
	);
}
