import { ProductsWithQuantity, Step } from "@/components/invoice/create";
import { toast } from "@/components/ui/use-toast";
import { CustomersFacturAPI, ProductsFacturAPI } from "@/lib/types/facturapiTypes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";

const useCreateInvoice = (products: ProductsFacturAPI[], customers: CustomersFacturAPI[]) => {
    const router = useRouter();
    const { update } = useSession();
    const [customersState, setCustomersState] = useState(customers);
    const [productsState, setProductsState] = useState(products);
    const [isDisabledButton, setIsDisabledButton] = useState(false);
    const [step, setStep] = useState<Step>("customers");
    const [customer, setCustomer] = useState<CustomersFacturAPI | null>(null);
    const [CFDIUse, setCFDIUse] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [selectedItems, setSelectedItems] = useState<
      ProductsWithQuantity[] | []
    >([]);
  
    const onClickProduct = (item: ProductsFacturAPI) => {
      toast({ title: `Hemos agregado ${item.sku} para facturar.` });
      setSelectedItems([...selectedItems, { ...item, quantity: 0 }]);
    };
  
    const onContinue = (stepItem: Step) => setStep(stepItem);
  
    const selectClient = (item: CustomersFacturAPI) => {
      setCustomer(item);
      toast({ title: `Facturaremos a nombre de ${item.legal_name}` });
      onContinue("products");
    };
  
    const onReset = () => {
      setSelectedItems([]);
      setCustomer(null);
      setStep("customers");
    };
  
    const onSearch = async (
      e: React.FormEvent<HTMLFormElement>,
      type: Step
    ) => {
      e.preventDefault();
      try {
        setIsDisabledButton(true);
        const formElement = e.currentTarget as HTMLFormElement;
        const formData = new FormData(formElement);
        const searchValue = formData.get("search");
        if (type === "customers") {
          const response = await axios.get(
            `/api/clients/by-name-or-email/?search=${
              searchValue?.toString().includes("@")
                ? searchValue.toString().toLowerCase()
                : searchValue?.toString().toUpperCase()
            }`
          );
          setCustomersState([response.data.customers]);
          return;
        }
        const response = await axios.get(
          `/api/product/by-sku/?search=${searchValue?.toString().toUpperCase()}`
        );
        setProductsState([response.data.products]);
        return;
      } catch (error) {
        toast({ title: "No se encontraron coincidencias." });
        return error;
      } finally {
        setIsDisabledButton(false);
      }
    };
  
    const onClearFilters = async (type: Step) => {
      if (type === "customers") return setCustomersState(customers);
      setProductsState(products);
    };
  
    const onGetNewData = async (type: Step, page: number) => {
      if (type === "customers") {
        const results = await axios.get(`/api/clients/?page=${page}`);
        setCustomersState(results.data.customers);
        return;
      }
      const results = await axios.get(`/api/products/?page=${page}`);
      setProductsState(results.data.products);
    };

    const onSliderValueChange = (e: Array<number>, item: ProductsWithQuantity) => {
        const newArr: ProductsWithQuantity[] = selectedItems.map(
            (pd) => {
              if (pd.id === item.id) {
                pd.quantity = e[0];
              }
              return pd;
            }
          );
          setSelectedItems(newArr);
    }

    const onSelectCFDIUse = (newValue: string) => {
        setCFDIUse(newValue)
    }

    const onSelectPaymentMethod = (newValue: string) => {
        setPaymentMethod(newValue)
    }
    
    const onFinish = () => {
        router.push(`/invoice/create/resume/?customer=${JSON.stringify(customer)}&products=${JSON.stringify(selectedItems)}&paymentMethod=${paymentMethod}&CFDIUse=${CFDIUse}`)
    }
    // se debe enviar customer y selectedItems y extraInfo
  return {
    onClearFilters,
    onGetNewData,
    onSearch,
    onReset,
    selectClient,
    onClickProduct,
    onContinue,
    onFinish,
    onSelectPaymentMethod,
    onSelectCFDIUse,
    customersState,
    productsState,
    isDisabledButton,
    step,
    customer,
    selectedItems,
    paymentMethod,
    CFDIUse,
    onSliderValueChange
  }
}

export default useCreateInvoice