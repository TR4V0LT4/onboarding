'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SignUp from '@/lib/signup/signup';
import InputOTPForm from '@/components/signup/verifyphone';
import CGUCard from './cgucard';
import Logo from '../../public/logo.svg';

const signUpSchema = z.object({
  first_name: z.string().min(1, "Le nom est requis"),
  last_name: z.string().min(1, "Le prénom est requis"),
  email: z.string().email("Adresse e-mail invalide").min(4, "L'adresse e-mail est requise"),
  ice: z.string()
  .regex(/^\d+$/, "ICE doit contenir uniquement des chiffres")
  .min(15, "ICE doit contenir 15 chiffres").max(15, "ICE doit contenir 15 chiffres"),
  phone: z.string()
  .regex(/^\d+$/, "Le numéro de téléphone doit contenir uniquement des chiffres")
  .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres"),
  password: z.string().min(8, "Le mot de passe est requis"),
  confirmation_password: z.string().min(8, "Le mot de passe doit contenir au moins 6 caractères"),
  terms: z.boolean().refine(value => value === true, {
    message: "Vous devez accepter les conditions."
  }),
  type: z.string()
}).refine(data => data.password === data.confirmation_password, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});


const SignupCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [IsPhone, setIsPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ice, setIce] = useState('');
  const [CGU, setCGU] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
  
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      ice: "",
      phone: "",
      password: "",
      confirmation_password: "",
      terms: false,
      type: "pha_holder"
    },
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };
  const handleError = (message: string) => {
    setErrorMessage(message);
    setShowPopup(true);
  };

  // const	router = useRouter();
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    //////console.log("iam here0000");
    setIsLoading(true);
    const data = await SignUp(values);
    if (data?.success == true) {
      setIce(values.ice);
      setIsPhone(true);
      setPhoneNumber(values.phone);
    }
    else if (data?.success == false && data?.type && data?.type !== 'ice')
    {
      const type: any = data?.type;
      form.setError(type, {
        type: "manual",
        message: data.message ?? "error dans le serveur"
      });
    }
    else {
      handleError(data?.message ?? "error dans le serveur");
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col flex-wrap items-center bg-opacity-50 backdrop-blur-md bg-white md:p-8 rounded-lg shadow-lg w-[90%] lg:w-full max-w-4xl text-[#14226A]">
      <div className="mb-6">
        <Logo />
      </div>
      { !IsPhone ?
      <div className='mb-6'> 
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="signup" className="flex w-full gap-4 flex-col items-center mx-auto">
       <div className="flex flex-col lg:flex-row justify-center gap-3 flex-wrap max-h-46">
        <FormField 
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="w-full lg:w-[49%] mx-auto">
              <FormLabel>Nom <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Votre nom"   className="w-full border border-gray-300 rounded-md" {...field} onChange={(e) => field.onChange(e.target.value.trim())}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem className="w-full lg:w-[49%] mx-auto">
              <FormLabel>Prénom <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Votre Prénom" {...field}  className="w-full  border border-gray-300 rounded-md" onChange={(e) => field.onChange(e.target.value.trim())}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full lg:w-[49%] mx-auto">
              <FormLabel>E-mail <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} className="w-full  border border-gray-300 rounded-md" onChange={(e) => field.onChange(e.target.value.trim())} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
         <FormField 
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full lg:w-[49%] mx-auto">
              <FormLabel>Votre numéro de téléphone <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input maxLength={10} placeholder="numéro de téléphone" {...field} className="w-full border border-gray-300 rounded-md" onChange={(e) => field.onChange(e.target.value.trim())} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          /> 
        <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full lg:w-[49%] mx-auto">
              <FormLabel>Mot de passe <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="password" className="w-full border border-gray-300 rounded-md" placeholder="Mot de passe" {...field} onChange={(e) => field.onChange(e.target.value.trim())} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="confirmation_password"
          render={({ field }) => (
            <FormItem className="w-full lg:w-[49%] mx-auto">
              <FormLabel>Confimer le mot de passe <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="password" className="w-full border border-gray-300 rounded-md" placeholder="Confimation de mot de passe" {...field} onChange={(e) => field.onChange(e.target.value.trim())} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />  
        </div>
        <FormField 
          control={form.control}
          name="ice"
          render={({ field }) => (
            <FormItem className="w-[75%] mx-auto">
              <FormLabel>ICE de la pharmacie <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input maxLength={15} className="w-full border border-gray-300 rounded-md" placeholder="ICE" {...field}  onChange={(e) => field.onChange(e.target.value.trim())} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="mt-2 w-[49%] lg:w-full">
              <Checkbox className="text-center data-[state=checked]:text-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-none" checked={field.value} onCheckedChange={field.onChange}/>
              <FormLabel className="ml-2 text-bold">
                  Veuillez accepter <a onClick={() => setCGU(true)} className="text-blue-600 underline cursor-pointer">Les conditions générales </a>
                  <span className="text-red-500">*</span>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
          />
        <Button type="submit" className="lg:w-full mt-6 py-2 bg-blue-600 text-white rounded-md mx-auto" disabled={isLoading}>
          {isLoading ? 'Chargement...' : 'Enregistrer'}
        </Button>
      </form>
      </Form>
      <div className="mt-6 w-full text-center">
        <Button
          type="button"
          className="lg:w-full py-2 border border-blue-600 text-blue-600 bg-white hover:bg-blue-200 rounded-md mx-auto text-center"
          onClick={() => window.location.href = '/login'}
          >
          se connecter
        </Button>
      </div>
      </div>
      : <InputOTPForm phoneNumber={phoneNumber} ice={ice} login={false}/> }
      {showPopup && (
        <div className="popup fixed inset-0 flex items-center justify-center">
          <div className="overlay fixed inset-0 bg-black opacity-20"></div>
          <div className="flex flex-col gap-5 items-center popup-content bg-white p-4 rounded shadow-lg transition-opacity duration-300 ease-in-out z-50">
            <p className='p-4'>{errorMessage}</p>
            <Button onClick={() => setShowPopup(false)} className="bg-blue-600 hover:bg-blue-200">Annuler</Button>
          </div>
        </div>
      )}
      {CGU && (
        <div className="mt-10  popup fixed inset-0 items-center justify-center">
        <div className="flex flex-col gap-5 items-center popup-content bg-white p-4 h-3/4 rounded shadow-lg ml-2 mr-2 transition-opacity duration-300 ease-in-out z-50">
          <CGUCard />
          <Button onClick={() => setCGU(false)} className="bg-blue-600 hover:bg-blue-200">Annuler</Button>
        </div>
        </div>  
      )}
      <footer className="opacity-40 mt-10">Blink Pharma Copyright 2024.</footer>
    </div>
  );
};

export default SignupCard;