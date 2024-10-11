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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChangePassword from '@/lib/login/changepassword';
import { unsetSession } from '@/lib/login/setsession';
import Image from 'next/image';

const loginSchema = z.object({
    password: z.string().min(8, "Le mot de passe est requis"),
    confirmation_password: z.string().min(8, "Le mot de passe doit contenir au moins 6 caractères")
});


const PasswordChangeCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      confirmation_password: "",
    },
  })
  const	router = useRouter();
  async function onSubmit(values: z.infer<typeof loginSchema>) {
      setIsLoading(true);
      const data = await ChangePassword(values);
      
      if (data?.success == true) {
        await unsetSession();
        router.push('/login');
        // window.location.reload();
      }
      else if (data?.success == false)
        form.setError("password", {
          type: "manual",
          message: data.message
        });
      else
        form.setError("password", {
          type: "manual",
          message: "le serveur rencontre un problème, veuillez réessayer plus tard"
        })
      setIsLoading(false);  
  }

  return (
    <div className="flex flex-col items-center bg-opacity-50 backdrop-blur-md bg-white mb-4 md:p-8 rounded-lg shadow-lg w-[90%] lg:w-full max-w-md text-[#14226A]">
      <div className="mb-6 mt-4">
        <Logo />
      </div>
      <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  id="loginsend" className="flex w-full gap-4 flex-col items-center mx-auto">
        <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-[49%] lg:w-full">
              <FormLabel>Mot de passe <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input minLength={8} type="password" placeholder="Mot de passe" {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField 
          control={form.control}
          name="confirmation_password"
          render={({ field }) => (
            <FormItem className="w-[49%] lg:w-full">
              <FormLabel>Confimer le mot de passe <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input minLength={8} type="password" placeholder="Confirmer le mot de passe" {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <Button type="submit" className="lg:w-full mt-4 py-2 bg-blue-600 text-white rounded-md" disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'Envoyer'}
        </Button>
      </form>
      </Form> 
      {/* <div className="mt-6 mb-4 lg:w-full text-right">
        <a href="/login" className="text-blue-600 underline">Se connecter</a>
      </div>  */}
      </div>    
    </div>
  );
};

export default PasswordChangeCard;