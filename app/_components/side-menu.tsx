"use client"

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { CalendarIcon, CircleUserRound, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function SideMenu() {
  const { data, status } = useSession();

  async function handleLogin() {
    await signIn("google");
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <>
      <SheetHeader className="text-left p-5 border-b border-solid border-secondary">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user && status === "authenticated" 
        ?
          <div className="flex justify-between px-5 py-6 items-center">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={data.user?.image ?? ""} />
              </Avatar>
              <h2 className="font-bold">{data.user.name}</h2>
            </div>

            <Button variant="secondary" size="icon" onClick={handleLogout}>
              <LogOutIcon />
            </Button>
          </div>
        :
          <div className="p-5 flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <CircleUserRound strokeWidth={1} className="size-8 text-gray-600" />
              <h2 className="font-bold text-base text-bold">Olá, faça seu login!</h2>
            </div>

            <Button 
              variant="secondary" 
              className="w-full justify-start gap-3" 
              onClick={handleLogin}
            >
              <LogInIcon size={16} />
              Fazer Login
            </Button>
          </div>
      }

      <div className="flex flex-col px-5 gap-3">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/" className="gap-3">
            <HomeIcon size={16} />
            Inicio
          </Link>
        </Button>

        {data?.user &&
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/bookings" className="gap-3">
              <CalendarIcon size={16} />
              Agendamentos
            </Link>
          </Button>
        }
      </div>
    </>
  )
}