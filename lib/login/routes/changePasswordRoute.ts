import {  users } from "@/db/schema";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcrypt";
import { sendOTP } from "@/helpers/sendotp";
import getSession from "@/lib/getsession";
export default async function changePasswordRoute(password: string, confirmPassword: string) {

    const findUser: any = await getSession();
    if (!findUser) { 
        return { success: false, message: "Vous n'êtes pas connecté" };
    }
    // ////console.log(findUser);
    const user: any = (await db.select().from(users).where(eq(users.id, findUser?.id)))[0];
    if (user) {
        if (password != confirmPassword) {
            return { success: false, message: "Les mots de passe ne correspondent pas", type: "password" };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.update(users).set({ password: hashedPassword }).where(eq(users.id, user.id)).execute();
        return { success: true, message: "Mot de passe mis à jour" };
    } else {
        return { success: false, message: "Error changing password", type: "password" };
    }
}