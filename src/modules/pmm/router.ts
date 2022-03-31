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
        path: "clients/create",
        name: "clients-create",
        component: () =>
          import(
            /* webpackChunkName: "projects-create" */ "./views/clients/ClientCreateView.vue"
          ),
      },
      {
        path: "clients/:id/edit/",
        name: "clients-edit",
        component: () =>
          import(
            /* webpackChunkName: "projects-edit" */ "./views/clients/ClientEditView.vue"
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
            /* webpackChunkName: "projects-edit" */ "./views/employees/EmployeeEditView.vue"
          ),
      },
      {
        path: "milestones",
        name: "milestones",
        component: () =>
          import(
            /* webpackChunkName: "projects" */ "./views/milestones/MilestoneIndexView.vue"
          ),
      },
      {
        path: "milestones/create",
        name: "milestones-create",
        component: () =>
          import(
            /* webpackChunkName: "projects-create" */ "./views/milestones/MilestoneCreateView.vue"
          ),
      },
      {
        path: "milestones/:id/edit/",
        name: "milestones-edit",
        component: () =>
          import(
            /* webpackChunkName: "projects-edit" */ "./views/milestones/MilestoneEditView.vue"
          ),
      },
    ],
  },
];
