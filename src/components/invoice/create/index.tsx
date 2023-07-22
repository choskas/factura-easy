"use client";

import {
  CustomersFacturAPI,
  ProductsFacturAPI,
} from "@/lib/types/facturapiTypes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmptyItems from "@/components/commons/EmptyItems";
import { Input } from "@/components/ui/input";
import {
  AccordionItem,
  Accordion,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Check, PlusCircle } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import Paginator from "@/components/commons/Paginator";
import useCreateInvoice from "@/hooks/invoice/useCreateInvoice";
import CustomSelect from "@/components/commons/custom-select";
import { CFDI_USER, PAYMENT_TYPE } from "@/lib/constants/catalogs";
import ClientCard from "@/components/commons/client-card";
import ProductCard from "@/components/commons/product-card";
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
  const {
    onClearFilters,
    onGetNewData,
    onSearch,
    onReset,
    selectClient,
    onClickProduct,
    onContinue,
    onChangeQuantity,
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
    selectedItems,
  } = useCreateInvoice(products, customers);
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
                  <Button className="uppercase my-[12px] w-full" type="submit">
                    {isDisabledButton && (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Buscar
                  </Button>
                </form>
              </div>
              {customersState.map((item) => (
                <ClientCard
                  key={item.id}
                  title={item.legal_name}
                  subtitle={item.tax_id}
                  description={item.email}
                  buttonText="Seleccionar"
                  onClick={() => selectClient(item)}
                />
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
                  <Button className="uppercase my-[12px] w-full" type="submit">
                    Buscar
                  </Button>
                </form>
              </div>
              {productsState.map((item) => (
                <ProductCard
                  key={item.id}
                  productKey={item.product_key}
                  sku={item.sku}
                  price={item.price}
                  description={item.description}
                  buttonText={
                    selectedItems.find((prd) => prd.id === item.id)
                      ? "Seleccionado"
                      : "Seleccionar"
                  }
                  onClick={() => onClickProduct(item)}
                  isDisabledButton={
                    selectedItems.find((prd) => prd.id === item.id)
                      ? true
                      : false
                  }
                />
              ))}
              <Paginator
                onChange={async (currentPage) => {
                  await onGetNewData("products", currentPage);
                }}
                totalPages={totalPagesProducts}
              />
              <Button
                disabled={selectedItems.length > 0 ? false : true}
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
                    <ProductCard
                    key={item.id}
                    productKey={item.product_key}
                    sku={item.sku}
                    description={item.description}
                    customComponent={
                      <>
                    <p className="text-caption mt-[24px]">Cantidad:</p>
                    <Input type="number" onChange={(e) => onChangeQuantity(parseInt(e.target.value), item)} />
                   </>
                    }
                    isDisabledButton={
                      selectedItems.find((prd) => prd.id === item.id)
                        ? true
                        : false
                    }
                  />
              ))}
              <Button
                //@ts-ignore
                disabled={selectedItems.find((item) => {
                  if (item.quantity > 0) {
                    return false;
                  }
                  return true;
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
              <CustomSelect
                options={PAYMENT_TYPE}
                onChange={(currentValue) => {
                  onSelectPaymentMethod(currentValue.toUpperCase());
                }}
                value={paymentMethod}
              />
            </div>
            <p className="font-description mb-[8px]">Uso del CFDI:</p>
            <CustomSelect
              options={CFDI_USER}
              onChange={(currentValue) => {
                onSelectCFDIUse(currentValue.toUpperCase());
              }}
              value={CFDIUse}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        disabled={
          customer &&
          selectedItems[0]?.quantity !== 0 &&
          CFDIUse &&
          paymentMethod
            ? false
            : true
        }
        className="w-full mt-[24px]"
        onClick={onFinish}
      >
        Continuar
      </Button>
      <Button variant="outline" className="w-full mt-[24px]" onClick={onReset}>
        Empecemos de nuevo
      </Button>
    </>
  );
};

export default InvoiceAccordionsSteps;
