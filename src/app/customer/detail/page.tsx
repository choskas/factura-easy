import CreateNewCustomer from "@/components/create-customer/CreateNewCustomer"
import Head from "next/head"
import { PrismaClient } from '@prisma/client';
import { headers } from "next/headers";
import { CustomersFacturAPI } from "@/lib/types/facturapiTypes";
import GoBack from "@/components/commons/GoBack";
import { Card } from "@/components/ui/card";

interface CustomerDetailProps {
    searchParams: {
    customerId: string
    }
}

const getData = async (id: string): Promise<CustomersFacturAPI> => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/clients/detail/?id=${id}`, {
      method: "GET",
      headers: headers(),
    });
    const json = await response.json();
    return json.customer;
  };

const CustomerDetailPage = async ({ searchParams }: CustomerDetailProps) => {
    const data = await getData(searchParams.customerId)
    return (
        <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited p-[24px]">
           <GoBack />
           <h3 className="font-title text-center">Detalle del cliente</h3>
           <h4 className="font-subtitle text-center">{data.legal_name}</h4>
           <Card className="p-[24px] mt-[24px]">
            <p>Email</p>
            <p className="font-caption mb-[12px]">{data.email}</p>
            <p>Teléfono</p>
            <p className="font-caption mb-[12px]">{data.phone}</p>
            <p>Dirección</p>
            <p className="font-caption mb-[12px]">{data.address.street}, {data.address.exterior} {data.address.interior}, {data.address.neighborhood}, {data.address.municipality}, {data.address.city}. CP: {data.address.zip}</p>
           </Card>
        </main>
    )
}

export default CustomerDetailPage

