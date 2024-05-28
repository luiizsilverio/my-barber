"use client";

import { z } from "zod"
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/app/_components/ui/form";


const formSchema = z.object({
  search: z.string({
    required_error: "Campo obrigatório",
  }).trim().min(2, "Informe ao menos 2 caracteres"),
})

interface Props {
  defaultValues?: z.infer<typeof formSchema>
}

export default function Search({ defaultValues }: Props) {
  const router = useRouter();
  
  const vForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    router.push(`/barbershop?search=${data.search}`);
  }

  return (
    <div className="flex items-center gap-2 max-w-[600px]">
      <Form {...vForm}>
        <form className="flex w-full gap-4" onSubmit={vForm.handleSubmit(handleSubmit)}>

          <FormField
            control={vForm.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Procure uma barbearia..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="default" type="submit">
            <SearchIcon size={20} />
          </Button>
        </form>
      </Form>
    </div>
  )
}