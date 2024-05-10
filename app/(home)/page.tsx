import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Header from "../_components/header";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";

export default function Home() {
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
    </div>
  );
}