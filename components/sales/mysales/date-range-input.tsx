"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { useRouter } from "next/navigation"
import DatePicker from "./date-input"

type Params = {
    page: number;
    per_page: number;
    search: string;
    from: string;
    to: string;
  };

function DateRangeInput({ searchparams, path }: {searchparams: Params, path: string}) {
    const [fromDate, setFromDate] = React.useState<Date | undefined>(searchparams?.from ? new Date(searchparams.from) : undefined);
    const [toDate, setToDate] = React.useState<Date | undefined>(searchparams?.to ? new Date(searchparams.to) : undefined);
    const router = useRouter()


    const updateSearchParams = (date: DateRange | undefined) => {
      const params = new URLSearchParams(window.location.search)
      if (date?.from) {
        params.set("from", addDays(date.from, 1).toISOString())
        params.set("page", "1")
      } else {
        params.delete("from")
      }
      if (date?.to) {
        params.set("to", addDays(date.to, 1).toISOString())
        params.set("page", "1")
      } else {
        params.delete("to")
      }
          // Construct the URL with the updated search parameters
          const newUrl = `${path}?${params.toString()}`;
          router.push(newUrl);
    }
  
    React.useEffect(() => {
      updateSearchParams({ from: fromDate, to: toDate });
    }, [fromDate, toDate]);
  
    return (
      <div className="flex justify-center items-center gap-1">
        <DatePicker
          selectedDate={fromDate}
          onDateChange={setFromDate}
          label="From Date"
        //   yearfrom={params?.from ? new Date(params.from).getFullYear() : 1960}
          yearto={searchparams?.to ? new Date(searchparams.to) : undefined}
        />
        -
        <DatePicker
          selectedDate={toDate}
          onDateChange={setToDate}
          label="To Date"
          yearfrom={searchparams?.from ? new Date(searchparams.from) : undefined}
        />
      </div>
    );
  };
  
export default DateRangeInput;