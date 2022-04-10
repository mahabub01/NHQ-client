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
        meta: { middleware: "auth" },
      },
      {
        path: "tags",
        name: "tags",
        component: () =>
          import(
            /* webpackChunkName: "tags" */ "./views/tags/TagIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "teams",
        name: "teams",
        component: () =>
          import(
            /* webpackChunkName: "teams" */ "./views/teams/TeamIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "clients",
        name: "clients",
        component: () =>
          import(
            /* webpackChunkName: "clients" */ "./views/clients/ClientIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "clients/create",
        name: "clients-create",
        component: () =>
          import(
            /* webpackChunkName: "clients" */ "./views/clients/ClientCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "clients/:id/edit/",
        name: "clients-edit",
        component: () =>
          import(
            /* webpackChunkName: "clients" */ "./views/clients/ClientEditView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "projects",
        name: "projects",
        component: () =>
          import(
            /* webpackChunkName: "projects" */ "./views/projects/ProjectIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "projects/create",
        name: "projects-create",
        component: () =>
          import(
            /* webpackChunkName: "projects" */ "./views/projects/ProjectCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "projects/:id/edit",
        name: "projects-edit",
        component: () =>
          import(
            /* webpackChunkName: "projects" */ "./views/projects/ProjectEditView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "employees",
        name: "employees",
        component: () =>
          import(
            /* webpackChunkName: "employee" */ "./views/employees/EmployeeIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "employees/create",
        name: "employees-create",
        component: () =>
          import(
            /* webpackChunkName: "employee" */ "./views/employees/EmployeeCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "employees/:id/edit/",
        name: "employees-edit",
        component: () =>
          import(
            /* webpackChunkName: "employee" */ "./views/employees/EmployeeEditView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones",
        name: "milestones",
        component: () =>
          import(
            /* webpackChunkName: "milestone" */ "./views/milestones/MilestoneIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones/create",
        name: "milestones-create",
        component: () =>
          import(
            /* webpackChunkName: "milestone" */ "./views/milestones/MilestoneCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones/:id/edit/",
        name: "milestones-edit",
        component: () =>
          import(
            /* webpackChunkName: "milestone" */ "./views/milestones/MilestoneEditView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "tasks",
        name: "tasks",
        component: () =>
          import(
            /* webpackChunkName: "tasks" */ "./views/tasks/TaskIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "tasks/create",
        name: "tasks-create",
        component: () =>
          import(
            /* webpackChunkName: "tasks" */ "./views/tasks/TaskCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "pocs/:project_id",
        name: "pocs",
        component: () =>
          import(
            /* webpackChunkName: "pocs" */ "./views/pocs/PocIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
    ],
  },
];
