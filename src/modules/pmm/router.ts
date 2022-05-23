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
        path: "milestones/details/:slug",
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
        path: "sub-milestones",
        name: "sub-milestones",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/sub-milestones/SubMilestoneIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "sub-milestones/create",
        name: "sub-milestones-create",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/sub-milestones/SubMilestoneCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "sub-milestone-categories",
        name: "sub-milestone-categories",
        component: () =>
          import(
            /* webpackChunkName: "pmm-module" */ "./views/sub-milestone-categories/CategoryIndexView.vue"
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
        path: "sub-milestones/details/:id",
        name: "sub-milestones-details",
        component: () =>
          import(
            /* webpackChunkName: "sub-milestones" */ "./views/sub-milestones/SubMilestoneDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "sub-milestones-by-milestone/:id",
        name: "sub-milestoneby-milestone",
        component: () =>
          import(
            /* webpackChunkName: "submilestones" */ "./views/sub-milestones/SubMilestoneByMilestoneView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "sub-milestones/time-tracker/:sub_milestone_id",
        name: "sub-milestones-time-tracker",
        component: () =>
          import(
            /* webpackChunkName: "time-tracker" */ "./views/sub-milestones/TimeTrackerView.vue"
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
