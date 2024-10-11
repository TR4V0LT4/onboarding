import { SignJWT } from "jose";

export default async function encrypt(payload: any) {
    const key = new TextEncoder().encode(`${process.env.SECRET}`);
    const   jwt = new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256"})
        .setIssuedAt();
    if (!payload.keep)
        jwt.setExpirationTime("1 day");
    return await jwt.sign(key);
}
