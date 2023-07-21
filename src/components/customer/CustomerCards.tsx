"use client";

import { CustomersFacturAPI } from "@/lib/types/facturapiTypes";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "../ui/use-toast";
import EmptyItems from "../commons/EmptyItems";

const CustomerCards = ({ data }: { data: CustomersFacturAPI[] }) => {
    const router = useRouter()
    const { update } = useSession()
    const [isPending, startTransition] = useTransition()
    const [isDisabledButton, setIsDisabledButton] = useState(false)

  const onDelete = async (id: string) => {
    try {
        setIsDisabledButton(true)
      const response = await axios.delete(`/api/clients`, {
        data: {
          client_id: id,
        },
      });
      toast({ title: "Se ha borrado el cliente." });
      await update();
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      return error;
    } finally {
        setIsDisabledButton(false)
    }
  };
  if (data.length === 0)
  return (
    <EmptyItems
      title="Aun no haz agregado un cliente."
      to="/customer/create"
      buttonText="Agregar cliente"
    />
  );
  return (
    <>
      {data.map((item) => (
        <Card key={item.id}>
          <p>{item.legal_name}</p>
          <p>{item.email}</p>
          <Button variant="destructive" onClick={() => onDelete(item.id)}>  {isDisabledButton && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}Eliminar</Button>
        </Card>
      ))}
    </>
  );
};

export default CustomerCards;
