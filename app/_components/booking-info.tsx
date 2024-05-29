import { Barbershop, Service } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingInfoProps {
  booking: {
    date?: Date;
    hour?: String;
    service: Pick<Service, 'name' | 'price'>
    barbershop: Pick<Barbershop, 'name'>
  }
}

export default function BookingInfo({ booking }: BookingInfoProps) {
  return (
    <Card>
      <CardContent className="p-3 flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="font-bold">{booking.service.name}</p>
          <h2 className="font-bold text-sm">
            {
              Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(Number(booking.service.price))
            }
          </h2>
        </div>

        {booking.date && 
          <div className="flex justify-between">
            <p className="text-sm text-[#838896]">Data</p>
            <p className="text-sm">
              {formatDate(booking.date, "dd 'de' MMMM",  {locale: ptBR})}
            </p>
          </div>
        }

        {booking.hour &&
          <div className="flex justify-between">
            <p className="text-sm text-[#838896]">Horário</p>
            <p className="text-sm">
              {booking.hour}
            </p>
          </div>
        }
        
        <div className="flex justify-between">
          <p className="text-sm text-[#838896]">Barbearia</p>
          <p className="text-sm">{booking.barbershop.name}</p>
        </div>
        
      </CardContent>
    </Card>
  )
}