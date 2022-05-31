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
        path: "milestones/:project_id?",
        name: "milestones",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/milestones/MilestoneIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones/create/:project_id?",
        name: "milestones-create",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/milestones/MilestoneCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones/:id/edit/:project_id?",
        name: "milestones-edit",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/milestones/MilestoneEditView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones/details/:slug/:project_id?",
        name: "milestones-details",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/milestones/MilestoneDetailsView.vue"
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
        path: "sub-milestones/:milestone_id?",
        name: "submilestones",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/sub-milestones/SubMilestoneIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "sub-milestones/create/:milestone_id?",
        name: "submilestones-create",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/sub-milestones/SubMilestoneCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "sub-milestones/:id/edit/:milestone_id?",
        name: "sub-milestones-edit",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/sub-milestones/SubMilestoneEditView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "submilestone-categories",
        name: "submilestone-categories",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/submilestone-categories/CategoryIndexView.vue"
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
        path: "sub-milestones/:milestone_id?/details/:id",
        name: "submilestones-details",
        component: () =>
          import(
            /* webpackChunkName: "submilestones" */ "./views/sub-milestones/SubMilestoneDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "sub-miletone-time-tracker/:milestone_id?/:submilestone_id",
        name: "sub-milestones-time-tracker",
        component: () =>
          import(
            /* webpackChunkName: "time-tracker" */ "./views/sub-milestones/TimeTrackerView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "tasks/:submilestone_id?",
        name: "tasks",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/tasks/TaskIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "tasks/:submilestone_id?/create",
        name: "tasks-create",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/tasks/TaskCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "tasks/:submilestone_id?/:id/edit",
        name: "tasks-edit",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/tasks/TaskEditView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "tasks/:submilestone_id?/details/:id",
        name: "tasksdetails",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/tasks/TaskDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "task-time-tracker/:submilestone_id?/:task_id",
        name: "task-time-tracker",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/tasks/TaskTimeTrackerView.vue"
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
        path: "pocs/details/:slug",
        name: "pocs-details",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/pocs/PocDetailsView.vue"
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
        path: "boqs/details/:slug",
        name: "boqs-details",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/boqs/BoqDetailsView.vue"
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
        path: "oems/details/:slug",
        name: "oems-details",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/oems/OemDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "delivery-timelines/:project_id",
        name: "delivery-timelines",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/delivery-timelines/DeliveryTimelineIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "delivery-challans/:project_id",
        name: "delivery-challans",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/delivery-challans/DeliveryChallanIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "disti-orders/:project_id",
        name: "disti-orders",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/disti-orders/DistiOrderIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "customer-pos/:project_id",
        name: "customer-pos",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/customer-pos/CustomerPOIndexView.vue"
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
