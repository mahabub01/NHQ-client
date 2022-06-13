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
                <TheCKEditor @sendContent="setDescription" />
              </div>
              <!--end field -->
            </div>
            <div class="col-md-4 offset-md-2">
              <!--start field -->
              <div class="form-row">
                <label class="form-label">Start Date</label>
                <datepicker
                  @selected="startDateHandler"
                  format="dd-MM-yyyy"
                  :value="formState.start_date"
                ></datepicker>
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">End Date</label>
                <datepicker
                  @selected="endDateHandler"
                  format="dd-MM-yyyy"
                  :value="formState.end_date"
                ></datepicker>
              </div>
              <!--end field -->

              <!--start field -->
              <div class="form-row">
                <label class="form-label">Extended Date</label>
                <datepicker :value="formState.extended_date"></datepicker>
                <datepicker
                  @selected="extendedDateHandler"
                  format="dd-MM-yyyy"
                  :value="formState.extended_date"
                ></datepicker>
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
import MultiImageUploader from "@/modules/core/shared/MultiImageUploader.vue";
import Datepicker from "vuejs3-datepicker";
import { useSubmilestone } from "../../composable/useSubmilestone";

const router = useRouter();
const route = useRoute();

const loadingSpinner = ref(false);
let savingSpinner = ref(false);
//for show max element value

const {
  taskStatusSelectable,
  max_ele,
  max_ele_error,
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
  projectsSelectable,
  milestoneSelectable,
  teamSelectable,
  followupSelectable,
  taskCategorySelectable,
  prioritySelectable,
  getMilestonesById,
  getTeamMembers,
  duration_error,
  autoPoint,
  getMilestones,
} = useSubmilestone();

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

//changing weighttage by project Id
function milestoneChangeEvent({ id, text }) {
  getWeigttageSum(id);
}
const rules: any = {
  project_id: { required },
  submilestone_name: { required },
  milestone_id: { required },
};

const setDescription = (value: any) => {
  formState.description = value;
};

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
</script>

<style scoped></style>
