import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Vector14 from "@/public/Vector14.svg";

function SearchInput({table, params, path}: {table: any, params: any, path: string}) {
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();
    useEffect(() => {
        // Log the table object to verify it's being passed correctly
        //console.log("Table object:", table);
        setSearchValue(params?.search ?? "");
      }, [table, params?.search]);

    return (
    <div className="relative ">
    <Input
      type="text"
      placeholder="Recherche..."
      className="w-full h-8 rounded-[8px] border-[1px] p-2 focus-visible:ring-0 focus-visible:ring-offset-0 border-[#AFB4C5] placeholder:text-[#97A1AF] font-normal text-[12px] text-[#344051] pr-2"
    //   className="w-full h-full pl-2 pr-8 text-sm focus:border-0 focus:outline-none" 
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value);

            router.push(`${path}?page=1&per_page=${params?.per_page}&search=${event.target.value}&from=${params?.from}&to=${params?.to}&orderBy=${params?.orderBy}&order=${params?.order}`);
        }}
    />
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <path d="M10.1 10.1L14 14M11.4 6.2C11.4 9.07188 9.07188 11.4 6.2 11.4C3.32812 11.4 1 9.07188 1 6.2C1 3.32812 3.32812 1 6.2 1C9.07188 1 11.4 3.32812 11.4 6.2Z" stroke="#97A1AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
  </div>
  )
}

export default SearchInput;