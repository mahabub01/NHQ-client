<template>
  <div class="container-fluid">
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link
              v-if="route.params.submilestone_id != ''"
              :to="`/pmm/tasks/${route.params.submilestone_id}`"
              >Task List <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link v-else to="/pmm/tasks"
              >Task List <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="#">Edit</router-link>
          </div>
          <div class="col-md-8">
            <div class="float-right">
              <button type="submit" class="form-button margin-right-10">
                <i class="far fa-save"></i> Submit
              </button>
              <router-link
                v-if="route.params.submilestone_id != ''"
                class="form-button-danger"
                style="color: white"
                :to="`/pmm/tasks/${route.params.submilestone_id}`"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
              <router-link
                v-else
                class="form-button-danger"
                style="color: white"
                to="/pmm/tasks"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="form-design-body">
        <div class="container">
          <h4 class="form-page-title">Edit Tasks</h4>
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
                  :settings="{ placeholder: 'Choose', disabled: 'readonly' }"
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
                  :settings="{ placeholder: 'Choose', disabled: 'readonly' }"
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
                  >Sub Milestone<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.submilestone_id.$model"
                  :options="submileStoneSelectable"
                  :settings="{ placeholder: 'Choose', disabled: 'readonly' }"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.submilestone_id.$errors"
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
                <label class="form-label">Description</label>
                <TheCKEditor
                  @sendContent="setDescription"
                  :content="formState.project_description"
                  v-if="loadCKEditor"
                />
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
                <label class="form-label">Task Point</label>
                <template v-if="is_submilestone_point_auto == '3'">
                  <input
                    type="number"
                    class="form-input"
                    v-model.lazy="formState.points"
                  />
                </template>
                <template v-else>
                  <input
                    type="number"
                    class="form-input"
                    v-model.lazy="formState.points"
                    readonly
                  />
                </template>

                <span style="color: silver; font-size: 11px"
                  >Max editable weightage : {{ max_ele }}</span
                >

                <p class="error-mgs" v-if="max_ele_error != ''">
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ max_ele_error }}
                </p>
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
                <p class="error-mgs" v-if="duration_error != ''">
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ duration_error }}
                </p>
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Choose File</label>
                <single-file-uploader
                  field_name="create_task"
                ></single-file-uploader>
                <a target="_blank" v-if="getFiles != ''" :href="`${getFiles}`"
                  >Download File</a
                >
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <multi-image-uploader
                  label="Implementation Snapshot"
                  field_name="task_snapshot"
                ></multi-image-uploader>
                <template v-if="snapshots.length > 0">
                  <a
                    v-for="(snapshot, idx) in snapshots"
                    :key="idx"
                    target="_blank"
                    :href="`${snapshot}`"
                    style="
                      margin-right: 20px;
                      display: inline-block;
                      margin-top: 10px;
                    "
                    >Download File</a
                  >
                </template>
              </div>
              <!--end field -->
            </div>
          </div>
        </div>
      </div>
      <!--start Spinner -->
      <the-spinner
        :isSaving="savingSpinner"
        :isLoading="loadingSpinner"
      ></the-spinner>
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
import { useRouter, useRoute } from "vue-router";
import MultiImageUploader from "@/modules/core/shared/MultiImageUploader.vue";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();

// Load CkEditor Data
const loadCKEditor = computed(() => {
  return store.state.modalModule.loadCKEditor;
});

const user_id = ref(localStorage.getItem("user_id"));
const flag = ref(localStorage.getItem("flag"));

const is_submilestone_point_auto = ref("");

//for show max element value
const max_ele_error = ref("");
const max_ele = ref(100); // use for set max value

const getFiles = ref(null);
const snapshots = ref([]);
const formState = reactive({
  project_id: "",
  task_name: "",
  milestone_id: "",
  submilestone_id: "",
  team_member_id: "",
  task_status: "",
  project_description: "",
  start_date: "",
  end_date: "",
  extended_date: "",
  points: 0,
  duration: "",
  token: localStorage.getItem("token"),
  user_id: user_id.value,
  is_auto_point: "",
  priority_id: "",
});

const rules: any = {
  project_id: { required },
  task_name: { required },
  milestone_id: { required },
  submilestone_id: { required },
};

const setDescription = (value: any) => {
  formState.project_description = value;
};

