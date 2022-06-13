<template>
  <div class="container-fluid">
    <!--start Spinner -->
    <the-spinner :is-loading="loadingSpinner"></the-spinner>

    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/milestones"
              >Milestones <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="#">Edit</router-link>
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
          <h4 class="form-page-title">Edit Milestone</h4>

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
              <!-- <datepicker :value="formState.start_date"></datepicker> -->
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
              <!-- <datepicker :value="formState.end_date"></datepicker> -->
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
              <!-- <datepicker :value="formState.extended_date"></datepicker> -->
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
              <template v-if="is_milestone_point_auto == '3'">
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
                <label class="form-label">Duration</label>
                <input
                  type="text"
                  class="form-input"
                  v-model.lazy="formState.duration"
                />
              </div>

              <label class="form-label">Description</label>
              <TheCKEditor
                @sendContent="setDescription"
                :content="formState.description"
                v-if="loadCKEditor"
              />
            </div>
            <div class="col-md-4 offset-md-2">
              <!--start row -->
              <div class="row form-row">
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

                <div class="row form-row">
                  <div class="col-md-12">
                    <label class="form-label">Choose File</label>
                    <single-file-uploader
                      field_name="create_milestone"
                    ></single-file-uploader>
                    <a
                      target="_blank"
                      v-if="getFiles != null"
                      :href="`${getFiles}`"
                      >Download File</a
                    >
                  </div>
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
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, onMounted, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Axios from "@/http-common";
import toastr from "toastr";
import swal from "sweetalert";
import Datepicker from "vuejs3-datepicker";
import Select2 from "vue3-select2-component";
import MultiImageUploader from "@/modules/core/shared/MultiImageUploader.vue";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import SingleFileUploader from "../../../core/shared/file-uploader/SingleFileUploader.vue";
import { useMilestone } from "../../composable/useMilestone";

//Data Loading Spinner
let loadingSpinner = ref(false);

//use route
const route = useRoute();
const router = useRouter();

//create store
const store = useStore();

// Load CkEditor Data
const loadCKEditor = computed(() => {
  return store.state.modalModule.loadCKEditor;
});

//set CKEditor Data
const setDescription = (value: any) => {
  formState.description = value;
};

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

const rules: any = {
  project_name: { required },
  milestone_name: { required },
};

const v$ = useVuelidate(rules, formState);
const emit = defineEmits(["select"]);

//Load Data form computed onMounted
onMounted(() => {
  getAssignEmployees();
  getCategories();
  getProjectNames();
  getPriorities();
  loadEditableData();
});

//get Files
const getFiles = ref(null);

async function loadEditableData() {
  loadingSpinner.value = true;
  await Axios.get("/milestones/" + route.params.id).then((response) => {
    if (response.data.data != "") {
      formState.project_name = String(response.data.data.project_name);
      is_milestone_point_auto.value = String(
        response.data.data.is_milestone_point_auto
      );
      formState.milestone_name = response.data.data.milestone_name;
      formState.assign_employee = response.data.data.assign_employee;
      formState.points = Number(response.data.data.points);
      formState.follow_up = response.data.data.follow_up;
      formState.category = response.data.data.category;
      formState.start_date = response.data.data.start_date;
      formState.end_date = response.data.data.end_date;
      formState.extended_date = response.data.data.extended_date;
      formState.description = response.data.data.description;
      formState.duration = response.data.data.duration;
      getFiles.value = response.data.data.file_name;
      store.commit("modalModule/LOAD_CKEDITOR_MODAL", true);
      old_weightage.value = response.data.data.points;
      formState.is_auto_point = response.data.data.is_milestone_point_auto;
      formState.priority_id = String(response.data.data.priority_id);
      formState.status = String(response.data.data.status);
    }
    loadingSpinner.value = false;
  });
}

//Updated Data
async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (Number(formState.points) < 0) {
    max_ele_error.value =
      "It's not posible. Negative value is possible for Weightage.";
  } else if (Number(formState.points) > Number(old_weightage.value)) {
    max_ele_error.value = "It's not posible. Your point is over total point.";
    return false;
  } else if (formState.points == 0 && formState.is_auto_point == "3") {
    max_ele_error.value = "It's not posible. Your point is over total point.";
    return false;
  } else {
    max_ele_error.value = "";
  }

  if (!v$.value.$error) {
    await Axios.put("milestones/" + route.params.id, formState)
      .then((response) => {
        if (response.data.code === 200) {
          resetForm();
          swal(
            "Success Job!",
            "Your milestones update successfully!",
            "success"
          );
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
