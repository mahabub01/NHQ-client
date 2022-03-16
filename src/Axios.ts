import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-type": process.env.VUE_APP_CONTENT_TYPE,
    "Private-Key": process.env.VUE_APP_PRIVATE_KEY,
  },
});

export default apiClient;
