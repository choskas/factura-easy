import GoBack from "@/components/commons/GoBack";
import CustomerCards from "@/components/customer/CustomerCards";
import { Card } from "@/components/ui/card";
import { CustomersFacturAPI } from "@/lib/types/facturapiTypes";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

const getData = async (token: string) => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/clients?token=${token}`, {
      method: "GET",
    });
    const json = await response.json();
    return json.customers;
  };

const CustomerPage = async () => {
  const session = await getServerSession(authOptions)
    const {data}: {data: CustomersFacturAPI[]} = await getData(session?.facturapi_token as string)
    
    return (
        <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited p-[24px]">
            <GoBack />
            <h2 className="font-title text-center mb-[24px]">Clientes</h2>
       <CustomerCards data={data} />

        </main>
    )
}

export default CustomerPage