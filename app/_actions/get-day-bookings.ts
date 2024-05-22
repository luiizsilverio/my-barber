"use server";

import { endOfDay, startOfDay } from "date-fns";
import { Booking } from "@prisma/client";
import { db } from "@/app/_lib/prisma";

export default async function getDayBookings(barbershopId: string, date: Date): Promise<Booking[]> {
  const bookings = await db.booking.findMany({
    where: {
      barbershopId,
      date: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      }
    }
  })

  return bookings;
}