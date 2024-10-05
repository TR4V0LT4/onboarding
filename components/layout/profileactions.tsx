"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Vector0 from "@/public/Vector0.svg";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import EditProfile from "@/public/editprofile.svg";
import Logout from "@/public/logout.svg";
import { UserSession } from "@/types/usersession";
import LogOut from "@/lib/logout";

export default function ProfileActions({ user }: { user: UserSession | null }) {
	async function clickLogout() {
		await LogOut();
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="flex items-center outline-none bg-[#FFFFFF] h-10 p-4 gap-2 shadow-header rounded-[8px] text-[#344051]"
			>
				<Avatar
					className="w-6 h-6 border-[1px] border-[#4172ED] text-[12px]"
				>
					<AvatarImage />
					<AvatarFallback>
						{ user?.last_name.charAt(0) }
					</AvatarFallback>
				</Avatar>
				<p
					className="font-bold text-[16px]"
				>
					{ `Dr. ${user?.last_name}` }
				</p>
				<Vector0 />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="flex-grow">
				<DropdownMenuItem className="flex justify-center gap-2">
					<EditProfile />
					Modifier le profil
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="flex justify-start text-[#FF6A77] focus:text-[#FF6A77] gap-2"
					onClick={clickLogout}
				>
					<Logout />
					Se déconnecter
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}