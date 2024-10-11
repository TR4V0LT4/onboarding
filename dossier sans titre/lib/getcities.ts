'use server';
import { cities } from "@/db/schema";
import { db } from '@/db';

export default async function getCities() {

    const data = await db.select({id: cities.id, name: cities.name, region_id: cities.region_id}).from(cities);
    const sortedCities = data.sort((a: any, b: any) => a.name.localeCompare(b.name));
    return sortedCities;
}