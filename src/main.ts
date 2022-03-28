import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Vue3ProgressPlugin } from "@marcoschulte/vue3-progress";

import "text-spinners/spinners.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/design/css/new-design.css";
import "./assets/design/css/responsive-new-design.css";
import "./assets/toastr/toastr.min.css";
//import "toastr/build/toastr.min.css";

createApp(App).use(store).use(router).use(Vue3ProgressPlugin).mount("#app");

import "bootstrap/dist/js/bootstrap.min.js";
//import "toastr/build/toastr.min.js";
