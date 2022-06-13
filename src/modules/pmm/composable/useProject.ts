import { ref, reactive } from "vue";
import { useStore } from "vuex";
import Axios from "@/http-common";

export function useProject() {
  const store = useStore();
  const user_id = ref(localStorage.getItem("user_id"));

  const formState = reactive({
    name: "",
    category_id: "",
    team_id: "",
    lead_id: "",
    start_date: "",
    end_date: "",
    extended_date: "",
    client_id: "",
    tags: "",
    description: "",
    status: "",
    token: store.state.currentUser.token,
    onboarding_point: 30,
    operation_point: 70,
    created_by: user_id.value,
  });

  //Status List for Status Select
  const StatusList = reactive([
    { id: "1", text: "To Do" },
    { id: "3", text: "In Progress" },
    { id: "4", text: "Dependency" },
    { id: "2", text: "Completed" },
  ]);

  //Category list for Category Select
  const categoryList = ref([]);

  //team list for Team Select
  const teamList = ref([]);

  //lead list for lead Select
  const leadList = ref([]);

  //client list for client Select
  const clientList = ref([]);

  //team list for Team Select
  const tagList = ref([]);

  //get Selectable TeamList
  async function getTeams() {
    await Axios.get("teams-selectable")
      .then((response) => {
        if (response.data.code === 200) {
          teamList.value = response.data.data;
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }

  //get Selectable leadList
  async function getLeadList() {
    await Axios.get("teamlead-selectable")
      .then((response) => {
        if (response.data.code === 200) {
          leadList.value = response.data.data;
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }

  //get Selectable leadList
  async function getClientList() {
    await Axios.get("clients-selectable")
      .then((response) => {
        if (response.data.code === 200) {
          clientList.value = response.data.data;
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }

  //get Selectable TagList
  async function getTagList() {
    await Axios.get("tags-selectable")
      .then((response) => {
        if (response.data.code === 200) {
          tagList.value = response.data.data;
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }

  //get Selectable CategoryList
  async function getCategoryList() {
    await Axios.get("categories-selectable")
      .then((response) => {
        if (response.data.code === 200) {
          categoryList.value = response.data.data;
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
    formState.name = "";
    formState.category_id = "";
    formState.team_id = "";
    formState.lead_id = "";
    formState.start_date = "";
    formState.end_date = "";
    formState.extended_date = "";
    formState.client_id = "";
    formState.tags = "";
    formState.description = "";
    formState.status = "";
    formState.operation_point = 70;
    formState.onboarding_point = 30;
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
    formState,
    StatusList,
    categoryList,
    teamList,
    leadList,
    clientList,
    tagList,
    getTeams,
    getLeadList,
    getClientList,
    getTagList,
    getCategoryList,
    resetForm,
    startDateHandler,
    endDateHandler,
    extendedDateHandler,
  };
}
