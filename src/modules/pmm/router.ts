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
            /* webpackChunkName: "pmm-module" */ "./views/categories/CategoryIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "tags",
        name: "tags",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/tags/TagIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "teams",
        name: "teams",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/teams/TeamIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "clients",
        name: "clients",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/clients/ClientIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "clients/create",
        name: "clients-create",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/clients/ClientCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "clients/:id/edit/",
        name: "clients-edit",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/clients/ClientEditView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "clients/:id",
        name: "clients-details",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/clients/ClientDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "projects",
        name: "projects",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/projects/ProjectIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "projects/create",
        name: "projects-create",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/projects/ProjectCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "projects/:id/edit",
        name: "projects-edit",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/projects/ProjectEditView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "projects/:slug",
        name: "projects-details",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/projects/ProjectDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "employees",
        name: "employees",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/employees/EmployeeIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "employees/create",
        name: "employees-create",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/employees/EmployeeCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "employees/:id/edit/",
        name: "employees-edit",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/employees/EmployeeEditView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones",
        name: "milestones",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/milestones/MilestoneIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones/create",
        name: "milestones-create",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/milestones/MilestoneCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones/:id/edit/",
        name: "milestones-edit",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/milestones/MilestoneEditView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones-categories",
        name: "milestones-categories",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/milestones-categories/CategoryIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "tasks",
        name: "tasks",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/tasks/TaskIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "tasks/create",
        name: "tasks-create",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/tasks/TaskCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "task-categories",
        name: "task-categories",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/task-categories/CategoryIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "versions",
        name: "versions",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/versions/VersionIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "priorities",
        name: "priorities",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/priorities/PriorityIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "pocs/:project_id",
        name: "pocs",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/pocs/PocIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "pocs-categories",
        name: "pocs-categories",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/pocs-categories/CategoryIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "boqs/:project_id",
        name: "boqs",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/boqs/BoqIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "boq-categories",
        name: "boq-categories",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/boq-categories/CategoryIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "boq-category-items",
        name: "boq-category-items",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/boq-category-items/CategoryIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "oems/:project_id",
        name: "oems",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/oems/OemIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "designations",
        name: "designations",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/designations/DesignationIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "departments",
        name: "departments",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/departments/DepartmentIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
    ],
  },
];
