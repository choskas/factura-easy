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

export enum Status {
  IN_VALIDATION = 'IN_VALIDATION',
  VALIDATED = 'VALIDATED',
  SUSPENDED = 'SUSPENDED',
}

interface SessionUser {
  id: string;
  facturapi_id: string;
  facturapi_token: string;
  status: Status;
  available_folios: number;
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
  _count: {
    customers: number
    products: number
  }
}

declare module "next-auth" {
  interface Session extends SessionUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string;
    email?: string;
    picture?: string;
    sub?: string;
    data: SessionUser;
  }
}
