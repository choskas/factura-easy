import GoBack from "@/components/commons/GoBack"
import InvoiceAccordionsSteps from "@/components/invoice/create";
import { CustomersFacturAPI, ProductsFacturAPI } from "@/lib/types/facturapiTypes";
import { headers } from "next/headers";


const getCustomersData = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/clients`, {
      method: "GET",
      headers: headers(),
    });
    const json = await response.json();
    return json.customers;
  };
  
  const getProductsData = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/product`, {
      method: "GET",
      headers: headers(),
    });
    const json = await response.json();
    return json.products;
  };

const CreateInvoicePage = async () => {
    const {data: customers, total_pages: total_pages_customers}: {data: CustomersFacturAPI[], total_pages: number}  = await getCustomersData()
    const {data: products, total_pages: total_pages_products}: {data: ProductsFacturAPI[], total_pages: number}  = await getProductsData()
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