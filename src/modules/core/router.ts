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
            /* webpackChunkName: "authentication" */ "./views/auth/PasswordChange.vue"
          ),
      },

      {
        path: "profile-update",
        name: "profile-update",
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ "./views/auth/ProfileUpdate.vue"
          ),
      },
      {
        path: "profile-details",
        name: "profile-details",
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ "./views/auth/ProfileDetails.vue"
          ),
      },

      {
        path: "modules",
        name: "modules",
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ "./views/modules/ModuleIndexView.vue"
          ),
      },
      {
        path: "components",
        name: "components",
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ "./views/components/ComponentIndexView.vue"
          ),
      },
      {
        path: "permissions",
        name: "permissions",
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ "./views/permissions/PermissionIndexView.vue"
          ),
      },
      {
        path: "roles",
        name: "roles",
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ "./views/roles/RoleIndexView.vue"
          ),
      },
      {
        path: "roles/create",
        name: "roles_create",
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ "./views/roles/RoleCreateView.vue"
          ),
      },
      {
        path: "users/create",
        name: "users_create",
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ "./views/users/UserCreateView.vue"
          ),
      },
      {
        path: "users",
        name: "users",
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ "./views/users/UserIndexView.vue"
          ),
      },
    ],
  },
];
