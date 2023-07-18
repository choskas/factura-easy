export interface Address {
  id: string;
  street: string;
  exterior: string;
  interior: string;
  neighborhood: string;
  city: string;
  municipality: string;
  zip: string;
  state: string;
  country: string;
  userId: string;
}

declare module "next-auth" {
  interface Session {
    id: string;
    facturapi_id: string;
    api_token: string;
    name: string;
    maternal_name: string;
    last_name: string;
    rfc: string;
    email: string;
    emailVerified: boolean;
    phone: string;
    entreprise_name: string;
    image: string;
    password: String;
    accounts: any;
    sessions: any;
    address: Address;
    accessToken: string;
  }
}
