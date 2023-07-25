import GoBack from "@/components/commons/GoBack";
import InvoiceView from "@/components/invoice/section/InvoiceView";
import { CustomersFacturAPI, InvoicesFacturAPI } from "@/lib/types/facturapiTypes";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

const getData = async (token: string) => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/invoice?token=${token}`, {
      method: "GET",
    });

    const json = await response.json();
    return json.invoices;
  };

const InvoicePage = async () => {
    const session = await getServerSession(authOptions)
    const {data}: {data: InvoicesFacturAPI[]} = await getData(session?.facturapi_token as string)
    return (
        <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited p-[24px]">
            <GoBack />
            <h2 className="font-title text-center mb-[24px]">Facturas</h2>
       <InvoiceView data={data}/>

        </main>
    )
}

export default InvoicePage