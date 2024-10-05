"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Elements1 from "@/public/elements1.svg";
import Vector7 from "@/public/Vector7.svg";
import { Actuality } from "@/types/actualities";
import getSession from "@/lib/getsession";
import Image from "next/image";

export default function Post({ data }: { data: Actuality }){
	const	[click, setClick] = useState(data.liked);
	const	[fallBack, setFallBack] = useState("I");
	const	[userName, setUserName] = useState("Inconnu");
	const	[likes, setLikes] = useState(data.likes);

	useEffect(() => {
		if (data.userName) {
			setFallBack(data.userName.charAt(0).toUpperCase());
			setUserName(data.userName);
		}
	}, [data.userName]);

	async function clickLike() {
		setClick(!click);
		const	user = await getSession();

		if (click) {
			setLikes(prev => {
				return prev != null ? prev - 1 : prev;
			});
			await fetch("api/actialities", {
				method: "DELETE",
				body: JSON.stringify({
					user: user?.id,
					actuality: data.id,
				})
			});
		}
		else {
			setLikes(prev => {
				return prev != null ? prev + 1 : prev;
			});
			await fetch("api/actialities", {
				method: "POST",
				body: JSON.stringify({
					user: user?.id,
					actuality: data.id,
				})
			});
		}
	}

	return (
		<Card
			className="border-none bg-[#FFFFFF] shadow-post0 p-[22px] rounded-[20px] flex flex-col gap-[11px]"
		>
			<CardHeader
				className="p-0 flex flex-row justify-between items-center"
			>
				<div
					className="flex gap-4"
				>
					<Avatar
						className={`bg-post0 w-[54px] h-[54px] rounded-[16px] shadow-post justify-center items-center`}
					>
						<AvatarImage
							src={"/Vector8.svg"}
							className="w-fit h-fit"
						/>
						<AvatarFallback
							className="bg-post rounded-[16px] font-bold text-[20px] text-[#2C71F6] select-none"
						>
							{ fallBack }
						</AvatarFallback>
					</Avatar>
					<div
						className="flex flex-col justify-between items-start"
					>
						<CardTitle
							className="text-[16px] font-bold text-[#344051]"
						>
							{ userName }
						</CardTitle>
						<CardDescription
							className="flex items-center gap-[10px] justify-center text-[14px] text-[#767B87]"
						>
								<Elements1 />
								{ data.durations }
						</CardDescription>
					</div>
				</div>
					<Badge
						className="bg-[#C3CAD9] font-medium text-[10px]"
					>
						{ data.labeled }
					</Badge>
			</CardHeader>
			<CardContent
				className="p-0 flex flex-col gap-[10px]"
			>
				<p
					className="font-bold text-[20px] text-[#344051]"
				>
					{ data.title }
				</p>
				<div
					className="text-[14px] text-[#767676]"
					dangerouslySetInnerHTML={{ __html: data.content ?? "" }}
				></div>

				{
					data.image &&
						<Image
							src={data.image}
							loader={({ src }) => src}
							alt={""}
							className="rounded-[20px] w-full"
							width={0}
							height={0}
						/>
				}

			</CardContent>
			<CardFooter
				className="p-0 flex gap-[10px]"
			>
				<div
					className="hover:cursor-pointer"
					onClick={clickLike}
				>
					<Vector7
						stroke={click ? "#00000000" : "#767676"}
						fill={click ? "#FF6A77" : "#00000000"}
					/>
				</div>
				<p
					className="text-[14px] font-medium text-[#767676] select-none"
				>
					{ likes }
				</p>
			</CardFooter>
		</Card>
	);
}