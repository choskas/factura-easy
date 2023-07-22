import GoBack from "@/components/commons/GoBack";
import { ProductsWithQuantity } from "@/components/invoice/create";
import InvoiceResume from "@/components/invoice/create/resume";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  const customer: CustomersFacturAPI = JSON.parse(searchParams.customer)
  const products: ProductsWithQuantity[] = JSON.parse(searchParams.products)
  const paymentMethod = searchParams.paymentMethod
  const CFDIUse = searchParams.CFDIUse

  return (
    <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited p-[24px]">
      <GoBack />
      <h3 className="font-title text-center mb-[24px]">Resumen</h3>
      <Card className="p-[24px] mb-[24px]">
        <p className="font-subtitle">Cliente</p>
        <div className="my-[24px]">
          <p className="font-description text-gray-400">{customer.tax_id}</p>
          <p className="font-description">{customer.legal_name}</p>
          <p className="font-description text-gray-400">{customer.email} | <span>{customer.phone}</span></p>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
            <p className="font-caption">Régimen fiscal</p>
            <p className="font-description">{customer.tax_system}</p>
            </div>
            <div className="flex flex-col">
            <p className="font-caption">CP</p>
            <p className="font-description">{customer.address.zip}</p>
            </div>
          </div>
      
      </Card>
      <Card className="p-[24px] mb-[24px]">
        <p className="font-subtitle">Productos</p>
        {products.map((item) => (
 <div key={item.id} className="my-[24px]">
          <div className="flex justify-between">
            <p className="font-caption">{item.sku} <span className="text-gray-400">({item.quantity})</span></p>
            <p className="font-description text-blue-300">${item.price} <span className="text-gray-400">MXN</span></p>
          </div>
 </div>
        ))}
       
      
      </Card>
      <Card className="p-[24px] mb-[24px]">
        <p className="font-subtitle">Método de paog y CFDI</p>
        <div className="my-[24px] font-description">
         <p>Método de pago</p>
         <p className="mb-[8px]">{paymentMethod}</p>
         <p>Us0 de CFDI</p>
         <p>{CFDIUse}</p>
          </div>
      
      </Card>
      <InvoiceResume customer={customer} products={products} paymentMethod={paymentMethod} CFDIUse={CFDIUse} />
    </main>
  );
};

export default ResumeInvoicePage;
