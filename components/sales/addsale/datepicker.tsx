"use client"

import * as React from "react"
import { fr } from "date-fns/locale"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo({ date, setDate, disableFutureDates }: { date: Date | null, setDate: (date: Date) => void, disableFutureDates?: boolean }) {
  const defaultDate = date || new Date(); // Set default date to today if date is null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "col-span-3 2xl:col-span-2 w-full h-10 text-[#97A1AF] flex justify-start text-left font-normal border border-[#AFB4C5] rounded-lg",
            !date && "text-muted-foreground"
          )}
        >
            <CalendarIcon className="mr-2 w-6 stroke-[#97A1AF]" />
            {defaultDate ? format(defaultDate, "PPP", {locale: fr}) : <span>Pick a date</span>}
            <ChevronDown className="ml-auto stroke-[#97A1AF]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          defaultMonth={defaultDate}
          selected={defaultDate}
          onSelect={(day: Date | undefined) => setDate(day || new Date())}
          initialFocus
          disableFutureDates={disableFutureDates}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePickerDemo