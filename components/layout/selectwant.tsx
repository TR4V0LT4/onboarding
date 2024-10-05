"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Vector from "@/public/Vector.svg";

export default function SelectWant({ values }: { values?: string[] }) {
	const	[open, setOpen] = useState(false);

	return (
		<Select
			open={ open }
			onOpenChange={setOpen}
			disabled={ (!values || values.length == 0) }
		>
			<SelectTrigger
				className="w-[271px] focus:ring-offset-0 focus:ring-0 relative text-[#97A1AF] rounded-[4px] border-[#AFB4C5] text-[16px] font-normal"
			>
				<SelectValue
					placeholder="Je veux...."
				/>
				<Vector
					alt="Une flèche indique que le menu est fermé."
					className={ `transition-transform ${ open ? "rotate-180" : "rotate-0" }` }
				/>
			</SelectTrigger>
			<SelectContent className="text-[#97A1AF]">
				{
					values?.map((value) => (
						<SelectItem key={value} value={value} className="focus:text-[#97A1AF]">
							{value}
						</SelectItem>
						))
				}
			</SelectContent>
		</Select>
	);
}