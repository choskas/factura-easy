"use client";

import {
  CustomersFacturAPI,
  ProductsFacturAPI,
} from "@/lib/types/facturapiTypes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import EmptyItems from "@/components/commons/EmptyItems";
import { Input } from "@/components/ui/input";
import {
  AccordionItem,
  Accordion,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { Check, PlusCircle } from "lucide-react";
import axios from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import Paginator from "@/components/commons/Paginator";
import useCreateInvoice from "@/hooks/invoice/useCreateInvoice";
import CustomSelect from "@/components/commons/custom-select";
import { CFDI_USER, PAYMENT_METHOD, PAYMENT_TYPE } from "@/lib/constants/catalogs";
import { FormLabel } from "@/components/ui/form";

export type Step = "customers" | "products" | "counter" | "extra-info" | "";
export interface ProductsWithQuantity extends ProductsFacturAPI {
  quantity: number;
}
const InvoiceAccordionsSteps = ({
  customers,
  products,
  totalPagesCustomers,
  totalPagesProducts,
}: {
  customers: CustomersFacturAPI[];
  products: ProductsFacturAPI[];
  totalPagesCustomers: number;
  totalPagesProducts: number;
}) => {
    const {    onClearFilters,
        onGetNewData,
        onSearch,
        onReset,
        selectClient,
        onClickProduct,
        onContinue,
        onSliderValueChange,
        onFinish,
        onSelectCFDIUse,
        onSelectPaymentMethod,
        customersState,
        productsState,
        isDisabledButton,
        step,
        customer,
        paymentMethod,
        CFDIUse,
        selectedItems} = useCreateInvoice(products, customers)
  if (customersState.length === 0)
    return (
      <EmptyItems
        title="Aun no haz agregado un cliente."
        to="/customer/create"
        buttonText="Agregar cliente"
      />
    );

  return (
    <>
      <Accordion type="single" value={step} className="w-full mb-[24px]">
        <AccordionItem value="customers">
          <AccordionTrigger className="font-subtitle" disabled>
            {customer
              ? `Facturaremos a ${customer.legal_name}`
              : "¿A que cliente le vamos a facturar?"}
          </AccordionTrigger>
          <AccordionContent>
            <>
              <div className="flex w-full flex-col">
                <form
                  name="search-customer"
                  onSubmit={(e) => onSearch(e, "customers")}
                >
                  <Input
                    onChange={(e) => {
                      if (e.target.value.length <= 1) {
                        onClearFilters("customers");
                      }
                    }}
                    type="text"
                    name="search"
                    placeholder="Email o RFC"
                  />
                  <Button className="uppercase mt-[12px] w-full" type="submit">
                    {isDisabledButton && (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Buscar
                  </Button>
                </form>
              </div>
              {customersState.map((item) => (
                <Card
                  key={item.id}
                  className="p-[24px] flex flex-col items-center my-[24px]"
                >
                  <p className="font-description">{item.legal_name}</p>
                  <p className="font-caption mb-[12px]">{item.email}</p>
                  <Button
                    variant="outline"
                    className="w-full uppercase"
                    onClick={() => selectClient(item)}
                  >
                    <Check className="mr-[8px]" size={20} /> Seleccionar{" "}
                  </Button>
                </Card>
              ))}
              <Paginator
                onChange={async (currentPage) => {
                  await onGetNewData("customers", currentPage);
                }}
                totalPages={totalPagesCustomers}
              />
            </>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="products">
          <AccordionTrigger className="font-subtitle" disabled>
            ¿Qué vamos a facturar?
          </AccordionTrigger>
          <AccordionContent>
            <>
              <div className="flex w-full flex-col">
                <form
                  name="search-products"
                  onSubmit={(e) => onSearch(e, "products")}
                >
                  <Input
                    onChange={(e) => {
                      if (e.target.value.length <= 1) {
                        onClearFilters("products");
                      }
                    }}
                    name="search"
                    type="text"
                    placeholder="SKU"
                  />
                  <Button className="uppercase mt-[12px] w-full" type="submit">
                    Buscar
                  </Button>
                </form>
              </div>
              {productsState.map((item) => (
                <Card
                  key={item.id}
                  className="p-[24px] flex flex-col items-center my-[24px]"
                >
                  <p className="font-description">{item.sku}</p>
                  <p className="font-caption">{item.description}</p>
                  <Button
                    variant="outline"
                    onClick={() => onClickProduct(item)}
                    className="w-full mt-[12px]"
                  >
                    <PlusCircle className="mr-[8px]" size={24} />
                    Agregar Producto
                  </Button>
                </Card>
              ))}
              <Paginator
                onChange={async (currentPage) => {
                  await onGetNewData("products", currentPage);
                }}
                totalPages={totalPagesProducts}
              />
              <Button
                disabled={selectedItems.length > 0 ? false : true } 
                className="uppercase w-full"
                onClick={() => onContinue("counter")}
              >
                Continuar
              </Button>
            </>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="counter">
          <AccordionTrigger className="font-subtitle" disabled>
            ¿Cuánto vamos a facturar?
          </AccordionTrigger>
          <AccordionContent>
            <>
              {selectedItems.map((item) => (
                <Card
                  key={item.id}
                  className="p-[24px] flex flex-col items-center my-[24px]"
                >
                  <p className="font-description">{item.sku}</p>
                  <p className="font-caption">{item.description}</p>
                  <p className="font-description mb-[12px]">{item.quantity}</p>
                  <Slider
                    value={[item.quantity]}
                    onValueChange={(e) => {
                        onSliderValueChange(e, item)
                    }}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </Card>
              ))}
                 <Button
                  //@ts-ignore
                 disabled={selectedItems.find((item) => {
                  if (item.quantity > 0){
                    return false
                  }
                  return true
                 })}
                className="uppercase w-full"
                onClick={() => onContinue("extra-info")}
              >
                Continuar
              </Button>
            </>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="extra-info">
          <AccordionTrigger className="font-subtitle" disabled>
            Agrega estos datos extra
          </AccordionTrigger>
          <AccordionContent>
            <div className="mb-[12px]">
              <p className="font-description mb-[8px]">Metodo de pago:</p>
            <CustomSelect options={PAYMENT_TYPE} onChange={(currentValue) => {
              onSelectPaymentMethod(currentValue.toUpperCase())
            }} value={paymentMethod} />
            </div>
            <p className="font-description mb-[8px]">Uso del CFDI:</p>
            <CustomSelect options={CFDI_USER} onChange={(currentValue) => {
              onSelectCFDIUse(currentValue.toUpperCase())
            }} value={CFDIUse} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button disabled={customer && selectedItems[0]?.quantity !== 0 && CFDIUse && paymentMethod  ? false : true} className="w-full mt-[24px]" onClick={onFinish}>
        Continuar
      </Button>
      <Button variant='outline' className="w-full mt-[24px]" onClick={onReset}>
        Empecemos de nuevo
      </Button>
    </>
  );
};

export default InvoiceAccordionsSteps;
