"use client";

import { CustomersFacturAPI } from "@/lib/types/facturapiTypes";
import axios from "axios";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "../ui/use-toast";
import EmptyItems from "../commons/EmptyItems";
import CustomerCard from "../commons/client-card";
import ModalConfirm from "../commons/modal/ModalConfirm";


const CustomerCards = ({ data }: { data: CustomersFacturAPI[] }) => {
    const router = useRouter()
    const { update } = useSession()
    const [isPending, startTransition] = useTransition()
    const [isDisabledButton, setIsDisabledButton] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [customerId, setCustomerId] = useState<null | string>(null)
  const onDelete = async () => {
    try {
        setIsDisabledButton(true)
      const response = await axios.delete(`/api/clients`, {
        data: {
          client_id: customerId,
        },
      });
      toast({ title: "Se ha borrado el cliente." });
      await update();
      setIsOpen(false)
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
        <CustomerCard 
        key={item.id}
        title={item.legal_name}
        subtitle={item.tax_id}
        description={item.email}
        onDelete={() =>{ setIsOpen(true)
        setCustomerId(item.id)
        }}
        buttonText="Ver cliente"
        onClick={() => {
          router.push(`/customer/detail?customerId=${item.id}`)
        }}
        />
      ))}
      <ModalConfirm isOpen={isOpen} onCancel={() => setIsOpen(false)} onContinue={onDelete} title="¿Desea borrar el cliente?" disableButton={isDisabledButton} />
    </>
  );
};

export default CustomerCards;
