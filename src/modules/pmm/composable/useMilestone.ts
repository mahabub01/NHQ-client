import { ref, reactive } from "vue";
import Axios from "@/http-common";

export function useMilestone() {
  //employee list for assain employee Select
  const assign_employees = ref([]);

  //categories list for Category Select
  const project_names = ref([]);

  //categories list for Category Select
  const categories = ref([]);

  //priority List
  const prioritySelectable = ref([]);

  const old_weightage = ref(0);
  const max_ele_error = ref("");
  const is_milestone_point_auto = ref("");

  const taskStatusSelectable = reactive([
    { id: "1", text: "To Do" },
    { id: "3", text: "In Progress" },
    { id: "4", text: "Dependency" },
    { id: "2", text: "Completed" },
  ]);

  //use for saving preloader
  const user_id = ref(localStorage.getItem("user_id"));
  const flag = ref(localStorage.getItem("flag"));
  const token = ref(localStorage.getItem("token"));

  const formState = reactive({
    project_name: "",
    start_date: "",
    milestone_name: "",
    end_date: "",
    assign_employee: "",
    extended_date: "",
    follow_up: "",
    points: 0,
    category: "",
    file_name: "",
    description: "",
    duration: "",
    token: token.value,
    user_id: String(user_id.value),
    is_auto_point: "2", //default autometic created point
    priority_id: "",
    status: "1",
  });

  //get Priorities for Selectable
  async function getPriorities() {
    await Axios.get("/priority-selectable")
      .then((response) => {
        if (response.data.code === 200) {
          prioritySelectable.value = response.data.data;
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }

  async function getProjectNames(project_id: any = "") {
    await Axios.get(
      "/project-selectable?flag=" +
        flag.value +
        "&user_id=" +
        user_id.value +
        "&project_id=" +
        project_id
    )
      .then((response) => {
        if (response.data.code === 200) {
          project_names.value = response.data.data;
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }

  async function getCategories() {
    await Axios.get("/milestone-categories-selectable")
      .then((response) => {
        if (response.data.code === 200) {
          categories.value = response.data.data;
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }

  async function getAssignEmployees() {
    await Axios.get("/employees-selectable")
      .then((response) => {
        if (response.data.code === 200) {
          assign_employees.value = response.data.data;
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }

  //reset all property
  function resetForm() {
    formState.project_name = "";
    formState.milestone_name = "";
    formState.assign_employee = "";
    formState.points = 0;
    formState.follow_up = "";
    formState.category = "";
    formState.start_date = "";
    formState.end_date = "";
    formState.extended_date = "";
    formState.file_name = "";
    formState.description = "";
  }

  function startDateHandler(value: any) {
    formState.start_date = new Date(value).toISOString().slice(0, 10);
  }

  function endDateHandler(value: any) {
    formState.end_date = new Date(value).toISOString().slice(0, 10);
  }

  function extendedDateHandler(value: any) {
    formState.extended_date = new Date(value).toISOString().slice(0, 10);
  }

  return {
    assign_employees,
    project_names,
    categories,
    prioritySelectable,
    taskStatusSelectable,
    old_weightage,
    max_ele_error,
    is_milestone_point_auto,
    user_id,
    flag,
    getCategories,
    getAssignEmployees,
    getProjectNames,
    getPriorities,
    formState,
    resetForm,
    startDateHandler,
    endDateHandler,
    extendedDateHandler,
  };
}
