import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Vector10 from "@/public/Vector10.svg";
import Vector2 from "@/public/Vector2.svg";
import HealthNewsCard from "./healthnewscard";

export default function HealthNews() {
	return (
		<Card
			className="border-none shadow-none p-0 bg-inherit flex flex-col gap-[10px]"
		>
			<CardHeader
				className="p-0 flex flex-row justify-between items-center"
			>
				<div
					className="flex items-center gap-[10px]">
					<div
						className="p-[11px] rounded-[10px] bg-opacity-10 bg-[#F36643] flex justify-center items-center w-fit"
					>
						<Vector2
							stroke="#F36643"
							width="21"
							hight="19"
						/>
					</div>
					<CardTitle
						className="text-[#F36643] text-[16px] font-bold"
					>
						ACTU SANTÉ
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
				className="p-0 flex flex-col gap-5"
			>
				<HealthNewsCard />
			</CardContent>
		</Card>
	);
}
