import { Customer } from "@/components/create-customer/types";
import facturaApiInstance from "./config/facturaApi";

export const postNewCustomer = async (data: Customer) => {
  try {
    const response = await facturaApiInstance.post("customers", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllCustomers = async () => {
    try {
      const response = await facturaApiInstance.get("customers");

      return response.data;
    } catch (error) {
      return error;
    }
  };
