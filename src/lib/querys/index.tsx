export const GET_USER_BY_ID_NO_PASS = {
  id: true,
  facturapi_id: true,
  api_token: true,
  name: true,
  maternal_name: true,
  last_name: true,
  rfc: true,
  email: true,
  emailVerified: true,
  image: true,
  facturapi_token: true,
  available_folios: true,
  status: true,
  _count: {
    select: {
      customers: true,
      products: true,
    },
  },
  address: {
    select: {
      street: true,
      exterior: true,
      interior: true,
      neighborhood: true,
      municipality: true,
      zip: true,
      state: true,
      country: true,
    },
  },
};

export const GET_USER_BY_ID = {
  id: true,
  facturapi_id: true,
  api_token: true,
  name: true,
  maternal_name: true,
  last_name: true,
  rfc: true,
  email: true,
  emailVerified: true,
  image: true,
  facturapi_token: true,
  available_folios: true,
  status: true,
  _count: {
    select: {
      customers: true,
      products: true,
    },
  },
  address: {
    select: {
      street: true,
      exterior: true,
      interior: true,
      neighborhood: true,
      municipality: true,
      zip: true,
      state: true,
      country: true,
    },
  },
  password: true,
}