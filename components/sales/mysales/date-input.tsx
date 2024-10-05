"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { fr } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
interface DatePickerProps {
    selectedDate: Date | undefined;
    onDateChange: (date: Date | undefined) => void;
    label: string;
    className?: string;
    yearfrom?: Date | undefined;
    yearto?: Date | undefined;
  }
  
function DatePicker({ selectedDate, onDateChange, label , className, yearfrom, yearto}: DatePickerProps) {
    const handleSelect = (date: Date | undefined) => {
      onDateChange(date);
    };


  return (
    <div className={cn("h-full grid gap-2", className)}>
<Popover>
  <PopoverTrigger asChild>
    <Button
      id="date"
      variant={"outline"}
      className={cn(
          "w-[180px] h-8  rounded-[8px] border-[1px] p-2 focus-visible:ring-0 focus-visible:ring-offset-0 border-[#AFB4C5] placeholder:text-[#97A1AF] font-normal text-[12px] text-[#344051] pr-2 ",
        !selectedDate && "text-muted-foreground"
      )}
    >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {selectedDate
        ? `${label === "From Date" ? 'De':  'à' } ${format(selectedDate, "PPP", { locale: fr })}` :
        <span>
            {label === "To Date" ? 'Date de fin' : "Date de début"}
        </span>
        }
    </Button>
  </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0" >
        <Calendar
            mode="single"
            // captionLayout="dropdown-buttons" // we need to show how style it
            selected={selectedDate}
            onSelect={handleSelect}
            fromYear={yearfrom?.getFullYear() || 2020}
            toYear={yearto?.getFullYear()|| new Date().getFullYear()}
            locale={fr}
            defaultMonth={selectedDate || new Date()}
        />
      </PopoverContent>
    </Popover>
    </div>
  )
}

export default DatePicker;

