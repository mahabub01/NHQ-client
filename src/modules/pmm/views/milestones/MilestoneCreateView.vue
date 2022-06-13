<template>
  <div class="container-fluid">
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/milestones"
              >Milestones <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="#">Create</router-link>
          </div>
          <div class="col-md-8">
            <div class="float-right">
              <button type="submit" class="form-button margin-right-10">
                <i class="far fa-save"></i> Submit
              </button>
              <template v-if="route.params.project_id != ''">
                <router-link
                  class="form-button-danger"
                  style="color: white"
                  :to="`/pmm/milestones/${route.params.project_id}`"
                  ><i class="far fa-times-circle"></i> Discard
                </router-link>
              </template>
              <template v-else>
                <router-link
                  class="form-button-danger"
                  style="color: white"
                  to="/pmm/milestones"
                  ><i class="far fa-times-circle"></i> Discard
                </router-link>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="form-design-body">
        <div class="container">
          <h4 class="form-page-title">Create Milestone</h4>
          <!--start row [ project_name, start date ]-->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Project Name<span class="mandatory">*</span></label
              >
              <Select2
                v-model="v$.project_name.$model"
                :options="project_names"
                :settings="{ placeholder: 'Choose', disabled: 'readonly' }"
                @select="projectChangeEvent($event)"
                :class="{ isInvalid: v$.project_name.$error }"
                v-if="route.params.project_id != ''"
              />
              <Select2
                v-else
                v-model="v$.project_name.$model"
                :options="project_names"
                :settings="{ placeholder: 'Choose' }"
                @select="projectChangeEvent($event)"
                :class="{ isInvalid: v$.project_name.$error }"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.project_name.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Start Date</label>
              <datepicker
                @selected="startDateHandler"
                format="dd-MM-yyyy"
                :value="formState.start_date"
              ></datepicker>
            </div>
          </div>
          <!--end row -->

          <!--start row [milestone_name, end_date]-->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Milestone Name<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.milestone_name.$error }"
                v-model.lazy="v$.milestone_name.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.milestone_name.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">End Date</label>
              <datepicker
                @selected="endDateHandler"
                format="dd-MM-yyyy"
                :value="formState.end_date"
              ></datepicker>
            </div>
          </div>
          <!--end row -->

          <!--start row [assign_employee, points] -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">Assign Employee</label>

              <Select2
                v-model="formState.assign_employee"
                :options="assign_employees"
                :settings="{ placeholder: 'Choose' }"
              />
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Extended Date</label>
              <datepicker
                @selected="extendedDateHandler"
                format="dd-MM-yyyy"
                :value="formState.extended_date"
              ></datepicker>
            </div>
          </div>
          <!--end row -->

          <!--start row [follow up, category]-->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">Follow Up</label>

              <Select2
                v-model="formState.follow_up"
                :options="assign_employees"
                :settings="{ placeholder: 'Choose' }"
              />
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Milestone Points</label>
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
                <i class="fas fa-exclamation-triangle"></i> {{ max_ele_error }}
              </p>
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <!--start row -->
              <div class="form-row">
                <label class="form-label">Milestone Category</label>
                <Select2
                  v-model="formState.category"
                  :options="categories"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end row -->

              <div class="form-row">
                <label class="form-label"
                  >Duration<span style="color: silver"
                    >( 0w 0d 0h 0m )</span
                  ></label
                >
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

              <label class="form-label">Description</label>
              <TheCKEditor @sendContent="setDescription" />
            </div>
            <div class="col-md-4 offset-md-2">
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

              <!--start row -->
              <div class="row form-row">
                <div class="col-md-12">
                  <label class="form-label">Choose File</label>
                  <single-file-uploader
                    field_name="create_milestone"
                  ></single-file-uploader>
                </div>
              </div>
              <!--end row -->

              <!--start field -->
              <div class="form-row">
                <multi-image-uploader
                  label="Implementation Snapshot"
                  field_name="milestone_snapshot"
                ></multi-image-uploader>
              </div>
              <!--end field -->
            </div>
          </div>
          <!--end row -->
        </div>
      </div>
    </form>
    <the-spinner :isLoading="loadingSpinner"></the-spinner>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watchEffect } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import Select2 from "vue3-select2-component";
import SingleFileUploader from "../../../core/shared/file-uploader/SingleFileUploader.vue";
import toastr from "toastr";
import { useRouter, useRoute } from "vue-router";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";
import MultiImageUploader from "@/modules/core/shared/MultiImageUploader.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import { useHelper } from "@/composables/helper";
import { useMilestone } from "../../composable/useMilestone";
import Datepicker from "vuejs3-datepicker";

const { compareDate } = useHelper();

const {
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
} = useMilestone();

const router = useRouter();
const route = useRoute();

const loadingSpinner = ref(false);

//use for point
const is_view_point_show = ref("");
function autoPoint(event: any) {
  if (event.target.checked) {
    formState.is_auto_point = "2";
  } else {
    formState.is_auto_point = "3";
  }
}

//max type able value
const max_ele = ref(100);

const rules: any = {
  project_name: { required },
  milestone_name: { required },
};

//set CKEditor Data
const setDescription = (value: any) => {
  formState.description = value;
};

//Load Data form computed onMounted
onMounted(() => {
  getAssignEmployees();
  getCategories();
  getProjectNames();
  getPriorities();
  if (route.params.project_id != "") {
    getWeigttageSum(String(route.params.project_id));
    formState.project_name = String(route.params.project_id);
  }
});

const stopWatchEffect = watchEffect(() => {
  if (project_names.value.length != 0) {
    if (route.params.project_id != "") {
      let loadingProject = project_names.value.filter(
        (item) => item.id == route.params.project_id
      );

      formState.start_date = loadingProject[0].start_date;
      formState.end_date = loadingProject[0].end_date;
      project_exits_dates.start_date = loadingProject[0].start_date;
      project_exits_dates.end_date = loadingProject[0].end_date;
      stopWatchEffect();
    }
  }
});

const project_exits_dates = reactive({
  start_date: "",
  end_date: "",
});

//changing weighttage by project Id
function projectChangeEvent({ id, text, start_date, end_date }) {
  getWeigttageSum(id);
  formState.start_date = start_date;
  formState.end_date = end_date;
  project_exits_dates.start_date = start_date;
  project_exits_dates.end_date = end_date;
}

async function getWeigttageSum(project_id: string) {
  loadingSpinner.value = true;
  await Axios.get("/get-milestone-weightage/" + project_id)
    .then((response) => {
      if (response.data.code === 200) {
        loadingSpinner.value = false;
        let project_weightage_way = response.data.data.is_milestone_point_auto;
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

const duration_error = ref("");
const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();

  //Point validation
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

  //Date validation
  if (
    compareDate(
      { start_date: formState.start_date, end_date: formState.end_date },
      project_exits_dates
    )
  ) {
    toastr.warning(
      "Date validation error. Please check start date, end date and enter valid data."
    );
    return false;
  }

  if (!v$.value.$error) {
    await Axios.post("/milestones", formState)
      .then((response) => {
        if (response.data.code === 200) {
          swal("Success Job!", "Created record successfully!", "success");
          if (route.params.project_id != "") {
            router.push("/pmm/milestones/" + route.params.project_id);
          } else {
            router.push("/pmm/milestones");
          }
        } else {
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
