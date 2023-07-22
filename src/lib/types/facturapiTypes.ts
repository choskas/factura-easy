import { Address } from "./next-auth";

export interface ProductsFacturAPI {
  _id: string;
  organization: string;
  livemode: boolean;
  product_key: string;
  description: string;
  price: number;
  created_at: string;
  tax_included: boolean;
  taxes: String[];
  local_taxes: [] | String[];
  unit_key: string;
  sku: string;
  unit_name: string;
  __v: number;
  id: string;
}

export interface CustomersFacturAPI {
  _id: string;
  organization: string;
  created_at: string;
  livemode: boolean;
  tax_id: string;
  tax_system: string;
  legal_name: string;
  email: string;
  phone: string;
  address: Address;
  __v: number;
  id: string;
}
