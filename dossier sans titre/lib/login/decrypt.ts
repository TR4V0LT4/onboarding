import { jwtVerify } from "jose";

export default async function decrypt(input: string) {
    const key = new TextEncoder().encode(`${process.env.SECRET}`);
    try {
        const   { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
        // //////console.log("payload", payload);
        return payload;
    } catch(error)
    {
        //////console.log("catch");
        return null;
    }
}
