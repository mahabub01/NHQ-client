import { ref, reactive } from "vue";
import Axios from "@/http-common";
import { useStore } from "vuex";

export function useMilestone() {
  const loadingSpinner = ref(false);
  const store = useStore();
  //employee list for assain employee Select
  const assign_employees = ref([]);

  //categories list for Category Select
  const project_names = ref([]);

  //categories list for Category Select
  const categories = ref([]);

  const max_ele_error = ref("");
  const max_ele = ref(100); // use for set max value

  const is_view_point_show = ref("");

  //projects selectable
  const projectsSelectable = ref([]);
  const milestoneSelectable = ref([]);
  const teamSelectable = ref([]); //Team Members
  const followupSelectable = ref([]);
  const taskCategorySelectable = ref([]);
  const prioritySelectable = ref([]);

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
    project_id: "",
    submilestone_name: "",
    milestone_id: "",
    team_member_id: "",
    status: "",
    followup_id: "",
    submilestone_category_id: "",
    description: "",
    start_date: "",
    end_date: "",
    extended_date: "",
    priority_id: "",
    duration: "",
    token: store.state.currentUser.token,
    points: 0,
    is_auto_point: "2",
    user_id: user_id.value,
  });

  //use fun for get milestone using by milestone id
  async function getMilestonesById(milestone_id: any) {
    loadingSpinner.value = true;
    await Axios.get("/milestones-selectable-by-mid/" + milestone_id)
      .then((response) => {
        loadingSpinner.value = false;
        if (response.data.code === 200) {
          milestoneSelectable.value = response.data.data;
          formState.project_id = String(response.data.data[0].project_id);
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
  //use for point
  function autoPoint(event: any) {
    if (event.target.checked) {
      formState.is_auto_point = "2";
    } else {
      formState.is_auto_point = "3";
    }
  }

  //get milestones for Selectable
  async function getMilestones(project_id: any) {
    loadingSpinner.value = true;
    await Axios.get(
      "/milestones-selectable?user_id=" +
        user_id.value +
        "&flag=" +
        flag.value +
        "&project_id=" +
        project_id
    )
      .then((response) => {
        loadingSpinner.value = false;
        if (response.data.code === 200) {
          milestoneSelectable.value = response.data.data;
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
  //get projects for Selectable
  async function getProjects() {
    await Axios.get(
      "/project-selectable?user_id=" + user_id.value + "&flag=" + flag.value
    )
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          projectsSelectable.value = response.data.data;
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }

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

  //reset all property
  function resetForm() {
    formState.project_id = "";
    formState.submilestone_name = "";
    formState.milestone_id = "";
    formState.team_member_id = "";
    formState.status = "";
    formState.followup_id = "";
    formState.submilestone_category_id = "";
    formState.description = "";
    formState.start_date = "";
    formState.end_date = "";
    formState.extended_date = "";
    formState.priority_id = "";
    formState.duration = "";
    formState.token = store.state.currentUser.token;
    formState.points = 0;
    formState.is_auto_point = "2";
    formState.user_id = user_id.value;
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
  //get Priorities for Selectable
  async function getTeamMembers() {
    await Axios.get("/users-selectable")
      .then((response) => {
        if (response.data.code === 200) {
          teamSelectable.value = response.data.data;
          followupSelectable.value = response.data.data;
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }

  const duration_error = ref("");

  return {
    taskStatusSelectable,
    max_ele_error,
    max_ele,
    is_view_point_show,
    user_id,
    flag,
    getCategories,
    getProjects,
    getPriorities,
    formState,
    resetForm,
    startDateHandler,
    endDateHandler,
    extendedDateHandler,
    getMilestonesById,
    projectsSelectable,
    milestoneSelectable,
    teamSelectable,
    followupSelectable,
    taskCategorySelectable,
    prioritySelectable,
    getTeamMembers,
    getMilestones,
    duration_error,
    autoPoint,
  };
}
