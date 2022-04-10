import axios from "axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const Axios = axios.create({
  withCredentials: true,
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Private-Key": process.env.VUE_APP_PRIVATE_KEY,
    //Authorization: "Bearer " + localStorage.getItem("token"),
    Authorization: "Bearer " + cookies.get("user-token"),
  },
});

export default Axios;
