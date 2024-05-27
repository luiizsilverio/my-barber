import { getServerSession } from "next-auth";
import BarberShopInfo from "../_components/barbershop-info";
import ServiceItem from "../_components/service-item";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma"

interface Props {
  params: {
    id?: string;
  }
}

export default async function BarberShopDetailsPage({ params }: Props) {
  const session = await getServerSession(authOptions); 

  const barbershop = await db.barbershop.findFirst({
    where: {
      id: params.id
    },
    include: {
      services: true,
    }
  })

  if (!params.id || !barbershop) {
    // TODO redirecionar para home page
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">      
      <BarberShopInfo barbershop={barbershop} />   
    
      <div className="max-w-[1500px]">
        <div className="flex flex-wrap gap-3 justify-center">
          {barbershop.services.map((service) => (
            <ServiceItem 
              key={service.id} 
              service={service} 
              barbershop={barbershop}
              isAuthenticated={!!session?.user}
            />
          ))}
        </div>
      </div>
    </div>
  )
}