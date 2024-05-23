import { Booking, Prisma } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format } from "date-fns/format"
import { ptBR } from "date-fns/locale"
import { isPast } from "date-fns"

interface Props {
  // booking: Booking;
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true,
      barbershop: true,
    }
  }>
}

export default function BookingItem({ booking }: Props) {
  const isBookingFinished = isPast(booking.date);

  return (
    <Card className="flex min-w-[350px]">
      <CardContent className="w-full flex flex-row p-0 ">
        <div className="flex flex-col flex-[3] gap-2 py-5 pl-5">
          <Badge 
            className="w-fit"
            variant={
              isBookingFinished ? "secondary" : "default"
            }
          >
            {isBookingFinished ? "Finalizado" : "Confirmado"}
          </Badge>
          
          <h2 className="font-bold">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={booking.barbershop.imageUrl} />
              <AvatarFallback>L</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>

        <div className={`
          flex flex-col items-center justify-center flex-1
          border-l border-solid border-secondary
        `}>
          <p className="text-sm capitalize">{format(booking.date, "MMMM", { locale: ptBR })}</p>
          <p className="text-2xl">{format(booking.date, "dd")}</p>
          <p className="text-sm">{format(booking.date, "hh:mm")}</p>
        </div>
      </CardContent>
    </Card>
  )
}