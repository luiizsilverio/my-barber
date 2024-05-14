import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Service } from "@prisma/client"
import Image from "next/image"

interface Props {
  service: Service
}

export default function ServiceItem({ service }: Props) {
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
              <Button variant="secondary" className="max-h-9">Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}