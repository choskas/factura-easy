  type Taxes = {
    type: string;
    rate: number
  }
  
  export type Product = {
    sku: string;
    price: string;
    product_key: string;
    tax_included: boolean;
    taxes: Taxes[] | [];
    description: string;
  };
  