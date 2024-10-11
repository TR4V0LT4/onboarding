import { ongoing_offers, users, premium_offers } from "@/db/schema";
import { companies } from "@/db/schema";
import { alt_ids_company } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import bcrypt from "bcrypt";
// import { connect } from “@/app/dbcomfig/dbconfig?e”;
// import { sendOtp } from "@/helpers/otp";
import { RoleId, User } from "@/types/types";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';
import { sendOTP } from "@/helpers/sendotp";

async function findPharmacyByIce(ice: string) {
    const pharmacy = await db
      .select()
      .from(companies)
      .innerJoin(alt_ids_company, eq(companies.id, alt_ids_company.company_id))
      .where(and(eq(alt_ids_company.value, ice), eq(alt_ids_company.type, 'ice')))
      .limit(1)
      .execute();
  
    return pharmacy[0] || null; 
}

async function createOngoingOffer(newCompanyId: string) {
    // Find the PremiumOffer with the name 'demo'
    const premiumOffer = await db
      .select()
      .from(premium_offers)
      .where(eq(premium_offers.name, 'demo'))
      .limit(1)
      .execute();
  
    if (premiumOffer.length === 0) {
      throw new Error('PremiumOffer with name "demo" not found');
    }
  
    const premiumOfferId = premiumOffer[0].id;
  
    // Create a new OngoingOffer
    const newOngoingOffer = {
      id: uuidv4(),
      offer_id: premiumOfferId as string,
      company_id: newCompanyId as string,
      start_date: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD'
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0], // 'YYYY-MM-DD'
      active: 1,
    };
  
    // Insert the new OngoingOffer
    await db.insert(ongoing_offers).values(newOngoingOffer).execute();
  }

export default async function signUp(user: User) {
 try {   
    // ////console.log("here here");
    // const user: User = await request.json();
    const findUser: any = (await db.select().from(users).where(eq(users.email, user.email)))[0];
    if (findUser) {
      return {success: false, type: "email", message: "Cet e-mail est déjà utilisé.", status: 401};
    }
    const checkUser: any = (await db.select().from(users).where(eq(users.phone, user.phone)))[0];
    if (checkUser) {
      return { success: false, type: "phone", message: "Ce numéro de téléphone est déjà utilisé.", status: 401 };
    }
    const checkPharmacy = await findPharmacyByIce(user.ice);
    if (checkPharmacy) {
      return { success: false, type: "ice",  message: "Cette pharmacie existe déja. Veuillez contacter le responsable de la pharmacie pour vous accorder l'accès. Dr " + user.first_name + " " + user.last_name + ". \n Si vous notez un problème de titualire veuillez appeler le 05 22 27 37 47 ou nous contacter sur contact@blinkpharma.ma", status: 401 };
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const code = await sendOTP(user.phone);
    if (!code) {
      return { success: false, message: "Erreur lors de l'envoi du code OTP.", type: "error", status: 401 }
    }
    const pharmacy = await db.insert(companies).values({
      id: uuidv4(),
      name: user.first_name + " " + user.last_name,
      email: user.email,
      mobile: user.phone,
      company_type: "pharmacy",
      company_status: "demo",
    }).$returningId().execute();
    const insetedPharmacy = await db.select().from(companies).where(eq(companies.email, user.email));
    const pharmacyId = insetedPharmacy[0].id;   
    await createOngoingOffer(pharmacyId);

    const newAltIds = db.insert(alt_ids_company).values({
      id: uuidv4(),
      company_id: pharmacyId,
      value: user.ice,
      type: 'ice',
    }).execute()
    const newUser =  await db.insert(users).values({
      id: uuidv4(), // Generating a UUID for the id field
      email: user.email as string,
      password: hashedPassword as string,
      phone: user.phone as string,
      first_name: user.first_name as string,
      last_name: user.last_name as string,
      role_id: user.type as RoleId,
      code: code as string,
      company_id: pharmacyId as string,
      cgu_version: "1.0", // or the correct version that applies
      civility: "Monsieur", // or the correct value from ['Monsieur','Madame','Mademoiselle','Docteur','Professeur']
    }).execute();
    const retUser: any = (await db.select({
      id: users.id,
      firstName: users.first_name,
      lastName: users.last_name,
      email: users.email,
      phone: users.phone,
    }).from(users).where(eq(users.email, user.email)))[0];
    return { success: true, message: retUser, is_completed: true, type: "success", status: 200 };
  }
  catch(error) {
    // ////console.log(error)
    return {success: false, message: "Erreur lors de la création de l'utilisateur.", status: 500, type: "error"};
  }      
}