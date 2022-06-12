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
            /* webpackChunkName: "categories" */ "./views/categories/CategoryIndexView.vue"
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
        path: "clients/:id",
        name: "clients-details",
        component: () =>
          import(
            /* webpackChunkName: "clients" */ "./views/clients/ClientDetailsView.vue"
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
        path: "projects-by-employee/:user_id?",
        name: "projects-by-employee",
        component: () =>
          import(
            /* webpackChunkName: "projects" */ "./views/projects/employees/ProjectByEmployeeView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "projects/:slug",
        name: "projects-details",
        component: () =>
          import(
            /* webpackChunkName: "projects" */ "./views/projects/ProjectDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "employees",
        name: "employees",
        component: () =>
          import(
            /* webpackChunkName: "employees" */ "./views/employees/EmployeeIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "employees/create",
        name: "employees-create",
        component: () =>
          import(
            /* webpackChunkName: "employees" */ "./views/employees/EmployeeCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "employees/:id/edit/",
        name: "employees-edit",
        component: () =>
          import(
            /* webpackChunkName: "employees" */ "./views/employees/EmployeeEditView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones/:project_id?",
        name: "milestones",
        component: () =>
          import(
            /* webpackChunkName: "milestones" */ "./views/milestones/MilestoneIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones-by-employee/:user_id?/:project_id?",
        name: "milestones-by-employee",
        component: () =>
          import(
            /* webpackChunkName: "milestones" */ "./views/projects/employees/MilestoneByEmployeeView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones/create/:project_id?",
        name: "milestones-create",
        component: () =>
          import(
            /* webpackChunkName: "milestones" */ "./views/milestones/MilestoneCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones/:id/edit/:project_id?",
        name: "milestones-edit",
        component: () =>
          import(
            /* webpackChunkName: "milestones" */ "./views/milestones/MilestoneEditView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "milestones/details/:slug/:project_id?",
        name: "milestones-details",
        component: () =>
          import(
            /* webpackChunkName: "milestones" */ "./views/milestones/MilestoneDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "milestones-categories",
        name: "milestones-categories",
        component: () =>
          import(
            /* webpackChunkName: "milestones" */ "./views/milestones-categories/CategoryIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "sub-milestones/:milestone_id?",
        name: "submilestones",
        component: () =>
          import(
            /* webpackChunkName: "submilestones" */ "./views/sub-milestones/SubMilestoneIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "sub-milestones/create/:milestone_id?",
        name: "submilestones-create",
        component: () =>
          import(
            /* webpackChunkName: "submilestones" */ "./views/sub-milestones/SubMilestoneCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "sub-milestones/:id/edit/:milestone_id?",
        name: "sub-milestones-edit",
        component: () =>
          import(
            /* webpackChunkName: "submilestones" */ "./views/sub-milestones/SubMilestoneEditView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "sub-milestones-by-employee/:user_id?/:project_id?/:milestone_id?",
        name: "sub-milestones-by-employee",
        component: () =>
          import(
            /* webpackChunkName: "submilestones" */ "./views/projects/employees/SubMilestoneByEmployeeView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "submilestone-categories",
        name: "submilestone-categories",
        component: () =>
          import(
            /* webpackChunkName: "submilestones" */ "./views/submilestone-categories/CategoryIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "versions",
        name: "versions",
        component: () =>
          import(
            /* webpackChunkName: "versions" */ "./views/versions/VersionIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "priorities",
        name: "priorities",
        component: () =>
          import(
            /* webpackChunkName: "priorities" */ "./views/priorities/PriorityIndexView.vue"
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
            /* webpackChunkName: "tasks" */ "./views/tasks/TaskIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "tasks/:submilestone_id?/create",
        name: "tasks-create",
        component: () =>
          import(
            /* webpackChunkName: "tasks" */ "./views/tasks/TaskCreateView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "tasks/:submilestone_id?/:id/edit",
        name: "tasks-edit",
        component: () =>
          import(
            /* webpackChunkName: "tasks" */ "./views/tasks/TaskEditView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "tasks/:submilestone_id?/details/:id",
        name: "tasksdetails",
        component: () =>
          import(
            /* webpackChunkName: "tasks" */ "./views/tasks/TaskDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "task-time-tracker/:submilestone_id?/:task_id",
        name: "task-time-tracker",
        component: () =>
          import(
            /* webpackChunkName: "tasks" */ "./views/tasks/TaskTimeTrackerView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "tasks-by-employee/:user_id?/:project_id?/:milestone_id?/:submilestone_id?",
        name: "tasks-by-employee",
        component: () =>
          import(
            /* webpackChunkName: "tasks" */ "./views/projects/employees/TaskByEmployeeView.vue"
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
      {
        path: "pocs/details/:slug",
        name: "pocs-details",
        component: () =>
          import(
            /* webpackChunkName: "pocs" */ "./views/pocs/PocDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "pocs-categories",
        name: "pocs-categories",
        component: () =>
          import(
            /* webpackChunkName: "pocs" */ "./views/pocs-categories/CategoryIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "boqs/:project_id",
        name: "boqs",
        component: () =>
          import(
            /* webpackChunkName: "boqs" */ "./views/boqs/BoqIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "boqs/details/:slug",
        name: "boqs-details",
        component: () =>
          import(
            /* webpackChunkName: "boqs" */ "./views/boqs/BoqDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "boq-categories",
        name: "boq-categories",
        component: () =>
          import(
            /* webpackChunkName: "boqs" */ "./views/boq-categories/CategoryIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "boq-category-items",
        name: "boq-category-items",
        component: () =>
          import(
            /* webpackChunkName: "boqs" */ "./views/boq-category-items/CategoryIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "oems/:project_id",
        name: "oems",
        component: () =>
          import(
            /* webpackChunkName: "oems" */ "./views/oems/OemIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "oems/details/:slug",
        name: "oems-details",
        component: () =>
          import(
            /* webpackChunkName: "oems" */ "./views/oems/OemDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "delivery-timelines/:project_id",
        name: "delivery-timelines",
        component: () =>
          import(
            /* webpackChunkName: "delivery-timelines" */ "./views/delivery-timelines/DeliveryTimelineIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "delivery-timelines/details/:slug",
        name: "delivery-timelines-details",
        component: () =>
          import(
            /* webpackChunkName: "delivery-timelines" */ "./views/delivery-timelines/DeliveryTimelineDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "delivery-challans/:project_id",
        name: "delivery-challans",
        component: () =>
          import(
            /* webpackChunkName: "delivery-challans" */ "./views/delivery-challans/DeliveryChallanIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "delivery-challans/details/:slug",
        name: "delivery-challans-details",
        component: () =>
          import(
            /* webpackChunkName: "delivery-challans" */ "./views/delivery-challans/DeliveryChallanDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "disti-orders/:project_id",
        name: "disti-orders",
        component: () =>
          import(
            /* webpackChunkName: "disti-orders" */ "./views/disti-orders/DistiOrderIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "disti-orders/details/:slug",
        name: "disti-orders-details",
        component: () =>
          import(
            /* webpackChunkName: "disti-orders" */ "./views/disti-orders/DistiOrderDetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "customer-pos/:project_id",
        name: "customer-pos",
        component: () =>
          import(
            /* webpackChunkName: "customer-pos" */ "./views/customer-pos/CustomerPOIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "customer-pos/details/:slug",
        name: "customer-pos-details",
        component: () =>
          import(
            /* webpackChunkName: "customer-pos" */ "./views/customer-pos/CustomerPODetailsView.vue"
          ),
        meta: { middleware: "auth" },
      },

      {
        path: "designations",
        name: "designations",
        component: () =>
          import(
            /* webpackChunkName: "designations" */ "./views/designations/DesignationIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
      {
        path: "departments",
        name: "departments",
        component: () =>
          import(
            /* webpackChunkName: "departments" */ "./views/departments/DepartmentIndexView.vue"
          ),
        meta: { middleware: "auth" },
      },
    ],
  },
];
