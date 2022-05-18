import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PageNotFound from "../components/PageNotFound.vue";
import { PmmModuleRoute } from "@/modules/pmm/router";
import { CoreModuleRoute } from "@/modules/core/router";
import store from "@/store/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "../modules/core/views/auth/TheLogin.vue"
      ),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "login" */ "../modules/core/views/auth/TheLogin.vue"
      ),
  },

  {
    path: "/reset-password",
    name: "reset-password",
    component: () =>
      import(
        /* webpackChunkName: "login" */ "../modules/core/views/auth/ResetPassword.vue"
      ),
  },

  {
    path: "/confirmation-password",
    name: "confirmation-password",
    component: () =>
      import(
        /* webpackChunkName: "login" */ "../modules/core/views/auth/ConfirmationPassword.vue"
      ),
  },

  //module route
  ...PmmModuleRoute,

  //Core Module Route
  ...CoreModuleRoute,

  //page Not Found Component
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, __, next) => {
  if (to.meta.middleware) {
    const middleware = require(`../modules/core/middleware/${to.meta.middleware}`);
    if (middleware) {
      middleware.default(to, next, store);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
