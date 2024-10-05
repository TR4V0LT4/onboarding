import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";

export default function NavigationPack() {
	return (
		<NavigationMenu>
			<NavigationMenuList
				className="h-[45px] rounded-[16px] p-[4px] bg-[#F6F9FF]"
			>
				<NavigationMenuItem
					className="cursor-pointer hover:bg-[#1A5DEB] h-[37px] rounded-[12px] py-[8px] px-[12px] font-extrabold text-[14px] text-[#FFFFFF] bg-[#2C71F6] w-[138px] flex justify-center"
				>
					Pack 1
				</NavigationMenuItem>
				<div
					className="h-[10px] border-[1px] border-[#C5C6CC]"
				></div>
				<NavigationMenuItem
					className="cursor-pointer hover:bg-[#E0E7F8] h-[37px] rounded-[12px] py-[8px] px-[12px] font-bold text-[14px] text-[#767B87] w-[138px] flex justify-center"
				>
					Pack 2
				</NavigationMenuItem>
				<div
					className="h-[10px] border-[1px] border-[#C5C6CC]"
				></div>
				<NavigationMenuItem
					className="cursor-pointer hover:bg-[#E0E7F8] h-[37px] rounded-[12px] py-[8px] px-[12px] font-bold text-[14px] text-[#767B87] w-[138px] flex justify-center"
				>
					Pack 3
				</NavigationMenuItem>
				<div
					className="h-[10px] border-[1px] border-[#C5C6CC]"
				></div>
				<NavigationMenuItem
					className="cursor-pointer hover:bg-[#E0E7F8] h-[37px] rounded-[12px] py-[8px] px-[12px] font-bold text-[14px] text-[#767B87] w-[138px] flex justify-center"
				>
					Pack 4
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
