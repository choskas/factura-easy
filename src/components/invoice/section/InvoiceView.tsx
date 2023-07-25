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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { title } from "process";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CANCEL_MOTIVES } from "@/lib/constants/catalogs";
import { downloadFromUTF8 } from "@/lib/utils";

const InvoiceView = ({ data }: { data: InvoicesFacturAPI[] }) => {
  const router = useRouter();
  const session = useSession();
  const { update } = useSession();
  const form = useForm();
  const [isPending, startTransition] = useTransition();
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState<null | string>(null);
  const [motive, setMotive] = useState<null | string>(null);
  const onCancel = async () => {
    try {
      setIsDisabledButton(true);
      if (!motive) return toast({ title: "Debes seleccionar un motivo." });
      const response = await axios.delete(`/api/invoice/cancel`, {
        params: {
          invoice_id: productId,
          motive,
        },
      });

      toast({ title: response.data.message });
      setIsOpen(false);
      setMotive(null);
      setProductId(null);
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

  const onDownload = async (id: string, status: string) => {
    try {
      let type = 'application/xml';
      if (status !== "canceled") {
        type = 'application/pdf';
        const invoice = await facturaApiInstance.get(
          `invoices/${id}/${"pdf"}`,
          {
            responseType: "blob",
            headers: {
              Accept: type,
              Authorization: `Bearer ${
                session.data ? session.data.facturapi_token : ""
              }`,
            },
          }
        );
        downloadFromUTF8(invoice.data, `factura-${id}.pdf`, type);
        return;
      }
      const report = await facturaApiInstance.get(
        `invoices/${id}/cancellation_receipt/xml`,
        {
          responseType: "blob",
          headers: {
            Accept: type,
            Authorization: `Bearer ${
              session.data ? session.data.facturapi_token : ""
            }`,
          },
        }
      );
      downloadFromUTF8(report.data, `acuse-${id}.xml`, type);
      return;
    } catch (error) {
      return error;
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
          buttonText={
            item.status === "canceled" ? "Descargar acuse" : "Descargar factura"
          }
          onClickDetail={() => onDownload(item.id, item.status)}
          buttonTextCancel="Cancelar factura"
          onClickCancel={
            item.status === "canceled"
              ? null
              : () => {
                  setIsOpen(true);
                  setProductId(item.id);
                }
          }
        />
      ))}
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <p className="text-left">Motivo de cancelación</p>
            <Select
              onValueChange={(value) => {
                setMotive(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CANCEL_MOTIVES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsOpen(false)}
              className="mt-[12px]"
            >
              Regresar
            </AlertDialogCancel>
            <AlertDialogAction onClick={onCancel}>
              {isDisabledButton && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default InvoiceView;
