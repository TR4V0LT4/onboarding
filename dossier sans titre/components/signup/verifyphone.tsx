"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import VerifyNumber from "@/lib/signup/verifynumber"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { sendOTPRoute } from "@/lib/signup/sendOTP"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Ton code doit contenir 6 chiffres",
  }),
})

interface InputOTPFormProps {
    phoneNumber: string;
    ice: string;
    login?: boolean;
    password?: boolean;
}
const InputOTPForm: React.FC<InputOTPFormProps> = ({ phoneNumber, ice, login, password}) => {


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const	router = useRouter();
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
    //////console.log(phoneNumber);
    setIsLoading(true)
    let type = ""
    //////console.log("login", login);
    if (login)
        type = "login"
    const data = await VerifyNumber({...values, phone: phoneNumber, type: type});
    if (data?.success == true) {
        if (password == true) {
            router.push(`/login/passwordreset`);
            return;
        }
        if (login == false)
        {
            const queryParams = new URLSearchParams({ referrer: ice }).toString();
            router.push(`/sign-up/pharmacy?${queryParams}`);
            return;
        }

        router.push(`/`);
        // window.location.reload();
    } else if (data?.success == false)
      
        form.setError("pin", {
        type: "manual",
        message: data.message,
        })
    else
        form.setError("pin", {
        type: "manual",
        message:
            "le serveur rencontre un problème, veuillez réessayer plus tard",
        })
    setIsLoading(false)
  }
  async function handleResendOTP() {
    setIsLoading(true);
    setMessage('');
    setIsDisabled(true);
    setTimer(60); 
    const data = await sendOTPRoute(phoneNumber);
    if (data?.success == true) {
        // window.location.reload();
    } else if (data?.success == false)
        form.setError("pin", {
        type: "manual",
        message: data.message,
        })
    else
        form.setError("pin", {
        type: "manual",
        message:
            "le serveur rencontre un problème, veuillez réessayer plus tard",
        })
    setIsLoading(false)
  } 

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isDisabled) {
      setIsDisabled(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, isDisabled]);
  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center mx-auto justify-center">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-3">
              <FormLabel className="text-bold">Entrer le code OTP reçu par Message Whatsapp</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} className="text-center">
                  <InputOTPGroup className="mx-auto">
                    <InputOTPSlot className="px-5 py-5  border-blue-600 rounded-l-md bg-white text-bold" index={0} />
                    <InputOTPSlot className="px-5 py-5  border-blue-600 bg-white text-bold" index={1} />
                    <InputOTPSlot className="px-5 py-5 border-blue-600 bg-white text-bold" index={2} />
                    <InputOTPSlot className="px-5 py-5  border-blue-600 bg-white text-bold" index={3} />
                    <InputOTPSlot className="px-5 py-5 border-blue-600 bg-white text-bold" index={4} />
                    <InputOTPSlot className="px-5 py-5 border-blue-600 rounded-r-md bg-white text-bold" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              {/* <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4 py-2 bg-blue-600 text-white rounded-md mx-auto" disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'Envoyer'}
        </Button>
      </form>
    </Form>
    <div>
      <div
        onClick={!isDisabled ? handleResendOTP : undefined}
        className={`text-center text-blue-600 hover:opacity-45 mt-4 cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'chargement...' : 'Renvoyer le code OTP'}
      </div>
      {isDisabled && <div className="text-center mt-2">Veuillez attendre {timer} secondes avant de renvoyer</div>}
      {message && <div className="text-center mt-2">{message}</div>}
    </div>
    </div>
  )
}

export default InputOTPForm;
