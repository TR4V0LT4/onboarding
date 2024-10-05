import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Packs from "./packs";
import ProductInitialInformations from "./productinitialinformations";

export default function ProductDetails() {
	return (
		<Card
			className="bg-[#FFFFFFB2] border-[2px] border-[#FFFFFF] shadow-post0 rounded-[20px] w-full p-[30px]"
		>
			<CardHeader
				className="p-0"
			>
				<ProductInitialInformations />
			</CardHeader>
			<CardContent
				className="p-0"
			>
				<Packs />
			</CardContent>
			<CardFooter
				className="p-0"
			>

			</CardFooter>
		</Card>
	);
}
