import PmmModule from "./PmmModule.vue";

export const PmmModuleRoute = [
  {
    path: "/pmm",
    component: PmmModule,
    redirect: "",
    children: [
      {
        path: "categories",
        name: "categories",
        component: () =>
          import(
            /* webpackChunkName: "category" */ "./views/projects/categories/CategoryIndexView.vue"
          ),
      },
      {
        path: "categories/create",
        name: "categories-create",
        component: () =>
          import(
            /* webpackChunkName: "category" */ "./views/projects/categories/CategoryCreateView.vue"
          ),
      },
      {
        path: "categories/:id/edit",
        name: "categories-edit",
        component: () =>
          import(
            /* webpackChunkName: "category" */ "./views/projects/categories/CategoryEditView.vue"
          ),
      },
      {
        path: "tags",
        name: "tags",
        component: () =>
          import(
            /* webpackChunkName: "tags" */ "./views/projects/tags/TagIndexView.vue"
          ),
      },
      {
        path: "tags/create",
        name: "tags-create",
        component: () =>
          import(
            /* webpackChunkName: "tags" */ "./views/projects/tags/TagCreateView.vue"
          ),
      },
      {
        path: "tags/:id/edit",
        name: "tags-edit",
        component: () =>
          import(
            /* webpackChunkName: "tags" */ "./views/projects/tags/TagEditView.vue"
          ),
      },
      {
        path: "teams",
        name: "teams",
        component: () =>
          import(
            /* webpackChunkName: "teams" */ "./views/projects/teams/TeamIndexView.vue"
          ),
      },
      {
        path: "tags/create",
        name: "teams-create",
        component: () =>
          import(
            /* webpackChunkName: "teams" */ "./views/projects/teams/TeamCreateView.vue"
          ),
      },
      {
        path: "tags/:id/edit",
        name: "teams-edit",
        component: () =>
          import(
            /* webpackChunkName: "teams" */ "./views/projects/teams/TeamEditView.vue"
          ),
      },
      {
        path: "clients",
        name: "clients",
        component: () =>
          import(
            /* webpackChunkName: "clients" */ "./views/clients/ClientIndexView.vue"
          ),
      },
      {
        path: "clients/create",
        name: "clients-create",
        component: () =>
          import(
            /* webpackChunkName: "clients" */ "./views/clients/ClientCreateView.vue"
          ),
      },
      {
        path: "clients/:id/edit",
        name: "clients-edit",
        component: () =>
          import(
            /* webpackChunkName: "clients" */ "./views/clients/ClientEditView.vue"
          ),
      },
    ],
  },
];
