import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { TUser, authOptions } from "../api/auth/[...nextauth]/route";
import Header from "@/app/_components/header";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { isFuture, isPast } from "date-fns";

export default async function BookingsPage() {
  // recuperar a sessão do usuário (ver se ele está logado)
  const session = await getServerSession(authOptions);

  // se ele não estiver logado, redirecionar para a página inicial
  if (!session?.user) {
    return redirect("/");
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as TUser).id
    },
    include: {
      service: true,
      barbershop: true,
    },
    orderBy: {
      date: 'asc'
    }
  })

  const confirmedBookings = bookings
    .filter(booking => !isPast(booking.date))
    // .sort((d1, d2) => d1.date.getTime() - d2.date.getTime());

  const finishedBookings = bookings
    .filter(booking => isPast(booking.date))
    // .sort((d1, d2) => d1.date.getTime() - d2.date.getTime());

  return (
    <>
      <Header />

      <div className="w-full flex flex-col gap-3 items-center">      
        <div className="px-5 pt-8">
          <h1 className="text-xl font-bold">Agendamentos</h1>

          <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
            Confirmados
          </h2>

          <div className="flex flex-wrap gap-3">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>

          <h2 className="text-gray-400 uppercase font-bold text-sm mt-8 mb-3">
            Finalizados
          </h2>

          <div className="flex flex-wrap gap-3">
            {finishedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>

        </div>  
      </div>    
    </>
  )
}