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
      {
        path: "profile-details",
        name: "profile-details",
        component: () =>
          import(
            /* webpackChunkName: "profile-details" */ "./views/auth/ProfileDetails.vue"
          ),
      },

      {
        path: "modules",
        name: "modules",
        component: () =>
          import(
            /* webpackChunkName: "modules" */ "./views/modules/ModuleIndexView.vue"
          ),
      },
      {
        path: "components",
        name: "components",
        component: () =>
          import(
            /* webpackChunkName: "components" */ "./views/components/ComponentIndexView.vue"
          ),
      },
      {
        path: "permissions",
        name: "permissions",
        component: () =>
          import(
            /* webpackChunkName: "permission" */ "./views/permissions/PermissionIndexView.vue"
          ),
      },
      {
        path: "roles",
        name: "roles",
        component: () =>
          import(
            /* webpackChunkName: "roles" */ "./views/roles/RoleIndexView.vue"
          ),
      },
    ],
  },
];