//projects selectable
const projectsSelectable = ref([]);
const milestoneSelectable = ref([]);
const teamSelectable = ref([]); //Team Members
const submileStoneSelectable = ref([]);
//show Priority Selectable Data
const prioritySelectable = ref([]);

const taskStatusSelectable = reactive([
  { id: "1", text: "To Do" },
  { id: "3", text: "In Progress" },
  { id: "4", text: "Dependency" },
  { id: "2", text: "Completed" },
]);
const loadingSpinner = ref(false);
//use for saving preloader
let savingSpinner = ref(false);

const old_weightage = ref(0);

//Load Data form computed onMounted
onMounted(() => {
  getProjects();
  getMilestones();
  getSubmilestones();
  getTeamMembers();
  loadEditData();
  getPriorities();
});

async function loadEditData() {
  loadingSpinner.value = true;
  await Axios.get("/tasks-select-for-edit/" + route.params.id)
    .then((response) => {
      if (response.data.code === 200) {
        loadingSpinner.value = false;
        formState.milestone_id = String(response.data.data.milestone_id);
        formState.project_id = String(response.data.data.project_id);
        formState.submilestone_id = String(response.data.data.submilestone_id);
        is_submilestone_point_auto.value = String(
          response.data.data.is_task_point_auto
        );
        formState.points = response.data.data.weightage;
        formState.task_name = response.data.data.task_name;
        formState.start_date = response.data.data.start_date;
        formState.end_date = response.data.data.end_date;
        formState.extended_date = response.data.data.extended_date;
        formState.task_status = response.data.data.task_status;
        formState.duration = response.data.data.duration;
        formState.team_member_id = response.data.data.team_member_id;
        formState.priority_id = String(response.data.data.priority_id);
        getFiles.value = response.data.data.file;
        snapshots.value = response.data.data.task_snapshots;
        old_weightage.value = response.data.data.weightage;
        store.commit("modalModule/LOAD_CKEDITOR_MODAL", true);
        getWeigttageSum(String(response.data.data.submilestone_id));
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

// load task Weighttage Sum
async function getWeigttageSum(submilestone_id: string) {
  loadingSpinner.value = true;
  await Axios.get("/get-tasks-weightage/" + submilestone_id)
    .then((response) => {
      if (response.data.code === 200) {
        loadingSpinner.value = false;
        let project_weightage_way = response.data.data.is_task_point_auto;
        if (project_weightage_way == "3") {
          formState.is_auto_point = "3";
          max_ele.value = 100 - response.data.data.weightage;
        }
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
  await Axios.get(
    "/milestones-selectable?user_id=" + user_id.value + "&flag=" + flag.value
  )
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
async function getSubmilestones() {
  await Axios.get(
    "/submilestones-selectable?user_id=" + user_id.value + "&flag=" + flag.value
  )
    .then((response) => {
      if (response.data.code === 200) {
        submileStoneSelectable.value = response.data.data;
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
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

const v$ = useVuelidate(rules, formState);

const duration_error = ref("");

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  //old_weightage
  if (formState.points > old_weightage.value && max_ele.value == 0) {
    max_ele_error.value = "It's not posible. Your point is over total point.";
    return false;
  } else if (formState.points == 0 && formState.is_auto_point == "3") {
    max_ele_error.value = "It's not posible. Your point is over total point.";
    return false;
  } else {
    max_ele_error.value = "";
  }

  //Validation for Duration
  //Validation for Duration
  if (formState.duration != "") {
    let duration_keyword_validation = ["w", "d", "h", "m"];
    let ex = formState.duration.split(" ");
    let duration_vl_error = 0;
    ex.forEach((item) => {
      let last_character = item.charAt(item.length - 1);
      if (!duration_keyword_validation.includes(last_character)) {
        duration_vl_error++;
        duration_error.value =
          "Duration insert format is not valid. Insert format example: 0w 0d 0h 0m";
      }
    });
    if (duration_vl_error != 0) {
      return false;
    }
  }
  //end  Validation for Duration

  if (!v$.value.$error) {
    savingSpinner.value = true;
    await Axios.put("tasks/" + route.params.id, formState)
      .then((response) => {
        if (response.data.code === 200) {
          //Stop Saving Spinner
          savingSpinner.value = false;
          swal("Success Job!", "Updated task Successfully!", "success");
          router.push({
            name: "tasks",
            params: { submilestone_id: route.params.submilestone_id },
          });
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
</script>

<style scoped></style>
