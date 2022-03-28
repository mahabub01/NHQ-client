import CoreModule from "./CoreModule.vue";

export const CoreModuleRoute = [
  {
    path: "/core",
    component: CoreModule,
    redirect: "",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "./views/dashboard/TheDashboard.vue"
          ),
        meta: { middleware: "auth" },
      },
    ],
  },
];
