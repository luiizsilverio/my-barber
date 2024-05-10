import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Header from "../_components/header";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-lg font-bold">Olá, Luiz!</h2>
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
        <BookingItem />
      </div>

      <div className="mt-6">
        <h2 className="text-sm uppercase text-gray-400 font-bold px-5 mb-3">
          Recomendados
        </h2>

        <div className={`
          flex gap-4 overflow-x-auto 
          [&::-webkit-scrollbar]:hidden
        `}>
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

      </div>
    </div>
  );
}
