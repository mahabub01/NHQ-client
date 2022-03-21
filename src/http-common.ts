import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Private-Key": process.env.VUE_APP_PRIVATE_KEY,
  },
});

export default Axios;
