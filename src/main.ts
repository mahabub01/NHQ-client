import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import { Vue3ProgressPlugin } from "@marcoschulte/vue3-progress";
import axios from "axios";
import VueCookies from "vue3-cookies";

import "text-spinners/spinners.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/design/css/new-design.css";
import "./assets/design/css/responsive-new-design.css";
import "./assets/toastr/toastr.min.css";
//import "toastr/build/toastr.min.css";

createApp(App)
  .use(store)
  .use(router)
  //.use(Vue3ProgressPlugin)
  .use(VueCookies, {
    expireTimes: "1d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
  })
  .mount("#app");

//with Credential for every request
axios.defaults.withCredentials = true;

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      //store.dispatch("LogOut"); //logout method here
      return router.push("/login");
    }
  }
});

import "bootstrap/dist/js/bootstrap.min.js";
//import "toastr/build/toastr.min.js";
