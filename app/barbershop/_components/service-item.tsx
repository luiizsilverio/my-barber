"use client"

import { useMemo, useState } from "react";
import Image from "next/image"
import { format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Calendar } from "@/app/_components/ui/calendar"
import { 
  Sheet, 
  SheetContent, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/app/_components/ui/sheet";

import { Barbershop, Service } from "@prisma/client"
import { generateDayTimeList } from "../[id]/_helpers/hours";
import { TUser } from "@/app/api/auth/[...nextauth]/route";
import SaveBooking from "@/app/_actions/save-booking";

interface Props {
  service: Service;
  barbershop: Barbershop
  isAuthenticated?: boolean;
}

export default function ServiceItem({ service, barbershop, isAuthenticated }: Props) {
  const [date, setDate] = useState<Date | undefined>();
  const [hour, setHour] = useState<String | undefined>();
  
  const { data } = useSession();

  const timeList = useMemo(() => date ? generateDayTimeList(date) : [], [date]);

  function handleBookingClick() {
    if (!isAuthenticated) {
      return signIn("google");
    }

    // TODO abrir modal de agendamento
  }

  async function handleBookingSubmit() {
    if (!hour || !date || !data?.user) return;

    const dtHour = Number(hour.split(":")[0]); // hour: "09:45" -> retorna 9
    const dtMin = Number(hour.split(":")[1]);  // hour: "09:45" -> retorna 45
    const newDate = setMinutes(setHours(date, dtHour), dtMin);

    try {
      await SaveBooking({
        serviceId: service.id,
        barbershopId: service.barbershopId,
        userId: (data.user as TUser).id,
        date: newDate,
      })
    }
    catch (error) {
      console.error(error);
    }
  }

  function handleDateClick(date: Date | undefined) {
    setDate(date);
    setHour(undefined);
  }

  function handleHourClick(time: string) {
    setHour(time);
  }

  return (
    <Card className="w-[370px]">
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Image
              src={service.imageUrl}
              alt={service.name}
              className={`
                object-cover rounded-md min-h-[110px] 
                max-h-[110px] min-w-[110px] max-w-[110px]
              `}
              height={110}
              width={110}
            />
          </div>
          
          <div className="flex flex-col">
            <h2 className="font-bold text-sm">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(Number(service.price))}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="secondary" 
                    className="max-h-9" 
                    onClick={handleBookingClick}
                    >
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left p-5 border-b border-solid border-secondary">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateClick}
                    fromDate={new Date()}
                    locale={ptBR}
                    className="w-full flex justify-center my-3"
                    styles={{
                      caption: {
                        textTransform: "capitalize"
                      }
                    }}
                  />

                  {/* Mostrar lista de horários apenas se alguma data estiver selecionada */}
                  
                  {date && (
                    <div 
                      className={`
                        flex gap-3 p-4 border-y border-solid border-secondary overflow-x-auto
                        [&::-webkit-scrollbar]:h-[10px]
                        [&::-webkit-scrollbar-track]:bg-card
                        [&::-webkit-scrollbar-thumb]:bg-secondary
                      `}
                    >
                      {timeList.map((time) => (
                        <Button key={time} 
                          variant={hour === time ? "default" : "outline"} 
                          onClick={() => handleHourClick(time)}
                          className="rounded-full h-8"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-5 px-5 border-t border-solid border-secondary">
                    <Card>
                      <CardContent className="p-3 flex flex-col gap-1">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="font-bold text-sm">
                            {
                              Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                              }).format(Number(service.price))
                            }
                          </h3>
                        </div>

                        {date && 
                          <div className="flex justify-between">
                            <p className="text-sm text-[#838896]">Data</p>
                            <p className="text-sm">
                              {format(date, "dd 'de' MMMM",  {locale: ptBR})}
                            </p>
                          </div>
                        }

                        {hour &&
                          <div className="flex justify-between">
                            <p className="text-sm text-[#838896]">Horário</p>
                            <p className="text-sm">{hour}</p>
                          </div>
                        }
                        
                        <div className="flex justify-between">
                          <p className="text-sm text-[#838896]">Barbearia</p>
                          <p className="text-sm">{barbershop.name}</p>
                        </div>
                        
                      </CardContent>
                    </Card>
                    
                    {!!date && !!hour &&
                      <SheetFooter className="mt-4">
                        <Button onClick={handleBookingSubmit} className="w-full">
                          Confirmar
                        </Button>
                      </SheetFooter>
                    }

                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}