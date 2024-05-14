"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  return ( 
    <Card>
      <CardContent className="flex flex-row p-5 justify-between items-center">
        <Image src="/logo.png" alt="logo My-Barber" height={21} width={120} />
        <Button variant="outline" size="icon" className="size-8">
          <MenuIcon />
        </Button>

        {data?.user ?
          <div>
            <Button onClick={() => signOut()}>Logout</Button>
          </div>
        :
          <Button onClick={handleLogin}>Login</Button>
        }
      </CardContent>
    </Card>
  )
}