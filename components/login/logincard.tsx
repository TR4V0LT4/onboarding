'use client'

import Logo from "@/public/logo.svg";
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import authenticateEmail from '@/lib/login/authenticate';
import Image from 'next/image';

const loginSchema = z.object({
  email: z.string().email("Adresse e-mail invalide").min(4, "L'adresse e-mail est requise"),
  password: z.string().min(8, "Le mot de passe est requis"),
  remember: z.boolean().optional(),
});


const LoginCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })
  const	router = useRouter();
  const handleError = (message: string) => {
    setErrorMessage(message);
    setShowPopup(true);
  };

  async function onSubmit(values: z.infer<typeof loginSchema>) {
      setIsLoading(true);
      const data = await authenticateEmail(values);
      
      if (data?.success == true) {
        router.push("/");
        // window.location.reload();
      }
      else if (data?.success == false && data?.type) {
        const type: any = data?.type;
        form.setError(type, {
          type: "manual",
          message: data.message
        });
      }
      else
        handleError(data?.message ?? "error dans le serveur");
      setIsLoading(false);  
  }

  return (
    <div className="flex flex-col items-center bg-opacity-50 backdrop-blur-md bg-white mb-4 md:p-8 rounded-lg shadow-lg w-[90%] lg:w-full max-w-md text-[#14226A]">
      <div className="mb-6 mt-4">
          <Logo />
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  id="loginsend" className="flex w-full gap-4 flex-col items-center mx-auto">
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-[49%] lg:w-full">
              <FormLabel>Adresse e-mail</FormLabel>
              <FormControl>
                <Input maxLength={50} placeholder="Email" {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={(e) => field.onChange(e.target.value.trim())}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-2 w-[49%] lg:w-full">
              <FormLabel>Mot de pass</FormLabel>
              <FormControl className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <Input minLength={8} type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Mot de passe" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField 
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="mt-2 w-[49%] lg:w-full">
              <Checkbox className="text-center data-[state=checked]:text-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-none" checked={field.value} onCheckedChange={field.onChange}/>
              <FormLabel className="ml-2 mb-3 text-center text-bold">
                     Se souvenir de moi
              </FormLabel>
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
      <div className="mt-4">
        <a href="/login/password" className="text-blue-600">Mot de passe oublié ?</a>
      </div>
      <div className="mt-4 lg:w-full">
        <label className="block mb-2 text-center">Ou connectez-vous avec</label>
        <Button
          type="button"
          className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md"
          onClick={() => window.location.href = '/login/phone'}
          >
          Numéro de téléphone
        </Button>
      </div>
      <div className="mt-6 mb-4 lg:w-full">
        <Button
          type="button"
          className="w-full py-2 border border-blue-600 text-blue-600 bg-white hover:bg-blue-200 rounded-md"
          onClick={() => window.location.href = '/sign-up'}
          >
          Créer un compte
        </Button>
      </div>
      {showPopup && (
        <div className="popup fixed inset-0 flex items-center justify-center">
          <div className="overlay fixed inset-0 bg-black opacity-20"></div>
          <div className="flex flex-col gap-5 items-center popup-content bg-white p-4 rounded shadow-lg transition-opacity duration-300 ease-in-out z-50">
            <p className='p-4'>{errorMessage}</p>
            <Button onClick={() => setShowPopup(false)} className="bg-blue-600 hover:bg-blue-200">Annuler</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginCard;