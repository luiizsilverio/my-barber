"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale";
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

import { Barbershop, Booking, Service } from "@prisma/client"
import { generateDayTimeList } from "../[id]/_helpers/hours";
import saveBooking from "@/app/_actions/save-booking";
import getDayBookings from "@/app/_actions/get-day-bookings";
import { TUser } from "@/app/_lib/auth";

interface Props {
  service: Service;
  barbershop: Barbershop
  isAuthenticated?: boolean;
}

export default function ServiceItem({ service, barbershop, isAuthenticated }: Props) {
  const [date, setDate] = useState<Date | undefined>();
  const [hour, setHour] = useState<String | undefined>();
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  
  const router = useRouter();

  const { data } = useSession();

  const timeList = useMemo(() => {
    if (!date) return [];

    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();
        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });

      return !booking;
    })
  }, [date, dayBookings]);


  function handleBookingClick() {
    if (!isAuthenticated) {
      return signIn("google");
    }

    // TODO abrir modal de agendamento
  }

  async function handleBookingSubmit() {
    if (!hour || !date || !data?.user) return;

    setLoading(true);

    const dtHour = Number(hour.split(":")[0]); // hour: "09:45" -> retorna 9
    const dtMin = Number(hour.split(":")[1]);  // hour: "09:45" -> retorna 45
    const newDate = setMinutes(setHours(date, dtHour), dtMin);

    try {
      await saveBooking({
        serviceId: service.id,
        barbershopId: service.barbershopId,
        userId: (data.user as TUser).id,
        date: newDate,
      })

      setShowCalendar(false);
      setHour(undefined);
      setDate(undefined);

      toast("Reserva realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", { locale: ptBR }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings")
        }
      })
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  function handleDateClick(date: Date | undefined) {
    setDate(date);
    setHour(undefined);
  }

  function handleHourClick(time: string) {
    setHour(time);
  }

  useEffect(() => {
    const refreshAvailableHours = async() => {
      const lstDays = await getDayBookings(barbershop.id, date!);
      setDayBookings(lstDays);
    }

    if (date) refreshAvailableHours();
  }, [date])


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

              <Sheet open={showCalendar} onOpenChange={setShowCalendar}>
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
                    fromDate={addDays(new Date(), 1)}
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
                          <p className="font-bold">{service.name}</p>
                          <h2 className="font-bold text-sm">
                            {
                              Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                              }).format(Number(service.price))
                            }
                          </h2>
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
                        <Button 
                          disabled={loading}
                          onClick={handleBookingSubmit} 
                          className="w-full"
                        >
                          {loading && 
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          }
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