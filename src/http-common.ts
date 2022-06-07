import axios from "axios";

export const Axios = axios.create({
  withCredentials: true,
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Private-Key": process.env.VUE_APP_PRIVATE_KEY,
    origin: process.env.VUE_APP_DOMAIN_URL,
    //Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

Axios.interceptors.request.use(
  async (config) => {
    config.withCredentials = true;
    config.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default Axios;
