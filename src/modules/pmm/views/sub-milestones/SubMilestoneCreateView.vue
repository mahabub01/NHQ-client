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
            <router-link to="#">Create</router-link>
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
          <h4 class="form-page-title">Create Sub Milestone</h4>
          <div class="row">
            <div class="col-md-4 offset-md-1">
              <!--start field -->
              <div class="form-row">
                <label class="form-label"
                  >Project Name<span class="mandatory">*</span></label
                >
                <template v-if="route.params.milestone_id != ''">
                  <Select2
                    v-model="v$.project_id.$model"
                    :options="projectsSelectable"
                    :settings="{ placeholder: 'Choose', disabled: 'readonly' }"
                    @select="projectChangeEvent($event)"
                  />
                </template>
                <template v-else>
                  <Select2
                    v-model="v$.project_id.$model"
                    :options="projectsSelectable"
                    :settings="{ placeholder: 'Choose' }"
                    @select="projectChangeEvent($event)"
                  />
                </template>

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
                <template v-if="route.params.milestone_id != ''">
                  <Select2
                    v-model="v$.milestone_id.$model"
                    :options="milestoneSelectable"
                    :settings="{ placeholder: 'Choose', disabled: 'readonly' }"
                    @select="milestoneChangeEvent($event)"
                  />
                </template>
                <template v-else>
                  <Select2
                    v-model="v$.milestone_id.$model"
                    :options="milestoneSelectable"
                    :settings="{ placeholder: 'Choose' }"
                    @select="milestoneChangeEvent($event)"
                  />
                </template>

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
                <label class="form-label">Sub Milestone Point</label>
                <span
                  v-if="
                    formState.is_auto_point == '2' ||
                    formState.is_auto_point == '1'
                  "
                >
                  <input
                    type="number"
                    class="form-input"
                    v-model.lazy="formState.points"
                    readonly
                  />
                </span>
                <span v-else>
                  <input
                    type="number"
                    class="form-input"
                    v-model.lazy="formState.points"
                  />
                </span>
                <label
                  v-if="is_view_point_show == 'yes'"
                  class="form-label"
                  style="margin-top: 10px"
                  ><input type="checkbox" @change="autoPoint($event)" checked />
                  Auto set point</label
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
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <multi-image-uploader
                  label="Implementation Snapshot"
                  field_name="submilestone_snapshot"
                ></multi-image-uploader>
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
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import MultiImageUploader from "@/modules/core/shared/MultiImageUploader.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const user_id = ref(localStorage.getItem("user_id"));
const flag = ref(localStorage.getItem("flag"));

const loadingSpinner = ref(false);

//for show max element value
const max_ele_error = ref("");
const max_ele = ref(100); // use for set max value

//use for point
const is_view_point_show = ref("");
function autoPoint(event: any) {
  if (event.target.checked) {
    formState.is_auto_point = "2";
  } else {
    formState.is_auto_point = "3";
  }
}

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

const rules: any = {
  project_id: { required },
  submilestone_name: { required },
  milestone_id: { required },
};

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

//Load Data form computed onMounted
onMounted(() => {
  getProjects();
  // getMilestones();
  getCategories();
  getPriorities();
  getTeamMembers();
  if (route.params.milestone_id != "") {
    formState.milestone_id = String(route.params.milestone_id);
    getMilestonesById(route.params.milestone_id);
    getWeigttageSum(String(route.params.milestone_id));
  }
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

//load milestone by project
function projectChangeEvent({ id, text }) {
  getMilestones(id);
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

//changing weighttage by project Id
function milestoneChangeEvent({ id, text }) {
  getWeigttageSum(id);
}

async function getWeigttageSum(milestone_id: string) {
  loadingSpinner.value = true;
  await Axios.get("/get-submilestone-weightage/" + milestone_id)
    .then((response) => {
      if (response.data.code === 200) {
        loadingSpinner.value = false;
        let project_weightage_way =
          response.data.data.is_sub_milestone_point_auto;
        if (project_weightage_way == "1") {
          formState.points = 0;
          formState.is_auto_point = "2";
          is_view_point_show.value = "yes";
        } else if (project_weightage_way == "2") {
          formState.points = 0;
          formState.is_auto_point = "2";
          is_view_point_show.value = "no";
        } else if (project_weightage_way == "3") {
          formState.points = 100 - response.data.data.weightage;
          is_view_point_show.value = "no";
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

  if (formState.points > max_ele.value) {
    max_ele_error.value = "It's not posible. Your point is over total point.";
    return false;
  } else if (formState.points == 0 && formState.is_auto_point == "3") {
    max_ele_error.value = "It's not posible. Your point is over total point.";
    return false;
  } else {
    max_ele_error.value = "";
  }

  if (!v$.value.$error) {
    savingSpinner.value = true;
    await Axios.post("submilestones", formState)
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          resetForm();
          //Stop Saving Spinner
          savingSpinner.value = false;
          swal(
            "Success Job!",
            "Created Sub Milestone Successfully!",
            "success"
          );
          if (route.params.milestone_id == "") {
            router.push("/pmm/sub-milestones");
          } else {
            router.push("/pmm/sub-milestones/" + route.params.milestone_id);
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
