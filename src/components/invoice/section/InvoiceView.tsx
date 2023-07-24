"use client";

import { InvoicesFacturAPI } from "@/lib/types/facturapiTypes";
import { useState, useTransition } from "react";
import axios from "axios";
import { toast } from "../../ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EmptyItems from "@/components/commons/EmptyItems";
import ModalConfirm from "@/components/commons/modal/ModalConfirm";
import InvoiceCard from "@/components/commons/invoice-card";
import facturaApiInstance from "@/services/config/facturaApi";

const InvoiceView = ({ data }: { data: InvoicesFacturAPI[] }) => {
  const router = useRouter();
  const session = useSession();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState<null | string>(null);
  const onDelete = async () => {
    try {
      setIsDisabledButton(true);
      const response = await axios.delete(`/api/product`, {
        data: {
          product_id: productId,
        },
      });

      toast({ title: "Se ha borrado el producto" });
      setIsOpen(false);
      await update();
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      return error;
    } finally {
      setIsDisabledButton(false);
    }
  };

  const onDownload = async (id: string) => {
    try {
      const invoice = await facturaApiInstance.get(`invoices/${id}/${"pdf"}`, {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
          Authorization: `Bearer ${
            session.data ? session.data.facturapi_token : ""
          }`,
        },
      });

      const blob = new Blob([invoice.data], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `factura-${id}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      return error
    }
  };

  if (data.length === 0)
    return (
      <EmptyItems
        title="Aun no haz agregado un producto."
        to="/product/create"
        buttonText="Agregar producto"
      />
    );

  return (
    <>
      {data.map((item) => (
        <InvoiceCard
          key={item.id}
          title={item.customer.legal_name}
          subtitle={`$ ${item.total.toString()}`}
          description={new Date(item.date).toLocaleDateString()}
          buttonText="Descargar factura"
          onClickDetail={() => onDownload(item.id)}
          buttonTextCancel="Cancelar factura"
          onClickCancel={() => {}}
        />
      ))}
      <ModalConfirm
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onContinue={onDelete}
        title="¿Desea borrar el producto?"
        disableButton={isDisabledButton}
      />
    </>
  );
};

export default InvoiceView;
