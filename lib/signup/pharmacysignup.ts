"use server"

import getSession from "../getsession";
import setSession from "../login/setsession";
import signUpPharma from "./routes/pharmaRoute";

export default async function SignUpPharmacy(payload: {
    pharmacy_name: string,
    ice: string,
    fix: string,
    city: string,
    // sector: number,
    address: string,
    lat: number,
    lng: number,
    // region: number,
}
) {
    try {
        //////console.log(payload);
        //////console.log(process.env.API_URL);
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        // //////console.log(payload)
        // const sessionData: any = await getSession();
        // const token = sessionData?.data?.token;
        // const tokenType = sessionData?.data?.token_type;
        //////console.log(tokenType, token);
        const data = await signUpPharma(payload);
        // const   response = await fetch(`${process.env.API_URL}/sign-up-pharmacy`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json",
        //         "Authorization": `${tokenType} ${token}`
        //     },
        //     body: JSON.stringify(payload)
        // });
        //////console.log("response status:", response.status);
        // //////console.log("Response headers:", response.headers);
        // const   data = await response.json();
        if (data.success)
            await setSession(data, undefined);
        //////console.log(data);
        // await setSession(data, payload.remember);
        return data;
    }
    catch(error) {
        ////console.log(error)
        //////console.log("here")
		return null;
    }
}
