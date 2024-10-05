'use client'

import Logo from "@/public/logo.svg";
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import authenticatePhone from '@/lib/login/authenticatephone';
import InputOTPForm from '../signup/verifyphone';
import Image from 'next/image';

const loginSchema = z.object({
  phone: z.string()
  .regex(/^\d+$/, "Le numéro de téléphone doit contenir uniquement des chiffres")
  .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres"),
});


const PhoneLoginCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [IsPhone, setIsPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
    },
  })
  const	router = useRouter();
  async function onSubmit(values: z.infer<typeof loginSchema>) {
      setIsLoading(true);
      const data = await authenticatePhone(values);
      
      if (data?.success == true) {
        setIsPhone(true);
        setPhoneNumber(values.phone);
        // window.location.reload();
      }
      else if (data?.success == false)
        form.setError("phone", {
          type: "manual",
          message: data.message
        });
      else
        form.setError("phone", {
          type: "manual",
          message: "le serveur rencontre un problème, veuillez réessayer plus tard"
        })
      setIsLoading(false);  
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  };

  return (
    <div className="flex flex-col items-center bg-opacity-50 backdrop-blur-md bg-white mb-4 md:p-8 rounded-lg shadow-lg w-[90%] lg:w-full max-w-md text-[#14226A]">
      <div className="mb-6 mt-4">
        <Logo />
      </div>
      { !IsPhone ?
      <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  id="loginsend" className="flex w-full gap-4 flex-col items-center mx-auto">
        <FormField 
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-[49%] lg:w-full">
              <FormLabel>Numéro de téléphone</FormLabel>
              <FormControl>
                <Input  onInput={handleInput} maxLength={10} placeholder="numéro de téléphone" {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={(e) => field.onChange(e.target.value.trim())}/>
              </FormControl>
              {/* <FormDescription>
                  Adresse e-mail.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
          />
        <Button type="submit" className="lg:w-full mt-4 py-2 bg-blue-600 text-white rounded-md" disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'Se connecter'}
        </Button>
      </form>
      </Form> 
      <div className="mt-6 mb-4 lg:w-full">
        <Button
          type="button"
          className="w-full py-2 border border-blue-600 text-blue-600 bg-white hover:bg-blue-200 rounded-md"
          onClick={() => window.location.href = '/login'}
          >
          Se connecter avec e-mail
        </Button>
      </div> 
      </div> : <InputOTPForm phoneNumber={phoneNumber} ice={""} login={true}/> }
    </div>
  );
};

export default PhoneLoginCard;