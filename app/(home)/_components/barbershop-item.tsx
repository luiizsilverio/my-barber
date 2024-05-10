import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import Image from "next/image";

interface Props {
  barbershop: Barbershop
}

export default function BarberShopItem({ barbershop }: Props) {

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-xl">
      <CardContent className="p-1">
        <Image 
          height={0} width={0} sizes="100vw" 
          className="h-[160px] w-full object-cover rounded-xl" 
          src={barbershop.imageUrl} 
          alt={barbershop.name}
        />
        <h2 className="font-bold overflow-hidden text-ellipsis text-nowrap">
          {barbershop.name}
        </h2>
        <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
          {barbershop.address}
        </p>
        <Button variant="secondary" className="w-full mt-3">Reservar</Button>
      </CardContent>
    </Card>
  )
}
