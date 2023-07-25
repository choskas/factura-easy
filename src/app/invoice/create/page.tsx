import GoBack from "@/components/commons/GoBack"
import InvoiceAccordionsSteps from "@/components/invoice/create";
import { CustomersFacturAPI, ProductsFacturAPI } from "@/lib/types/facturapiTypes";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";


const getCustomersData = async (token: string) => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/clients?token=${token}`, {
      method: "GET",
    });
    const json = await response.json();
    return json.customers;
  };
  
  const getProductsData = async (token: string) => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/product?token=${token}`, {
      method: "GET",
    });
    const json = await response.json();
    return json.products;
  };

const CreateInvoicePage = async () => {
  const session = await getServerSession(authOptions)
    const {data: customers, total_pages: total_pages_customers}: {data: CustomersFacturAPI[], total_pages: number}  = await getCustomersData(session?.facturapi_token as string)
    const {data: products, total_pages: total_pages_products}: {data: ProductsFacturAPI[], total_pages: number}  = await getProductsData(session?.facturapi_token as string)
    return (
        <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited p-[24px]">
            <GoBack />
            <h3 className="font-title text-center mb-[24px]">
                Facturar
            </h3>
            

            <InvoiceAccordionsSteps customers={customers} products={products} totalPagesCustomers={total_pages_customers} totalPagesProducts={total_pages_products} />
        </main>
    )
}

export default CreateInvoicePage