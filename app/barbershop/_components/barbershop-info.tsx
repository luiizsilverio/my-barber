"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet"
import SideMenu from "@/app/_components/side-menu"
import { Barbershop } from "@prisma/client"

interface Props {
  barbershop: Barbershop
}

export default function BarberShopInfo({ barbershop }: Props) {
  const router = useRouter();

  function handleBackClick() {
    router.replace("/");
  }
  
  return (
    <div className="flex flex-col w-full max-w-[900px]">
      <div className="w-full h-[420px] relative ">
        <Button 
          size="icon" 
          variant="outline" 
          className="z-50 absolute top-5 left-5"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="z-50 absolute top-5 right-5">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet> 

        <Image
          className="opacity-75 object-cover"
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          priority
          // quality={50}
        />
      </div>

      <div className="px-5 pt-3 pb-5 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1 my-2">
          <MapPinIcon size={22} strokeWidth={1}  className="fill-primary text-background" />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-1 my-2">
          <StarIcon size={22} strokeWidth={1}  className="fill-primary text-background" />
          <p className="text-sm">5,0 (899 avaliações)</p>
        </div>
      </div>
    </div>
  )
}