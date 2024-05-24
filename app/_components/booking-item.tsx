"use client"

import { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { isPast } from "date-fns"
import { format } from "date-fns/format"
import { ptBR } from "date-fns/locale"
import { Loader2 } from "lucide-react"
import { Prisma } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import cancelBooking from "../_actions/cancel-booking"

import { 
  AlertDialog, 
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "./ui/alert-dialog"

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
  const [isLoading, setIsLoading] = useState(false);
  const isBookingFinished = isPast(booking.date);

  async function handleCancelBooking() {
    setIsLoading(true);
    try {
      await cancelBooking(booking.id);

      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="flex min-w-[350px]">
          <CardContent className="w-full flex flex-row p-0 ">
            <div className="flex flex-col flex-[3] gap-2 py-5 pl-5">
              <Badge 
                className="w-fit"
                variant={isBookingFinished ? "secondary" : "default"}
              >
                {isBookingFinished ? "Finalizado" : "Confirmado"}
              </Badge>
              
              <h2 className="font-bold">{booking.service.name}</h2>

              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>

                <p className="text-sm text-gray-400">{booking.barbershop.name}</p>
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
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="px-5 pb-5 border-b border-solid border-secondary">
          Informações da Reserva
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image 
              fill 
              src="/barbershop-map.png" 
              alt={booking.barbershop.name} 
            />

            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card> 
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <p className="text-xs text-gray-400 overflow-hidden text-nowrap text-ellipsis">
                      {booking.barbershop.address}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge 
            className="w-fit my-3"
            variant={isBookingFinished ? "secondary" : "default"}
          >
            {isBookingFinished ? "Finalizado" : "Confirmado"}
          </Badge>

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

              <div className="flex justify-between">
                <p className="text-sm text-[#838896]">Data</p>
                <p className="text-sm">
                  {format(booking.date, "dd 'de' MMMM",  {locale: ptBR})}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-sm text-[#838896]">Horário</p>
                <p className="text-sm">
                  {format(booking.date, "hh:mm")}
                </p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-[#838896]">Barbearia</p>
                <p className="text-sm">{booking.barbershop.name}</p>
              </div>
              
            </CardContent>
          </Card>

          <SheetFooter className="flex-row gap-3 mt-6">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full ">Voltar</Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  disabled={isBookingFinished || isLoading}
                  className="w-full "
                >
                  {isLoading && 
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  }
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Deseja mesmo cancelar essa reserva?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Uma vez cancelada, não será possível reverter essa ação.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex-row gap-3">

                  <AlertDialogCancel className="w-full mt-0">Voltar</AlertDialogCancel>

                  <AlertDialogAction 
                    className="w-full" 
                    disabled={isLoading}
                    onClick={handleCancelBooking}
                  >
                    {isLoading && 
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    }
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>            
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}