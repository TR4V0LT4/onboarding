import {  users } from "@/db/schema";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
export default async function verifyPhone(OTP: string, phone: string) {

    const findUser: any = (await db.select({
        id: users.id,
        first_name: users.first_name,
        last_name: users.last_name,
        email: users.email,
        phone: users.phone,
        code: users.code
    }).from(users).where(eq(users.phone, phone)))[0];
    if (findUser) {
        if (findUser.code === OTP) {
            // await db.update(users).set({ email_verified_at: new Date(Date.now())}).where(eq(users.phone, phone)).execute();
            return { success: true, message: findUser };
        } else {
            return { success: false, message: "Le code de vérification est incorrect" };
        }
    } else {
        return { success: false, message: "User not found" };
    }
}