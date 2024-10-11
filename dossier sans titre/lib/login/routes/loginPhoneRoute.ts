import {  users } from "@/db/schema";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcrypt";
import { sendOTP } from "@/helpers/sendotp";
export default async function loginPhone(phone: string) {

    const findUser: any = (await db.select().from(users).where(eq(users.phone, phone)))[0];
    if (findUser) {
        const code = await sendOTP(phone);
        if (code) {
            await db.update(users).set({ code: code }).where(eq(users.phone, phone)).execute();
            return { success: true, message: "Code envoyé" };
        } else {
            return { success: false, message: "Erreur lors de l'envoi du code", type: "code" };
        }
    } else {
        return { success: false, message: "Votre e-mail est incorrect", type: "email" };
    }
}