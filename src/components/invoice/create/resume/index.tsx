"use client"
import { Button } from "@/components/ui/button"
import { CustomersFacturAPI } from "@/lib/types/facturapiTypes";
import axios from "axios";
import { ProductsWithQuantity } from "..";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

interface InvoiceResumeProps {
    customer: CustomersFacturAPI;
    products: ProductsWithQuantity[];
    paymentMethod: string;
    CFDIUse: string;
}

const InvoiceResume = ({customer, products, paymentMethod, CFDIUse}: InvoiceResumeProps) => {
    const { update } = useSession()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const onSaveInvoice = async () => {
        const response = await axios.post("/api/invoice/create", {
          payment_form: paymentMethod,
          use: CFDIUse,
          customer: customer,
          items: products,
        });
        await update()
        startTransition(() => {
            router.refresh()
        })
        toast({title: 'Tu factura ha sido creada.'})
        router.push('/dashboard')
      };
    return (
        <Button className="w-full" onClick={onSaveInvoice}>Confirmar</Button>
    )
}

export default InvoiceResume