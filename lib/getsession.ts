"use server";

import { cookies } from "next/headers";
import decrypt from "./login/decrypt";
import { UserSession } from "@/types/usersession";
import { User } from "lucide-react";

export default async function getSession() {
    const   session = cookies().get("session")?.value;
    // //////console.log(session);
    if (session) {
        const value = await decrypt(session);
        return value ? {...value?.data!, is_completed: value?.is_completed } as UserSession : null;
    }
    return null;
}
