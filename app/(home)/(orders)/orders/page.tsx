import MyPurchaseOrders from "@/components/orders/mypurchaseorders";
import NavigationButtons from "@/components/orders/navigationbuttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
	return (
		<Card
			className="p-[20px] shadow-none border-none bg-inherit flex flex-col gap-[23px]"
		>
			<CardHeader
				className="p-0 flex flex-row justify-between"
			>
				<CardTitle
					className="font-bold text-[30px] text-[#344051]"
				>
					Commandes
				</CardTitle>
				<NavigationButtons />
			</CardHeader>
			<CardContent
				className="p-[31px] bg-[#F7FBF5] rounded-[20px]"
			>
				<MyPurchaseOrders
					searchParams={searchParams}/>
			</CardContent>
		</Card>
	)
}