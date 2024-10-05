"use client";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
import { useState, MouseEvent, useEffect } from "react";
import Elements from "@/public/elements.svg";
import Vector1 from "@/public/Vector1.svg";
import Vector2 from "@/public/Vector2.svg";
import Vector3 from "@/public/Vector3.svg";
import Vector4 from "@/public/Vector4.svg";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

export default function NavigationBar({ i }: { i: number }) {
	const	open = [i == 0, i == 1, i == 2, i == 3, i == 4];
	const	[mobile, setMobile] = useState<boolean>(false);

	function clickItem(event: MouseEvent<HTMLLIElement> ) {
		event.preventDefault();
		const index = parseInt(event.currentTarget.id);
		if (index == 0)
			window.open("/", "_self");
		if (index == 1)
			window.open("/marketplace", "_self");
	}
	function clickActuSante() {
		window.open("https://actusante.ma/", "_blank");
	}
	function clickDoctinews() {
		window.open("https://doctinews.com/", "_blank");
	}

	useEffect(() => {
		if (window.innerWidth < 813 || (window.innerWidth >= 1400 && window.innerWidth < 1478))
			setMobile(true);

		function resize() {
			if (window.innerWidth < 813 || (window.innerWidth >= 1400 && window.innerWidth < 1478))
				setMobile(true);
			else
				setMobile(false);
		}

		addEventListener("resize", resize);

		return () => removeEventListener("resize", resize);
	}, []);

	return (
		<NavigationMenu>
			<NavigationMenuList
				className="text-[14px] text-[#7D8FB3] font-extrabold rounded-r-[30px] rounded-l-[30px]"
			>
				<NavigationMenuItem
					id="0"
					onClick={clickItem}
				>
					<HoverCard>
						<HoverCardTrigger
							className={`p-[15px] rounded-l-[30px] hover:cursor-pointer flex justify-center items-center gap-2 pl-5 ${ open[0] ? "bg-[#C3CAD9] text-[#FFFFFF] hover:bg-[#C3CAD9A1]" : "hover:bg-[#FFFFFFA1] bg-[#FFFFFF]" }`}
						>
							{
									<Elements
										alt="Une icône de quatre carrés disposés de manière symétrique."
										stroke={ open[0] ? "#FFFFFF" : "#7D8FB3" }
									/>
							}
							{
								!mobile &&
									<p>
										Tout
									</p>
							}

						</HoverCardTrigger>
						<HoverCardContent
							className="w-fit border-none"
						>
							Tout
						</HoverCardContent>
					</HoverCard>
				</NavigationMenuItem>
				<NavigationMenuItem
					id="1"
					onClick={clickItem}
				>
					<HoverCard>
						<HoverCardTrigger
							className={`p-[15px] hover:cursor-pointer flex justify-center items-center gap-2 ${ open[1] ? "bg-[#2C71F6] text-[#FFFFFF] hover:bg-[#2C71F6A1]" : "bg-[#FFFFFF] hover:bg-[#FFFFFFA1]" }`}
						>
							{
									<Vector1
										alt="Une icône d’un pourcentage à l’intérieur d’un badge en forme d’étoile."
										stroke={ open[1] ? "#FFFFFF" : "#2C71F6" }
										width="18"
										hight="18"
									/>
							}
							{
								!mobile &&
									<p>
										Marché
									</p>
							}
						</HoverCardTrigger>
						<HoverCardContent
							className="w-fit border-none"
						>
							Marché
						</HoverCardContent>
					</HoverCard>

				</NavigationMenuItem>
				<NavigationMenuItem
					id="2"
				>
					<HoverCard>
						<HoverCardTrigger
							className={`p-[15px] hover:cursor-pointer flex justify-center items-center gap-2 bg-[#FFFFFF] hover:bg-[#FFFFFFA1]`}
							onClick={clickActuSante}
						>
							<Vector2
								alt="Une icône d’un cœur avec un signal de fréquence cardiaque à l’intérieur."
								stroke={ "#F36643" }
								width="18"
								hight="16"
							/>
							{
								!mobile &&
									<p>
										Actu Santé
									</p>
							}
						</HoverCardTrigger>
						<HoverCardContent
							className="w-fit border-none"
						>
							Actu Santé
						</HoverCardContent>
					</HoverCard>
				</NavigationMenuItem>
				<NavigationMenuItem
					id="3"
				>
					<HoverCard>
						<HoverCardTrigger
							className={`p-[15px] hover:cursor-pointer flex justify-center items-center gap-2 bg-[#FFFFFF] hover:bg-[#FFFFFFA1]`}
							onClick={clickDoctinews}
						>
							<Vector3
								alt="Une icône d’un journal plié en deux."
								stroke={ "#24D6A5" }
								width="18"
								hight="16"
							/>
							{
								!mobile &&
									<p>
										Doctinews
									</p>
							}
						</HoverCardTrigger>
						<HoverCardContent
							className="w-fit border-none"
						>
							Doctinews
						</HoverCardContent>
					</HoverCard>
				</NavigationMenuItem>
				<NavigationMenuItem
					id="4"
					// className={`p-[15px] rounded-r-[30px] hover:cursor-pointer flex justify-center items-center gap-2 pr-5 ${ open[4] ? "bg-[#4524F8] text-[#FFFFFF] hover:bg-[#4524F8A1]" : "bg-[#FFFFFF] hover:bg-[#FFFFFFA1]" }`}
					onClick={clickItem}
				>
					<HoverCard>
						<HoverCardTrigger
							className={`p-[15px] rounded-r-[30px] hover:cursor-pointer flex justify-center items-center gap-2 pr-5 ${ open[4] ? "bg-[#4524F8] text-[#FFFFFF] hover:bg-[#4524F8A1]" : "bg-[#FFFFFF] hover:bg-[#FFFFFFA1]" }`}
						>
							{
									<Vector4
										alt="Une icône d’une pilule ronde et d’une pilule longue."
										stroke={ open[4] ? "#FFFFFF" : "#4524F8" }
										width="16"
										height="16"
									/>
							}
							{
								!mobile &&
									<p>
										Actu Médicaments
									</p>
							}
						</HoverCardTrigger>
						<HoverCardContent
							className="w-fit border-none"
						>
							Actu Médicaments
						</HoverCardContent>
					</HoverCard>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
