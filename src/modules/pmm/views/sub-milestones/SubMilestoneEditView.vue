<template>
  <div class="container-fluid">
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link
              v-if="route.params.milestone_id != ''"
              :to="`/pmm/sub-milestones/${route.params.milestone_id}`"
              >Sub Milestone <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link v-else to="/pmm/sub-milestones"
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
                v-if="route.params.milestone_id != ''"
                class="form-button-danger"
                style="color: white"
                :to="`/pmm/sub-milestones/${route.params.milestone_id}`"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
              <router-link
                v-else
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
                <label class="form-label">Assignee</label>
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
                <label class="form-label">Sub Milestone Point</label>
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
                <label class="form-label"
                  >Duration
                  <span style="color: silver">( 0w 0d 0h 0m )</span></label
                >
                <input
                  type="text"
                  class="form-input"
                  v-model="formState.duration"
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
                  field_name="create_submilestone"
                ></single-file-uploader>
                <a target="_blank" v-if="getFiles != null" :href="`${getFiles}`"
                  >Download File</a
                >
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <multi-image-uploader
                  label="Implementation Snapshot"
                  field_name="submilestone_snapshot"
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
import MultiImageUploader from "@/modules/core/shared/MultiImageUploader.vue";

const store = useStore();
const router = useRouter();

const route = useRoute();

// Load CkEditor Data
const loadCKEditor = computed(() => {
  return store.state.modalModule.loadCKEditor;
});

//Data Loading Spinner
let loadingSpinner = ref(false);

//for show max element value
const max_ele_error = ref("");
const max_ele = ref(100); // use for set max value

//use for point
const is_view_point_show = ref("");

const user_id = ref(localStorage.getItem("user_id"));
const flag = ref(localStorage.getItem("flag"));

const is_submilestone_point_auto = ref("");

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
  points: 0,
  priority_id: "",
  duration: "",
  token: store.state.currentUser.token,
  is_auto_point: "2",
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
  { id: "1", text: "To Do" },
  { id: "3", text: "In Progress" },
  { id: "2", text: "Completed" },
]);

//use for saving preloader
let savingSpinner = ref(false);

let getFiles = ref("");
const snapshots = ref([]);

const old_weightage = ref(0);

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

        is_submilestone_point_auto.value = String(
          response.data.data.is_sub_milestone_point_auto
        );

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
        formState.points = response.data.data.weightage;
        formState.priority_id = String(response.data.data.priority_id);
        formState.duration = response.data.data.duration;
        getFiles.value = response.data.data.files;
        snapshots.value = response.data.data.snapshotFiles;
        old_weightage.value = response.data.data.weightage;
        store.commit("modalModule/LOAD_CKEDITOR_MODAL", true);
        getWeigttageSum(String(response.data.data.milestone_id));
      }
      loadingSpinner.value = false;
    }
  );
});

async function getWeigttageSum(milestone_id: string) {
  loadingSpinner.value = true;
  await Axios.get("/get-submilestone-weightage/" + milestone_id)
    .then((response) => {
      if (response.data.code === 200) {
        loadingSpinner.value = false;
        let project_weightage_way =
          response.data.data.is_sub_milestone_point_auto;
        if (project_weightage_way == "3") {
          formState.is_auto_point = "3";
          max_ele.value = 100 - response.data.data.weightage;
        }
        // formState.points = response.data.data.weightage;
        // is_view_point_show.value = response.data.data.is_milestone_point_auto;
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

const duration_error = ref("");

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();

  if (formState.points > max_ele.value) {
    max_ele_error.value = "It's not posible. Your point is over total point.";
    return false;
  } else if (formState.points == 0 && formState.is_auto_point == "3") {
    max_ele_error.value = "It's not posible. Your point is over total point.";
    return false;
  } else {
    max_ele_error.value = "";
  }

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
          if (route.params.milestone_id != "") {
            router.push("/pmm/sub-milestones/" + route.params.milestone_id);
          } else {
            router.push("/pmm/sub-milestones");
          }
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
