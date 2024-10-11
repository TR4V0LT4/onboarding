import Group0 from "@/public/Group0.svg";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

export default function Notifications({ notifs }: { notifs?: any }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="w-10 h-10 rounded-[8px] bg-[#FFFFFF] shadow-header flex justify-center items-center outline-none hover:bg-[#FFFFFF1A]"
			>
				<Group0 />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="bg-[#FFFFFF] m-2 shadow-header rounded-[8px] w-[400px] text-[#344051]"
			>
				<DropdownMenuLabel
					className="flex justify-center"
				>
					Notifications
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{
					notifs ? <div></div> :
						<div className="h-[100px] flex justify-center items-center">
							<p>Vous n’avez pas de notifications.</p>
						</div>
				}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}