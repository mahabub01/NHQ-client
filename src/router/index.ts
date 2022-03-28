import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PageNotFound from "../components/PageNotFound.vue";
import { PmmModuleRoute } from "@/modules/pmm/router";
import { CoreModuleRoute } from "@/modules/core/router";
import store from "@/store/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../modules/core/views/auth/TheLogin.vue"
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
