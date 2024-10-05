"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LogOut() {
	cookies().set("session", "", { expires: new Date(0)});
	redirect("/login");
}