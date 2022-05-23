<template>
  <div class="container-fluid">
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/sub-milestones"
              >Sub Milestone <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="/pmm/sub-milestones/create">Create</router-link>
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
          <h4 class="form-page-title">Create Sub Milestone</h4>
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
                  >Task Name<span class="mandatory">*</span></label
                >
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.task_name.$error }"
                  v-model.lazy="v$.task_name.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.task_name.$errors"
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
                <label class="form-label">Task Category</label>
                <Select2
                  v-model="formState.task_category_id"
                  :options="taskCategorySelectable"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Project Description</label>
                <TheCKEditor @sendContent="setDescription" />
              </div>
              <!--end field -->
            </div>
            <div class="col-md-4 offset-md-2">
              <!--start field -->
              <div class="form-row">
                <label class="form-label">Start Date</label>
                <input
                  type="date"
                  class="form-input"
                  v-model.lazy="formState.start_date"
                />
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">End Date</label>
                <input
                  type="date"
                  class="form-input"
                  v-model.lazy="formState.end_date"
                />
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Extended Date</label>
                <input
                  type="date"
                  class="form-input"
                  v-model.lazy="formState.extended_date"
                />
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Task Point</label>
                <input
                  type="number"
                  class="form-input"
                  v-model.lazy="formState.task_point"
                />
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Task Status</label>
                <Select2
                  v-model="formState.task_status"
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
                  field_name="create_task"
                ></single-file-uploader>
              </div>
              <!--end field -->
            </div>
          </div>
        </div>
      </div>
      <!--start Spinner -->
      <the-spinner :isSaving="savingSpinner"></the-spinner>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import Select2 from "vue3-select2-component";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";
import SingleFileUploader from "../../../core/shared/file-uploader/SingleFileUploader.vue";
import toastr from "toastr";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formState = reactive({
  project_id: "",
  task_name: "",
  milestone_id: "",
  team_member_id: "",
  task_status: "",
  followup_id: "",
  task_category_id: "",
  project_description: "",
  start_date: "",
  end_date: "",
  extended_date: "",
  task_point: 0,
  priority_id: "",
  duration: "",
});

const rules: any = {
  project_id: { required },
  task_name: { required },
  milestone_id: { required },
};

const setDescription = (value: any) => {
  formState.project_description = value;
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

//Load Data form computed onMounted
onMounted(() => {
  getProjects();
  getMilestones();
  getCategories();
  getPriorities();
  getTeamMembers();
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
  await Axios.get("/task-category-selectable")
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
    await Axios.post("tasks", formState)
      .then((response) => {
        if (response.data.code === 200) {
          resetForm();
          //Stop Saving Spinner
          savingSpinner.value = false;
          swal(
            "Success Job!",
            "Created Sub Milestone Successfully!",
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
