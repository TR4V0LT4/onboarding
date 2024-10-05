"use server"

import login from "./routes/loginRoute";
import setSession from "./setsession";

export default async function authenticateEmail(payload: {
    email: string;
    password: string;
    remember?: boolean | undefined;
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
        const data = await login(payload.email, payload.password);
        //////console.log("response status:", response.status);
        // //////console.log("Response headers:", response.headers);
        // const   data = await response.json();
        // //////console.log(data);
        // return null;
        if (data.success)
            await setSession(data, payload.remember);
        return data;
    }
    catch(error) {
        //////console.log(error)
        //////console.log("here")
		return null;
    }
}