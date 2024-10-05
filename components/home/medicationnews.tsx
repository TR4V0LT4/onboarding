import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Vector10 from "@/public/Vector10.svg";
import Vector4 from "@/public/Vector4.svg";
import MedicationNewsCard from "./medicationnewscard";

export default function MedicationNews() {
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
						className="p-[11px] rounded-[10px] bg-opacity-10 bg-[#4524F8] flex justify-center items-center w-fit"
					>
						<Vector4
							alt="Une icône d’une pilule ronde et d’une pilule longue."
							stroke="#4524F8"
							width="20"
							height="20.06"
						/>
					</div>
					<CardTitle
						className="text-[#4524F8] text-[16px] font-bold"
					>
						ACTU MÉDICAMENTS
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
				<MedicationNewsCard />
			</CardContent>
		</Card>
	);
}
