"use client";
import { MoonIcon, PlusCircle, SunIcon } from "lucide-react";

import {
  CounterClockwiseClockIcon,
  OpenInNewWindowIcon,
} from "@radix-ui/react-icons";
import CustomCard from "@/components/dashboard/custom-card/CustomCard";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { postNewInvoice } from "@/services/invoice";
import { Button } from "@/components/ui/button";

type CustomerAddress = {
  street: string;
  exterior: string;
  interior: string;
  neighborhood: string;
  city: string;
  municipality: string;
  zip: string;
  state: string;
  country: string;
};

type Customer = {
  legal_name: string;
  tax_id: string;
  tax_system: string;
  email: string;
  phone: string;
  address: CustomerAddress;
};

export default function Home() {
 const session = useSession()
  return (
    <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited p-[24px]">
      <h2 className="font-title text-center mb-[24px]">Inicio</h2>
      <CustomCard
        title="Facturas"
        description={
          <span>
            Visualiza cuantas facturas puedes seguir generando con
            <span className="font-bold-description">Factureasy</span>.
          </span>
        }
        number={session.data?.available_folios as number}
        numberDescription="Disponibles"
        linkIcon={
          <CounterClockwiseClockIcon color="#077DBF" className="mr-[8px]" />
        }
        linkDescription="Ver historial de facturas"
        onClickButton={() => {}}
        iconButton={<PlusCircle className="mr-[8px]" size={24} />}
        buttonText="Nueva factura"
        buttonTo="/invoice/create"
        linkTo="/invoice"
        disabledButton={session.data?.available_folios === 0 ? true : false}
      />

      <section className="my-[24px]">
        <CustomCard
          title="Clientes"
          description="Consulta cuántos clientes has dado de alta en tu plataforma"
          number={session.data?._count.customers as number}
          numberDescription="Clientes"
          linkIcon={
            <OpenInNewWindowIcon color="#077DBF" className="mr-[8px]" />
          }
          linkDescription="Ver mis clientes"
          onClickButton={() => {}}
          iconButton={<PlusCircle className="mr-[8px]" size={24} />}
          buttonText="Agregar cliente"
          buttonVariant="outline"
          buttonTo="/customer/create"
          linkTo="/customer"
        />
      </section>

      <section>
        <CustomCard
          title="Productos y servicios"
          description="Consulta y crea servicios y/o productos que ofrece tu negocio"
          number={session.data?._count.products as number}
          numberDescription="Productos cargados"
          linkIcon={
            <OpenInNewWindowIcon color="#077DBF" className="mr-[8px]" />
          }
          linkDescription="Ver mis productos"
          onClickButton={() =>{}}
          iconButton={<PlusCircle className="mr-[8px]" size={24} />}
          buttonText="Agregar producto"
          buttonVariant="outline"
          buttonTo="/product/create"
          linkTo="/product"
        />
      </section>
      {/* <section className="flex flex-col items-center mt-[100px]">
        <Button onClick={postNewProduct}> Agregar producto </Button>
        <Button onClick={postNewCustomer}>Agregar cliente</Button>
        <Button onClick={postNewInvoice}>Post invoice</Button>
        <Button onClick={getAllInvoice}>Get all invoice</Button>
        <Button onClick={getAllCustomers}>Get all customers</Button>
      </section> */}
    </main>
  );
}
