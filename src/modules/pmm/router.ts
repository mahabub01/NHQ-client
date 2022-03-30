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
            /* webpackChunkName: "category" */ "./views/categories/CategoryIndexView.vue"
          ),
      },
      {
        path: "tags",
        name: "tags",
        component: () =>
          import(
            /* webpackChunkName: "tags" */ "./views/tags/TagIndexView.vue"
          ),
      },

      {
        path: "teams",
        name: "teams",
        component: () =>
          import(
            /* webpackChunkName: "teams" */ "./views/teams/TeamIndexView.vue"
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
        path: "projects",
        name: "projects",
        component: () =>
          import(
            /* webpackChunkName: "projects" */ "./views/projects/ProjectIndexView.vue"
          ),
      },
      {
        path: "projects/create",
        name: "projects-create",
        component: () =>
          import(
            /* webpackChunkName: "projects-create" */ "./views/projects/ProjectCreateView.vue"
          ),
      },
      {
        path: "employees",
        name: "employees",
        component: () =>
          import(
            /* webpackChunkName: "projects" */ "./views/employees/EmployeeIndexView.vue"
          ),
      },
      {
        path: "employees/create",
        name: "employees-create",
        component: () =>
          import(
            /* webpackChunkName: "projects-create" */ "./views/employees/EmployeeCreateView.vue"
          ),
      },
      {
        path: "employees/:id/edit/",
        name: "employees-edit",
        component: () =>
          import(
            /* webpackChunkName: "projects-create" */ "./views/employees/EmployeeEditView.vue"
          ),
      },
    ],
  },
];
