"use server"

import changePasswordRoute from "./routes/changePasswordRoute";
import setSession from "./setsession";

export default async function ChangePassword(payload: {
    password: string, 
    confirmation_password: string,
}
) {
    try {
        //////console.log(payload);
        //////console.log(process.env.API_URL);
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        // const   response = await fetch(`${process.env.API_URL}/login-email`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     body: JSON.stringify({
        //         "email": payload.email,
        //         "password": payload.password,
        //         // "remember": payload.remember
        //     })
        // });
        const data = await changePasswordRoute(payload.password, payload.confirmation_password);
        //////console.log("response status:", response.status);
        // //////console.log("Response headers:", response.headers);
        // const   data = await response.json();
        // ////console.log(data);
        if (data.success)
            await setSession(data, undefined);
        return data;
    }
    catch(error) {
        // ////console.log(error)
        //////console.log("here")
		return null;
    }
}