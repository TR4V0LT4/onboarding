import { ongoing_offers, users, premium_offers, cities, sectors } from "@/db/schema";
import { companies } from "@/db/schema";
import { db } from "@/db";
import { Location, RoleId, User } from "@/types/types";
import { eq, and } from "drizzle-orm";
import getSession from "@/lib/getsession";

async function findPharmacyByIce(id: string) {
    const pharmacy = await db
      .select()
      .from(companies)
      .where(eq(companies.id, id))
      .limit(1)
      .execute();
  
    return pharmacy[0] || null; 
}


export default async function signUpPharma(location: Location) {
    try {
        const userId: any = await getSession();
        // ////console.log(userId);
        const findUser: any = (await db.select({
            id: users.id,
            first_name: users.first_name,
            last_name: users.last_name,
            email: users.email,
            phone: users.phone,
            company_id: users.company_id
          }).from(users).where(eq(users.id, userId.id)))[0];
        // ////console.log(findUser);
        const company = await findPharmacyByIce(findUser.company_id);
        // ////console.log(company);
        const city = (await db.select().from(cities).where(eq(cities.name, location.city)))[0]
        // ////console.log(city);
        const sector = (await db.select().from(sectors).where(eq(sectors.name, city.name)))[0]
        // ////console.log(sector);
        const newCompany = await db.update(companies).set({
            name: location.pharmacy_name,
            sector_id: sector?.id ?? null,
            region_id: city.region_id,
            phone: location.fix,
            latitude: (location.lat).toString(),
            longitude: (location.lng).toString(),
            address: location.address,
            country_id: city.country_id,
            city_id: city.id
        }).where(eq(companies.id, company.id)).execute();
        return { success: true, message: findUser, is_completed: false, type: "success", status: 200 };
    } catch(error) {
        ////console.log(error);
        return {success: false, message: "Erreur lors de la création de pharmacy", status: 500, type: "error"};
    }
}   