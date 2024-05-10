import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

export default function BookingItem() {
  return (
    <Card>
      <CardContent className="p-5 flex flex-row justify-between py-0">
        <div className="flex flex-col gap-2 py-5">
          <Badge className="w-fit text-primary bg-[#221C3D] hover:bg-[#221C3D]">
            Confirma
          </Badge>
          
          <h2 className="font-bold">Corte de Cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/luiizsilverio.png" />
              <AvatarFallback>L</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className={`
          flex flex-col items-center justify-center px-3 pr-0
          border-l border-solid border-secondary
        `}>
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  )
}