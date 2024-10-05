"use client";

import getSession from "@/lib/getsession";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Notifications from "./notifications";
import ProfileActions from "./profileactions";
import Line from "@/public/Line.svg";
import { useEffect, useState } from "react";
import { UserSession } from "@/types/usersession";

export default function Profile() {
	const	[user, setUser] = useState<UserSession | null>(null);

	useEffect(() => {
		async function getSessionFunction() {
			const	session = await getSession();

			if (session)
				setUser(session);
		}
		getSessionFunction();
	}, []);

	return (
		<Card className="border-none shadow-none bg-inherit flex items-center gap-5">
			<CardHeader
				className="p-0"
			>
				<Line
					alt="Une ligne séparatrice"
				/>
			</CardHeader>
			<CardContent
				className="p-0"
			>
				<Notifications />
			</CardContent>
			<CardFooter
				className="p-0"
			>
				<ProfileActions user={user} />
			</CardFooter>
		</Card>
	);
}