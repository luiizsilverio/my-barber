import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  barbershop: Barbershop
}

export default function BarberShopItem({ barbershop }: Props) {

  return (
    <Card className="min-w-[220px] max-w-[220px] rounded-xl">
      <CardContent className="p-1 relative">

        <Badge variant="secondary" className="absolute top-2 left-2 z-50 gap-1 backdrop-blur bg-card/60">
          <StarIcon size={12} className="fill-primary text-primary" />
          <span className="text-xs p-[2px]">5,0</span>
        </Badge>
        
        <Image 
          height={0} width={0} sizes="100vw" 
          className="h-[160px] w-full object-cover rounded-xl" 
          src={barbershop.imageUrl} 
          alt={barbershop.name}
        />

        <div className="px-3 pb-3">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
          <Button variant="secondary" className="w-full mt-3">Reservar</Button>
        </div>
      </CardContent>
    </Card>
  )
}
