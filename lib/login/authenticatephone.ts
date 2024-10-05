"use server"

import loginPhone from "./routes/loginPhoneRoute";
import setSession from "./setsession";

export default async function authenticatePhone(payload: {
    phone: string;
}
) {
    try {
        //////console.log(payload);
        //////console.log(process.env.API_URL);
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        // const   response = await fetch(`${process.env.API_URL}/send-otp?phone=${payload.phone}`, {
        //     method: "GET",
        //     headers: {
        //         "Accept": "application/json"
        //     },
        // });
        const data = await loginPhone(payload.phone);

        //////console.log("response status:", response.status);
        // //////console.log("Response headers:", response.headers);
        // const   data = await response.json();
        // ////console.log(data);
        // if (data.success)
        //     await setSession(data, undefined);
        return data;
    }
    catch(error) {
        ////console.log(error)
        //////console.log("here")
		return null;
    }
}