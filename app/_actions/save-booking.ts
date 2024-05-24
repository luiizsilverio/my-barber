"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

interface SaveBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export default async function saveBooking(params: SaveBookingParams) {
  await db.booking.create({
    data: {
      serviceId: params.serviceId,
      userId: params.userId,
      barbershopId: params.barbershopId,
      date: params.date
    }
  })

  revalidatePath("/");
  revalidatePath("/bookings");
}