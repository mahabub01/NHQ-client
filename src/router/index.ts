import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ModuleIndexView from "../modules/core/views/modules/ModuleIndexView.vue";
import { PmmModuleRoute } from "@/modules/pmm/router";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/about",
  //   name: "about",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
  {
    path: "/modules",
    name: "moduleIndex",
    component: ModuleIndexView,
  },

  //module route
  ...PmmModuleRoute,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
