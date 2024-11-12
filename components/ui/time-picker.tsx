// components/ui/time-picker.tsx
"use client";

import * as React from "react";
import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
  selected: Date;
  onChange: (date: Date) => void;
  className?: string;
}

export function TimePicker({ selected, onChange, className }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleHourChange = (hour: string) => {
    const newDate = new Date(selected);
    newDate.setHours(parseInt(hour));
    onChange(newDate);
  };

  const handleMinuteChange = (minute: string) => {
    const newDate = new Date(selected);
    newDate.setMinutes(parseInt(minute));
    onChange(newDate);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Clock className="h-4 w-4 text-muted-foreground" />
      <Select
        value={selected.getHours().toString()}
        onValueChange={handleHourChange}
      >
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((hour) => (
            <SelectItem key={hour} value={hour.toString()}>
              {hour.toString().padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span>:</span>
      <Select
        value={selected.getMinutes().toString()}
        onValueChange={handleMinuteChange}
      >
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="Minute" />
        </SelectTrigger>
        <SelectContent>
          {minutes.map((minute) => (
            <SelectItem key={minute} value={minute.toString()}>
              {minute.toString().padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
