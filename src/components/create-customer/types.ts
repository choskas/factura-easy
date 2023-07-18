export type CustomerAddress = {
  street: string;
  exterior: string;
  interior: string;
  neighborhood: string;
  city: string;
  municipality: string;
  zip: string;
  state: string;
  country: string;
};

export type Customer = {
  legal_name: string;
  tax_id: string;
  tax_system: string;
  email: string;
  phone: string;
  address: CustomerAddress;
};
