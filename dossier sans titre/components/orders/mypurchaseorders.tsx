import { Orders } from "@/types/orders";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DataTable from "./datatable";
import { columns } from "./columns";
import { Badge } from "../ui/badge";
import Vector13 from "@/public/Vector13.svg";
import getSession from "@/lib/getsession";
import Pagination from "../utils/pagination";

export default async function MyPurchaseOrders(
	{ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }
) {
	const	session = await getSession();
	const	url = `/orders`
	const	urlApi = `${process.env.NEXT_API}/api/orders`
	let		page = searchParams && searchParams["page"] as string;
	let		search = searchParams && searchParams["search"] as string;

	if (!page || isNaN(parseInt(page)) || parseInt(page) < 1)
		page = "1";
	const	response = await fetch(`${urlApi}?company_id=${session?.company_id}&page=${page}${search ? `&search=${search}` : ""}`);
	const	data = await response.json();

	for (let d of data.data) {
		d.state = d.status == 1 || d.status == 11 ? "not delivered" : (d.status == 10 ? "partially delivered" : "delivered");
		d.statuse = d.status == 1 ?
			"En brouillon" :
			(d.status == 10 ? "Livrée partiellement" : (d.status == 11 ? "Non livrée" : "Validé"));
	}

	return (
		<Card
			className="border-none shadow-orders px-[33px] py-[23px] bg-[#FFFFFFB2] rounded-[10px] border-[2px] border-[#FFFFFF] flex flex-col gap-[14px]"
		>
			<CardHeader
				className="p-0 flex flex-col gap-[19px]"
			>
				<div
					className="flex items-center justify-between">
					<CardTitle
						className="font-medium text-[15px] text-[#344051]"
					>
						Mes bons de commande
					</CardTitle>
					<div
						className="flex gap-2 flex-col"
					>
						<div
							className="font-medium text-[12px] text-[#000000] flex gap-[4px] items-center !mt-0"
						>
							<p>
								Mode de commande:
							</p>
							<Badge
								className="h-[28px] border-[1px] px-[12px] border-[#9FDFBF99] text-[#40BF7F] font-medium text-[12px] bg-inherit hover:bg-inherit flex gap-[6px]"
							>
								<Vector13
									fill="#40BF7F"
									width="8"
									height="8"
								/>
								Connectée
							</Badge>
							<Badge
								className="h-[28px] border-[1px] px-[12px] border-[#FFD48099] text-[#FFB21A] font-medium text-[12px] bg-inherit hover:bg-inherit flex gap-[6px]"
							>
								<Vector13
									fill="#FFB21A"
									width="8"
									height="8"
								/>
								Non connectée
							</Badge>
						</div>
						<div
							className="font-medium text-[12px] text-[#000000] flex gap-[4px] items-center !mt-0"
						>
							<p>
								États:
							</p>
							<Badge
								className="h-[28px] border-[1px] px-[12px] border-[#9FDFBF99] text-[#40BF7F] font-medium text-[12px] bg-inherit hover:bg-inherit flex gap-[6px]"
							>
								<Vector13
									fill="#40BF7F"
									width="8"
									height="8"
								/>
								Livrés
							</Badge>
							<Badge
								className="h-[28px] border-[1px] px-[12px] border-[#FFD48099] text-[#FFB21A] font-medium text-[12px] bg-inherit hover:bg-inherit flex gap-[6px]"
							>
								<Vector13
									fill="#FFB21A"
									width="8"
									height="8"
								/>
								Livrée partiellement
							</Badge>
							<Badge
								className="h-[28px] border-[1px] px-[12px] border-[#F9868699] text-[#F64C4C] font-medium text-[12px] bg-inherit hover:bg-inherit flex gap-[6px]"
							>
								<Vector13
									fill="#F64C4C"
									width="8"
									height="8"
								/>
								Non livrée
							</Badge>
						</div>

					</div>
				</div>
				<div
					className="border-t-[1px] border-[#E4E7F0] !mt-0"
				></div>
			</CardHeader>
			<CardContent
				className="p-0"
			>
				<DataTable columns={columns} data={data.data as Orders[]} />
				<Pagination
					page={parseInt(page)}
					url={url}
					pageNumber={data.data.length > 0 ? data.data[0].count / 5 : 1}
					search={search}
				/>
			</CardContent>
		</Card>
	);
}
