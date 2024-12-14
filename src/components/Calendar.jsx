"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export function CalendarD() {
  const [date, setDate] = useState(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={(selectedDate) => setDate(selectedDate || null)} 
      className="rounded-md border bg-white"
    />
  );
}
