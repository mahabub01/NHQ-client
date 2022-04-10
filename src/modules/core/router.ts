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
      {
        path: "password-change",
        name: "password-change",
        component: () =>
          import(
            /* webpackChunkName: "password-change" */ "./views/auth/PasswordChange.vue"
          ),
      },
      {
        path: "profile-update",
        name: "profile-update",
        component: () =>
          import(
            /* webpackChunkName: "profile-uodate" */ "./views/auth/ProfileUpdate.vue"
          ),
      },
    ],
  },
];
