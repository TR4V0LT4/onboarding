import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Elements0 from "@/public/elements0.svg";
import Rectangle176 from "@/public/Rectangle176.svg";
import { Marketplace } from "@/types/marketplace";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Product({ product }: { product: Marketplace }) {
	function clickProduct() {
		window.open(`/productdetails?product=${ product.id }`, "_self");
	}

	return (
		<Card
			className={`border-none p-5 shadow-product bg-[#FFFFFF] rounded-[20px] relative w-full flex flex-col gap-[10px] cursor-pointer`}
			onClick={clickProduct}
		>
			<CardHeader
				className="p-0 flex flex-row items-center gap-[10px]"
			>
				<Avatar
					className="rounded-[16px] border-[1px] border-[#E7EAF4] mr-[10px] shadow-product0 w-[55px] h-[55px]"
				>
					<AvatarImage
						src={ product?.logo ? product?.logo : "" }
					/>
					<AvatarFallback
						className="rounded-[16px] font-bold text-[20px] text-[#2C71F6] bg-[#EAF2FF]"
					>
						{ product?.name?.charAt(0) }
					</AvatarFallback>
				</Avatar>
				<div>
					<CardTitle
						className="font-bold text-[16px] text-[#344051]"
					>
							{ product?.name }
					</CardTitle>
					<CardDescription
						className="text-[14px] text-[#767676]"
					>
							Jusqu’à <span
										className="font-bold text-[#001F4F]"
									>
										{ product.remise }%
									</span> de remise
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent
				className="p-0 gap-[10px] flex"
			>
				<Button
					className="h-5 rounded-[22px] font-medium text-[10px] text-[#2C71F6] bg-[#EAF2FF] hover:bg-[#EAF2FF1A]"
				>
						Remise Financière
				</Button>
				<Button
					disabled
					className="h-5 rounded-[22px] font-medium text-[10px] text-[#2C71F6] bg-[#EAF2FF] hover:bg-[#EAF2FF1A]"
				>
						Unité Gratuite
				</Button>
			</CardContent>
			<CardFooter
				className="p-0 flex gap-2 text-[14px] text-[#767B87]"
			>
				<Elements0 />
				<p>
					Expire dans : <span
									className="font-bold text-[#001F4F]"
								>
									{ product.endDate }
								</span>
				</p>
			</CardFooter>
			<div
				className="absolute top-0 right-0"
			>
				<Rectangle176
					{
						...{
							fill: product.type == "laboratory" ? "#02C39A" : "#FF8F6B",
						}
					}
				/>
			</div>
			<p
				className={`absolute top-4 ${ product.type == "laboratory" ? "right-0" : "right-1" } font-bold text-[10px] rotate-[41deg] text-[#FFFFFF]`}
			>
				{ product.type == "laboratory" ? "Laboratoire" : "Grossiste" }
			</p>
		</Card>
	);
}
