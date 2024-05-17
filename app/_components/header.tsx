import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import SideMenu from "./side-menu";

export default function Header() {
  return ( 
    <Card  className="rounded-none">
      <CardContent className="flex flex-row p-5 justify-between items-center">
        <Image src="/logo.png" alt="logo My-Barber" height={21} width={120} />
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="size-8">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

      </CardContent>
    </Card>
  )
}