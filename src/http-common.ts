import axios from "axios";

export const Axios = axios.create({
  withCredentials: true,
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Private-Key": process.env.VUE_APP_PRIVATE_KEY,
    //Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

Axios.interceptors.request.use(
  async (config) => {
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
