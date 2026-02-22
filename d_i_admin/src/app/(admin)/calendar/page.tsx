"use client";
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { addDays } from 'date-fns'

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const range = { from: date, to: date ? addDays(date, 3) : undefined }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  )
}
