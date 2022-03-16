import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ModuleIndexView from "../modules/core/views/modules/ModuleIndexView.vue";

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

  {
    path: "/pmm/categories",
    name: "categories",
    component: () =>
      import(
        /* webpackChunkName: "categories" */ "../modules/pmm/views/projects/categories/CategoryViewIndex.vue"
      ),
  },
  {
    path: "/pmm/categories/create",
    name: "category_create",
    component: () =>
      import(
        /* webpackChunkName: "categories-create" */ "../modules/pmm/views/projects/categories/CategoryViewCreate.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
