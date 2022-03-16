import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/design/css/new-design.css";
import "./assets/design/css/responsive-new-design.css";
import "./assets/toastr/toastr.min.css";
createApp(App).use(store).use(router).mount("#app");

import "bootstrap/dist/js/bootstrap.min.js";
