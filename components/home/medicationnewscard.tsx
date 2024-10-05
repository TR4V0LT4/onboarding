import { Card, CardContent, CardHeader } from "../ui/card";
import ProgressBar from "./progressbar";

export default function MedicationNewsCard() {
	return (
		<Card
			className="border-none shadow-product p-[20px] rounded-[20px] flex flex-col gap-3"
		>
			<CardHeader
				className="p-0 flex flex-row gap-[14px] items-center"
			>
				<div
					className="w-[65px] h-[65px]"
				>
					<ProgressBar />
				</div>
				<ul
					className="flex-grow">
					<li
						className="grid grid-cols-11 w-full font-medium text-[12px] text-[#5A5881]"
					>
						<div
							className="col-span-1 flex items-center justify-center"
						>
							<div
								className="w-[10px] h-[10px] rounded-[3px] bg-[#20C997]"
							/>
						</div>
						<p
							className="col-span-4 flex items-center justify-start"
						>
							Seringue
						</p>
						<p
							className="col-span-2 flex items-center justify-start"
						>
							<span
								className="font-bold text-[16px]"
							>
								13
							</span>
							%
						</p>
					</li>
					<li
						className="grid grid-cols-11 w-full font-medium text-[12px] text-[#5A5881]"
					>
						<div
							className="col-span-1 flex items-center justify-center"
						>
							<div
								className="w-[10px] h-[10px] rounded-[3px] bg-[#FF7049]"
							/>
						</div>
						<p
							className="col-span-4 flex items-center justify-start"
						>
							Poudre
						</p>
						<p
							className="col-span-2 flex items-center justify-start"
						>
							<span
								className="font-bold text-[16px]"
							>
								33
							</span>
							%
						</p>
					</li>
					<li
						className="grid grid-cols-11 w-full font-medium text-[12px] text-[#5A5881]"
					>
						<div
							className="col-span-1 flex items-center justify-center"
						>
							<div
								className="w-[10px] h-[10px] rounded-[3px] bg-[#4524F8]"
							/>
						</div>
						<p
							className="col-span-4 flex items-center justify-start"
						>
							Capsule
						</p>
						<p
							className="col-span-2 flex items-center justify-start"
						>
							<span
								className="font-bold text-[16px]"
							>
								73
							</span>
							%
						</p>
					</li>
				</ul>
			</CardHeader>
			<CardContent
				className="p-0"
			>
				<p
					className="font-normal text-[#767676] text-[14px]"
				>
					Nec vox accusatoris ulla licet subditicii accusatoris ullain his malorum acervis...
				</p>
			</CardContent>
		</Card>
	);
}
