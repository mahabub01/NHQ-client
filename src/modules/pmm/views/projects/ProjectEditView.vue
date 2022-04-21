<template>
  <div class="container-fluid">
    <!--start Spinner -->
    <the-spinner
      :isSaving="savingSpinner"
      :is-loading="loadingSpinner"
    ></the-spinner>

    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/projects"
              >Project List <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="#">Edit</router-link>
          </div>
          <div class="col-md-8">
            <div class="float-right">
              <button type="submit" class="form-button margin-right-10">
                <i class="far fa-save"></i> Submit
              </button>
              <router-link
                class="form-button-danger"
                style="color: white"
                to="/pmm/projects"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="form-design-body">
        <div class="container">
          <h4 class="form-page-title">Edit Project</h4>
          <div class="row">
            <div class="col-md-4 offset-md-1">
              <!--start field-->
              <div class="form-row">
                <label class="form-label"
                  >Project Name<span class="mandatory">*</span></label
                >
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.name.$error }"
                  placeholder="Title here"
                  v-model.lazy="v$.name.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.name.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end field-->
              <!--start field-->
              <div class="form-row">
                <label class="form-label"
                  >Category Name<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.category_id.$model"
                  :options="categoryList"
                  :settings="{ placeholder: 'Choose' }"
                  :class="{ isInvalid: v$.category_id.$error }"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.category_id.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end field-->

              <!--start field-->
              <div class="form-row">
                <label class="form-label">Project Lead</label>
                <Select2
                  v-model="formState.lead_id"
                  :options="leadList"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field-->

              <!--start field-->
              <div class="form-row">
                <label class="form-label">Project Team/Member</label>
                <Select2
                  v-model="formState.team_id"
                  :options="teamList"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field-->

              <!--start field-->
              <div class="form-row">
                <label class="form-label">Add Client</label>
                <Select2
                  v-model="formState.client_id"
                  :options="clientList"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field-->

              <!--start field-->
              <div class="form-row">
                <label class="form-label">Project Operation Point</label>
                <input
                  type="number"
                  class="form-input"
                  v-model.lazy="formState.operation_point"
                />
              </div>
              <!--end field-->
              <!--start field-->
              <div class="form-row">
                <label class="form-label">Project Onboarding Point</label>
                <input
                  type="number"
                  class="form-input"
                  v-model.lazy="formState.onboarding_point"
                />
              </div>
              <!--end field-->
              <!--start field-->
              <div class="form-row">
                <label class="form-label">Choose File</label>
                <single-file-uploader
                  field_name="create_project"
                ></single-file-uploader>
                <a target="_blank" v-if="getFiles != null" :href="`${getFiles}`"
                  >Download File</a
                >
              </div>
              <!--end field-->
            </div>
            <!--end column-->
            <div class="col-md-4 offset-md-2">
              <!--start field-->
              <div class="form-row">
                <label class="form-label">Tags</label>
                <Select2
                  v-model="formState.tags"
                  :options="tagList"
                  :settings="{ placeholder: 'Choose', multiple: true }"
                />
              </div>
              <!--end field-->

              <!--start field-->
              <div class="form-row">
                <label class="form-label">Start Date</label>
                <input
                  type="date"
                  class="form-input"
                  v-model.lazy="formState.start_date"
                />
              </div>
              <!--end field-->
              <!--start field-->
              <div class="form-row">
                <label class="form-label">End Date</label>
                <input
                  type="date"
                  class="form-input"
                  v-model.lazy="formState.end_date"
                />
              </div>
              <!--end field-->
              <!--start field-->
              <div class="form-row">
                <label class="form-label">Extended Date</label>
                <input
                  type="date"
                  class="form-input"
                  v-model.lazy="formState.extended_date"
                />
              </div>
              <!--end field-->
              <!--start field-->
              <div class="form-row">
                <label class="form-label">Status</label>
                <Select2
                  v-model="formState.status"
                  :options="StatusList"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field-->

              <!--start field-->
              <div class="form-row">
                <label class="form-label">Description</label>
                <TheCKEditor
                  @sendContent="setDescription"
                  :content="formState.description"
                  v-if="loadCKEditor"
                />
              </div>
              <!--end field-->
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, onMounted, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import Select2 from "vue3-select2-component";
import SingleFileUploader from "../../../core/shared/file-uploader/SingleFileUploader.vue";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";
import toastr from "toastr";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

//use for saving preloader
let savingSpinner = ref(false);
let loadingSpinner = ref(false);

//use route
const route = useRoute();
const router = useRouter();

// Load CkEditor Data
const loadCKEditor = computed(() => {
  return store.state.modalModule.loadCKEditor;
});

//create store
const store = useStore();

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
  onboarding_point: "",
  operation_point: "",
});

const rules: any = {
  name: { required },
  category_id: { required },
};

const emit = defineEmits(["select"]);

//set CKEditor Data
const setDescription = (value: any) => {
  formState.description = value;
};

//Status List for Status Select
const StatusList = reactive([
  { id: 0, text: "In Progress" },
  { id: 1, text: "Completed" },
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

//Load Data form computed onMounted
onMounted(() => {
  getTeams();
  getLeadList();
  getClientList();
  getTagList();
  getCategoryList();
  loadSingleData();
  store.commit("modalModule/LOAD_CKEDITOR_MODAL", false);
});

//get Files
const getFiles = ref(null);

//Load Single Data
async function loadSingleData() {
  loadingSpinner.value = true;
  await Axios.get("/projects/projects/" + route.params.id).then((response) => {
    loadingSpinner.value = false;
    if (response.data.code === 200) {
      console.log(response);
      formState.name = response.data.data[0].project_name;
      formState.category_id = response.data.data[0].pmm_category_id;
      formState.team_id = response.data.data[0].pmm_team_id;
      formState.lead_id = response.data.data[0].pmm_project_lead_id;
      formState.client_id = response.data.data[0].pmm_client_id;
      formState.tags = response.data.data[0].tags;
      formState.description = response.data.data[0].description;
      formState.status = response.data.data[0].status;
      formState.onboarding_point = response.data.data[0].onboarding_point;
      formState.operation_point = response.data.data[0].operation_point;
      getFiles.value = response.data.data[0].files;
      formState.start_date = response.data.data[0].start_date;
      formState.end_date = response.data.data[0].end_date;
      formState.extended_date = response.data.data[0].extended_date;
      store.commit("modalModule/LOAD_CKEDITOR_MODAL", true);
    } else {
      toastr.error(response.data.message);
    }
  });
}

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
const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();

  if (!v$.value.$error) {
    savingSpinner.value = true;
    await Axios.put("/projects/projects/" + route.params.id, formState)
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          resetForm();
          //Stop Saving Spinner
          savingSpinner.value = false;
          swal("Success Job!", "Updated record successfully!", "success");
          router.push("/pmm/projects");
        } else {
          savingSpinner.value = false;
          //Show Error message
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
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
  formState.onboarding_point = "";
  formState.operation_point = "";
  v$.value.$reset();
}
</script>

<style scoped></style>
