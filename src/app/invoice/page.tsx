import GoBack from "@/components/commons/GoBack";
import InvoiceView from "@/components/invoice/section/InvoiceView";
import { CustomersFacturAPI, InvoicesFacturAPI } from "@/lib/types/facturapiTypes";
import { headers } from "next/headers";

const getData = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/invoice`, {
      method: "GET",
      // @ts-ignore
      headers: headers(),
    });

    const json = await response.json();
    return json.invoices;
  };

const InvoicePage = async () => {
    const {data}: {data: InvoicesFacturAPI[]} = await getData()

    return (
        <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited p-[24px]">
            <GoBack />
            <h2 className="font-title text-center mb-[24px]">Facturas</h2>
       <InvoiceView data={data}/>

        </main>
    )
}

export default InvoicePage