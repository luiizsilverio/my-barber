import { getServerSession } from "next-auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Header from "../_components/header";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarberShopItem from "./_components/barbershop-item";
import { db } from "../_lib/prisma";
import { TUser, authOptions } from "../_lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({
      orderBy: {
        name: 'asc'
      }
    }),
    
    session?.user ? 
      db.booking.findMany({
        where: {
          userId: (session.user as TUser).id,
          date: {
            gte: new Date()
          }
        },
        include: {
          service: true,
          barbershop: true
        },
        orderBy: {
          date: 'asc'
        }
      })
    : Promise.resolve([])
  ])

  const populares = Array.from(barbershops)
    .sort(() => Math.random() - 0.5);

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-lg font-bold">
          {session?.user 
            ? `Olá, ${session?.user?.name?.split(' ')[0]}!` 
            : "Olá, vamos agendar um corte hoje?"
          }
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE', ' dd 'de' MMMM ' de 'yyyy", { locale: ptBR })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">
          Agendamento
        </h2>
        <div className="flex flex-wrap gap-3">
          {
            confirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)
          }
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-sm uppercase text-gray-400 font-bold px-5 mb-3">
          Recomendados
        </h2>

        <div           
          className={`
            flex px-5 py-1 gap-4 overflow-x-auto 
            [&::-webkit-scrollbar]:h-[10px]
            [&::-webkit-scrollbar-track]:bg-card
            [&::-webkit-scrollbar-thumb]:bg-secondary
          `}
        >
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-sm uppercase text-gray-400 font-bold px-5 mb-3">
          Populares
        </h2>

        <div className={`
          flex px-5 py-1 gap-4 overflow-x-auto 
          [&::-webkit-scrollbar]:h-[10px]
          [&::-webkit-scrollbar-track]:bg-card
          [&::-webkit-scrollbar-thumb]:bg-secondary
        `}>
          {populares.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

    </div>
  );
}
