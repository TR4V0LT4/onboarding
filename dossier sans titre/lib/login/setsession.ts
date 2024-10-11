"use server";

import { cookies } from "next/headers";
import encrypt from "./encrypt";

export default async function setSession(data: any, keep: boolean | undefined) {
    const expires = !keep ? new Date(Date.now() + 1000 * 60 * 60 * 24) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    const  session = await encrypt({ data: data.message, expires, keep, is_completed: data?.is_completed });

    cookies().set("session", session, { expires: expires, httpOnly: true});
}

export async function unsetSession() {
    // Set the cookie with an expiration date in the past to delete it
    cookies().set("session", "", { expires: new Date(0), httpOnly: true });
}