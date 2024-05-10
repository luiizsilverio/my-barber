import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export default function Header() {
  return ( 
    <Card>
      <CardContent className="flex flex-row p-5 justify-between items-center">
        <Image src="/logo.png" alt="logo My-Barber" height={22} width={120} />
        <Button variant="outline" size="icon" className="size-8">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}