"use server"

import getSession from "../getsession";
import setSession from "../login/setsession";
import verifyPhone from "./routes/verifyPhoneRoute";

export default async function VerifyNumber(payload: {
   pin: string,
   phone: string,
   type?: string
}
) {
    try {
        //////console.log(payload);
        //////console.log(process.env.API_URL);
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        // //////console.log(payload)
        const sessionData: any = await getSession();
        const token = sessionData?.data?.token;
        const tokenType = sessionData?.data?.token_type;
        // //////console.log(tokenType, token);
        const data = await verifyPhone(payload.pin, payload.phone);
        // const   response = await fetch(`${process.env.API_URL}/verify-phone?phone=${payload.phone}&code=${payload.pin}`, {
        //     method: "GET",
        //     headers: {
        //         // "Content-Type": "application/json",
        //         "Accept": "application/json",
        //         "Authorization": `${tokenType} ${token}`
        //     },
        //     // body: JSON.stringify(payload)
        // });
        //////console.log("response status:", response.status);
        // //////console.log("Response headers:", response.headers);
        // const   data = await response.json();
        //////console.log(data);
        if (data.success && payload.type == "login")
            await setSession(data, undefined);
        // await setSession(data, payload.remember);
        return data;
    }
    catch(error) {
        //////console.log(error)
        //////console.log("here")
		return null;
    }
}
