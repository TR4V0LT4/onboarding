"use client";

import Calandar from "@/public/calandar.svg";
import Group from "@/public/Group.svg";
import { Button } from "../ui/button";
import Raccourci from "@/public/_x39_NCXSx_2_.svg";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Aide from "@/public/aide.svg";
import { toast } from "sonner"
import { useTour } from "@/components/layout/TourContext";

export default function MiddleSection() {
	const { setRunTour } = useTour();
	
	function getDate() {
		const	today = new Date();
		const	day = today.getDate();
		const	monthNames = [
			"Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
		];
		const	monthName = monthNames[today.getMonth()];
		const	year = today.getFullYear().toString().slice(2);

		return `${day} ${monthName} ${year}`;
	}
	function clickCopy() {
		navigator.clipboard.writeText("05 20 47 37 27")
			.then(() => {
				toast.success("Numéro copié !", {
					action: {
						label: "Cacher",
						onClick: () => { toast.dismiss() }
					}
				});
			}).catch(() => {
				toast.error("Erreur lors de la copie du numéro.")
			});
	}

	return (
		<Card className="bg-inherit border-none shadow-none flex items-center p-0 gap-5 font-medium flex-col header:flex-row">
			<CardHeader className="flex flex-row items-center p-0 gap-3 text-[#344051]">
				<Group
					alt="une icône du logo de Blinkpharma portant un casque"
				/>
				<div
					className="mt-0"
				>
					<h1
						className="hover:text-[#3378FF] hover:cursor-pointer"
						onClick={clickCopy}
					>
						05 20 47 37 27
					</h1>
				</div>
			</CardHeader>
			<CardContent
				className="p-0 gap-5 flex flex-col header:flex-row"
			>
				<Button
					className="bg-[#FFFFFF] text-[#344051] rounded-[8px] shadow-header hover:bg-[#FFFFFF1A] flex gap-2 h-[40px] text-[16px] font-medium"
				>
					<Raccourci
						alt="une icône de raccourci"
					/>
					<h1>
						raccourci
					</h1>
				</Button>
				<Button
					onClick={() => setRunTour(true)}
					className="bg-[#FFFFFF] text-[#344051] rounded-[8px] shadow-header hover:bg-[#FFFFFF1A] flex gap-2 h-[40px] text-[16px] font-medium aide-sur-la-page-button"
					>
					<Aide alt="Une icône de bouée de sauvetage" />
					<h1>Aide sur la page</h1>
       			 </Button>
			</CardContent>
			<CardFooter
				className="p-0 flex gap-2 font-medium text-[16px] text-[#344051]"
			>
				<Calandar
					alt="une icône de calendrier"
				/>
				<h1>
					{ getDate() }
				</h1>
			</CardFooter>
		</Card>
	)
}
