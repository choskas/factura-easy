import axios from "axios";

const facturaApiInstance = axios.create({
  baseURL: "https://www.facturapi.io/v2/",
});


facturaApiInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );



export default facturaApiInstance;
