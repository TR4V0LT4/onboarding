'use client'

import { useState, useEffect } from 'react';
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { LoadScript } from '@react-google-maps/api';
import LocationPicker from "@/components/signup/locationpicker";
import SignUpPharmacy from '@/lib/signup/pharmacysignup';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import getCities from '@/lib/getcities';

const pharmacySchema = z.object({
  ice: z.string().length(15, "ICE doit contenir 15 chiffres").regex(/^\d+$/, "ICE doit contenir uniquement des chiffres"),
  pharmacy_name: z.string().min(1, "Le nom de la pharmacie est requis"),
  fix: z.string().regex(/^05\d{8}$/, "Le numéro de téléphone doit être au format 0548564856"),
  city: z.string().min(1, "La ville est requise"),
  address: z.string().min(1, "L'adresse est requise"),
  formError: z.string().optional(),
});

interface City {
  id: string;
  name: string;
  region_id: number | null;
  sector_id?: number;
}

const PharmacyForm = () => {

  const	router = useRouter();
  const searchParams = useSearchParams();
  const referrer = searchParams?.get('referrer') || "";
  const form = useForm<z.infer<typeof pharmacySchema>>({
    resolver: zodResolver(pharmacySchema),
    defaultValues: {
      ice: referrer,
      pharmacy_name: "",
      fix: "",
      city: "",
      address: "",
      formError: "",
    },
  });
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [citiess, setCitiess] = useState<City[]>([]);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ lat: 31.7917, lng: -7.0926 });
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities = await getCities();
        setCitiess(cities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);
  const handleError = (message: string) => {
    setErrorMessage(message);
    setShowPopup(true);
  };
  const onSubmit: SubmitHandler<z.infer<typeof pharmacySchema>> = async (values) => {
    setIsLoading(true);
    const extendedValues = {
      ...values,
      lat: position.lat,
      lng: position.lng,
    };
    const data = await SignUpPharmacy(extendedValues);
    if (data?.success == true) {
      router.push("/");
    }
    else if (data?.success == false)
      handleError(data.message);
    else { 
      handleError(data?.message);
    }
    setIsLoading(false);
  };
  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);

    try {
      const encodedAddress = encodeURIComponent(newAddress);
      const response = await fetch((
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.NEXT_GOOGLE_MAP_API}`
      ), {method: 'GET'});
      const data = await response.json();
      const location = data.results[0]?.geometry.location;
      if (location) {
        setPosition({ lat: location.lat, lng: location.lng });
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  return (
    <div className="flex flex-col bg-opacity-50 backdrop-blur-md bg-white mb-4 md:p-8 rounded-lg shadow-lg md:w-[90%] text-[#14226A]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 w-full gap-4 items-center mx-auto p-2">
        <input type="hidden" {...form.register("formError")} />
          <FormField
            control={form.control}
            name="ice"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>ICE <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input maxLength={15} placeholder="ICE" {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md"  onChange={(e) => field.onChange(e.target.value.trim())}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pharmacy_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nom de la pharmacie <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Nom de la pharmacie" {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md"  onChange={(e) => field.onChange(e.target.value.trim())}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fix"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Téléphone fix <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input maxLength={10} placeholder="05 XX XX XX XX" {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={(e) => field.onChange(e.target.value.trim())}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ville <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange} >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une ville" />
                    </SelectTrigger>
                    <SelectContent >
                      {citiess.map((city) => (
                        <SelectItem key={city.id} value={city.name} >
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Adresse <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Adresse" {...field} onChange={(e) => {
                  field.onChange(e.target.value.trim());
                  handleAddressChange(e);
                }} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-3"> 
          <LoadScript googleMapsApiKey={`${process.env.NEXT_GOOGLE_MAP_API}`}>
            <LocationPicker newPosition={position} setAddress={setAddress} />
                </LoadScript>
            </div> 
          <Button type="submit" className="w-full col-span-3 mt-6 py-2 bg-blue-600 text-white rounded-md max-w-lg mx-auto" disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'Enregistrer'}
          </Button>
        </form>
      </Form>
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

export default PharmacyForm;