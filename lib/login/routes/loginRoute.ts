import {  users } from "@/db/schema";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcrypt";
export default async function login(email: string, password: string) {
    const findUser: any = (await db.select({
        id: users.id,
        first_name: users.first_name,
        last_name: users.last_name,
        email: users.email,
        phone: users.phone,
        password: users.password,
        company_id: users.company_id
    }).from(users).where(eq(users.email, email)))[0];
    if (findUser) {
        const nodeBcryptHash = findUser.password.replace('$2y$', '$2a$');
        const isPasswordValid = await bcrypt.compare(password, nodeBcryptHash);
        if (isPasswordValid) {
            return { success: true, message: findUser};
        } else {
            return { success: false, message: "Mot de passe incorrect", type: "password" };
        }
    } else {
        return { success: false, message: "Votre e-mail est incorrect", type: "email" };
    }
}