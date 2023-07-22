import GoBack from "@/components/commons/GoBack";
import { ProductsWithQuantity } from "@/components/invoice/create";
import InvoiceResume from "@/components/invoice/create/resume";
import { Button } from "@/components/ui/button";
import { CustomersFacturAPI } from "@/lib/types/facturapiTypes";
import facturaApiInstance from "@/services/config/facturaApi";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface ResumeInvoicePageProps {
  searchParams: {
    customer: string
    products: string
    paymentMethod: string;
    CFDIUse: string;
  };
}

const ResumeInvoicePage = ({ searchParams }: ResumeInvoicePageProps) => {


  return (
    <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited p-[24px]">
      <GoBack />
      <InvoiceResume customer={JSON.parse(searchParams.customer)} products={JSON.parse(searchParams.products)} paymentMethod={searchParams.paymentMethod} CFDIUse={searchParams.CFDIUse} />
    </main>
  );
};

export default ResumeInvoicePage;
