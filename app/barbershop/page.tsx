import { redirect } from "next/navigation";
import BarberShopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import Search from "../(home)/_components/search";

interface Props {
  searchParams: {
    search?: string;
  }
}

export default async function BarbershopPage({ searchParams }: Props) {

  if (!searchParams.search) {
    return redirect("/");
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive'
      }
    }
  })

  return (
    <>
      <Header />

      <div className="px-5 py-6 flex flex-col gap-6">
        <Search defaultValues={{
          search: searchParams.search
        }} />

        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>
      </div>

      <div className="px-5 max-w-[1500px]">
        <div className="flex flex-wrap gap-3 justify-center">
          {barbershops.map(barbershop => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  )
}
