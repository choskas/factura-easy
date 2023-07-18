import axios from "axios";

const facturaApiInstance = axios.create({
  baseURL: "https://www.facturapi.io/v2/",
});

facturaApiInstance.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_FACTURA_API_KEY;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default facturaApiInstance;
