import GoBack from "@/components/commons/GoBack";
import CustomerCards from "@/components/customer/CustomerCards";
import { Card } from "@/components/ui/card";
import { CustomersFacturAPI } from "@/lib/types/facturapiTypes";
import { headers } from "next/headers";

const getData = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/clients`, {
      method: "GET",
      headers: headers(),
    });
    const json = await response.json();
    return json.customers;
  };

const CustomerPage = async () => {
    const {data}: {data: CustomersFacturAPI[]} = await getData()
    
    return (
        <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited p-[24px]">
            <GoBack />
       <CustomerCards data={data} />

        </main>
    )
}

export default CustomerPage