import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import HomeIcon from "@/public/sidenav-icons/home.svg";
import Link from "next/link";

export default function Heading() {
	return (
		<Card
			className="border-none shadow-none bg-inherit p-0 grid grid-cols-4 gap-4 mt-10"
		>
			<CardHeader
				className="p-0"
			>
				<CardTitle>
					<p
						className="font-bold text-[30px] text-[#344051]"
					>
						Accueil
					</p>
				</CardTitle>
			</CardHeader>
			<CardContent
				className="p-0"
			>
			</CardContent>
			<CardFooter
				className="p-0 col-start-4 w-full"
			>
				<Link
					href="/"
					className="bg-[#2C71F6] text-white w-full flex justify-center items-center gap-4 h-[46px] rounded-[40px] py-[10px] px-[35px] hover:bg-[#2C71F6A1] font-bold text-[18px] shadow-heading"
				>
					<HomeIcon fill="white" />
					<p>
                        Fil d&apos;actualité
					</p>
				</Link>
			</CardFooter>
		</Card>
	)
}
