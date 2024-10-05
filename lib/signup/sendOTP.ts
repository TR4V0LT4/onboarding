'use server';
import { db } from "@/db";
import { users } from "@/db/schema";
import { sendOTP } from "@/helpers/sendotp";
import { eq } from "drizzle-orm";

export const sendOTPRoute = async (phone: string) => {

    try {
        const otp = await sendOTP(phone);
        if (otp) {
            const user = (await db.select().from(users).where(eq(users.phone, phone)).execute())[0];
            if (!user) {
                return { success: false, message: "Votre numéro de téléphone n'est associé à aucun compte" };
            }
            await db.update(users).set({
               code: otp as string, // or the correct value from ['Monsieur','Madame','Mademoiselle','Docteur','Professeur']
              }).where(eq(users.phone, phone)).execute();
            return { success: true, message: "OTP sent successfully", otp };
        } else {    
            return { success: false, message: "Error sending OTP" };
        }
    }
    catch (error) {
        // console.error(error)
        return null;
    }
}