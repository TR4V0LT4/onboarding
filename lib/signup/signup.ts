"use server"

import setSession from "../login/setsession";
import signUp from "./routes/signupRoute";

export default async function SignUp(payload: {
    first_name: string,
    last_name: string,
    email: string,
    ice: string,
    phone: string,
    password: string,
    confirmation_password: string,
    terms: boolean,
    type: string
}
) {
    try {
        const data = await signUp(payload);
        // console.log("response status:", response.status);
        // console.log("Response headers:", response.headers);
        // console.log(data);
        if (data.success)
            await setSession(data, undefined);
        // console.log(data);
        // await setSession(data, payload.remember);
        return data;
    }
    catch(error) {
        // console.log(error)
		return null;
    }
}
