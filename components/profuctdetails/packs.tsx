import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import NavigationPack from "./navigationpack";

export default function Packs() {
	return (
		<Card
			className="p-0 border-none shadow-none bg-inherit"
		>
			<CardHeader
				className="p-0 items-center"
			>
				<NavigationPack />
			</CardHeader>
			<CardContent
				className="p-0"
			>

			</CardContent>
			<CardFooter
				className="p-0"
			>

			</CardFooter>
		</Card>
	)
}
