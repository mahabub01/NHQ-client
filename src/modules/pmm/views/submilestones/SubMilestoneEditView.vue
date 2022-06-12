<template>
  <div class="container-fluid">
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/sub-milestones"
              >Sub Milestone <i class="fas fa-chevron-right"></i
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
                to="/pmm/sub-milestones"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="form-design-body">
        <div class="container">
          <h4 class="form-page-title">Edit Sub Milestone</h4>
          <div class="row">
            <div class="col-md-4 offset-md-1">
              <!--start field -->
              <div class="form-row">
                <label class="form-label"
                  >Project Name<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.project_id.$model"
                  :options="projectsSelectable"
                  :settings="{ placeholder: 'Choose' }"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.project_id.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label"
                  >Milestone<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.milestone_id.$model"
                  :options="milestoneSelectable"
                  :settings="{ placeholder: 'Choose' }"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.milestone_id.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label"
                  >Sub Milestone Name<span class="mandatory">*</span></label
                >
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.submilestone_name.$error }"
                  v-model.lazy="v$.submilestone_name.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.submilestone_name.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Assign Team Member</label>
                <Select2
                  v-model="formState.team_member_id"
                  :options="teamSelectable"
                  :settings="{ placeholder: 'Choose', multiple: true }"
                />
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Follow Up</label>
                <Select2
                  v-model="formState.followup_id"
                  :options="followupSelectable"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Category</label>
                <Select2
                  v-model="formState.submilestone_category_id"
                  :options="taskCategorySelectable"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Description</label>
                <TheCKEditor
                  @sendContent="setDescription"
                  :content="formState.description"
                  v-if="loadCKEditor"
                />
              </div>
              <!--end field -->
            </div>
            <div class="col-md-4 offset-md-2">
              <!--start field -->
              <div class="form-row">
                <label class="form-label">Start Date</label>
                <datepicker :value="formState.start_date"></datepicker>
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">End Date</label>
                <datepicker :value="formState.end_date"></datepicker>
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Extended Date</label>
                <datepicker :value="formState.extended_date"></datepicker>
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Sub Milestone Point</label>
                <input
                  type="number"
                  class="form-input"
                  v-model.lazy="formState.submilestone_point"
                />
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Status</label>
                <Select2
                  v-model="formState.status"
                  :options="taskStatusSelectable"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Priority</label>
                <Select2
                  v-model="formState.priority_id"
                  :options="prioritySelectable"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Duration</label>
                <input
                  type="text"
                  class="form-input"
                  v-model.lazy="formState.duration"
                />
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Choose File</label>
                <single-file-uploader
                  field_name="create_submilestone"
                ></single-file-uploader>
                <a target="_blank" v-if="getFiles != null" :href="`${getFiles}`"
                  >Download File</a
                >
              </div>
              <!--end field -->
            </div>
          </div>
        </div>
      </div>
      <!--start Spinner -->
      <the-spinner
        :isSaving="savingSpinner"
        :is-loading="loadingSpinner"
      ></the-spinner>
      <!--start Spinner -->
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import Select2 from "vue3-select2-component";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";
import SingleFileUploader from "../../../core/shared/file-uploader/SingleFileUploader.vue";
import toastr from "toastr";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Datepicker from "vuejs3-datepicker";

const store = useStore();
const router = useRouter();

const route = useRoute();

// Load CkEditor Data
const loadCKEditor = computed(() => {
  return store.state.modalModule.loadCKEditor;
});

//Data Loading Spinner
let loadingSpinner = ref(false);

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
  submilestone_point: 0,
  priority_id: "",
  duration: "",
  token: store.state.currentUser.token,
});

const rules: any = {
  project_id: { required },
  submilestone_name: { required },
  milestone_id: { required },
};

//set CKEditor Data
const setDescription = (value: any) => {
  formState.description = value;
};

//projects selectable
const projectsSelectable = ref([]);
const milestoneSelectable = ref([]);
const teamSelectable = ref([]); //Team Members
const followupSelectable = ref([]);
const taskCategorySelectable = ref([]);
const prioritySelectable = ref([]);
const taskStatusSelectable = reactive([
  { id: "1", text: "In Progress" },
  { id: "2", text: "Completed" },
]);

//use for saving preloader
let savingSpinner = ref(false);

let getFiles = ref("");

//Load Data form computed onMounted
onMounted(async () => {
  getProjects();
  getMilestones();
  getCategories();
  getPriorities();
  getTeamMembers();

  loadingSpinner.value = true;
  await Axios.get("/submilestones-single/" + route.params.id).then(
    (response) => {
      if (response.data.data != "") {
        formState.project_id = String(response.data.data.project_id);
        formState.submilestone_name = response.data.data.submilestone_name;
        formState.milestone_id = String(response.data.data.milestone_id);
        formState.team_member_id = response.data.data.team_member_id;
        formState.status = String(response.data.data.status);
        formState.followup_id = String(response.data.data.followup_id);
        formState.submilestone_category_id = String(
          response.data.data.submilestone_category_id
        );
        formState.description = response.data.data.description;
        formState.start_date = response.data.data.start_date;
        formState.end_date = response.data.data.end_date;
        formState.extended_date = response.data.data.extended_date;
        formState.submilestone_point = response.data.data.submilestone_point;
        formState.priority_id = String(response.data.data.priority_id);
        formState.duration = response.data.data.duration;
        getFiles.value = response.data.data.files;
        store.commit("modalModule/LOAD_CKEDITOR_MODAL", true);
      }
      loadingSpinner.value = false;
    }
  );
});

//get projects for Selectable
async function getProjects() {
  await Axios.get("/project-selectable")
    .then((response) => {
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

//get milestones for Selectable
async function getMilestones() {
  await Axios.get("/milestones-selectable")
    .then((response) => {
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

//get categories for Selectable
async function getCategories() {
  await Axios.get("/submilestone-categories-selectable")
    .then((response) => {
      if (response.data.code === 200) {
        taskCategorySelectable.value = response.data.data;
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

const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    savingSpinner.value = true;
    await Axios.put("submilestones/" + route.params.id, formState)
      .then((response) => {
        if (response.data.code === 200) {
          resetForm();
          //Stop Saving Spinner
          savingSpinner.value = false;
          swal(
            "Success Job!",
            "Updated Sub Milestone Successfully!",
            "success"
          );
          router.push("/pmm/sub-milestones");
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
  // state.title = "";
  // state.description = "";
  // v$.value.$reset();
}
</script>

<style scoped></style>
