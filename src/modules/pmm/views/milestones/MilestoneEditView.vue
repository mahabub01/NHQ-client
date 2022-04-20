<template>
  <div class="container-fluid">
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
              <router-link
                class="form-button-danger"
                style="color: white"
                to="/pmm/milestones"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
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
                :settings="{ placeholder: 'Choose' }"
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
              <label class="form-label"
                >Start Date<span class="mandatory">*</span></label
              >
              <input
                type="date"
                class="form-input"
                :class="{ isInvalid: v$.start_date.$error }"
                placeholder="Start Date Here"
                v-model.lazy="v$.start_date.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.start_date.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
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
                placeholder="Milestone Name here"
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
              <label class="form-label"
                >End Date<span class="mandatory">*</span></label
              >
              <input
                type="date"
                class="form-input"
                :class="{ isInvalid: v$.end_date.$error }"
                placeholder="End Date Here"
                v-model.lazy="v$.end_date.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.end_date.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
          </div>
          <!--end row -->

          <!--start row [assign_employee, points] -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Assign Employee<span class="mandatory">*</span></label
              >

              <Select2
                v-model="v$.assign_employee.$model"
                :options="assign_employees"
                :settings="{ placeholder: 'Choose' }"
                :class="{ isInvalid: v$.assign_employee.$error }"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.assign_employee.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >Extended Date<span class="mandatory">*</span></label
              >
              <input
                type="date"
                class="form-input"
                :class="{ isInvalid: v$.extended_date.$error }"
                placeholder="End Date Here"
                v-model.lazy="v$.extended_date.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.extended_date.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
          </div>
          <!--end row -->

          <!--start row [follow up, category]-->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Follow Up<span class="mandatory">*</span></label
              >

              <Select2
                v-model="v$.follow_up.$model"
                :options="assign_employees"
                :settings="{ placeholder: 'Choose' }"
                :class="{ isInvalid: v$.assign_employee.$error }"
              />

              <p
                class="error-mgs"
                v-for="(error, index) in v$.follow_up.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >Milestone Points<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.points.$error }"
                placeholder="Project Name Here"
                v-model.lazy="v$.points.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.points.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">Description</label>
              <TheCKEditor @sendContent="setDescription" />
            </div>
            <div class="col-md-4 offset-md-2">
              <!--start row -->
              <div class="form-row">
                <label class="form-label"
                  >Milestone Category<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.category.$model"
                  :options="categories"
                  :settings="{ placeholder: 'Choose' }"
                  :class="{ isInvalid: v$.category.$error }"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.extended_date.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end row -->

              <!--start row -->
              <div class="row form-row">
                <div class="col-md-12">
                  <label class="form-label"
                    >Choose File<span class="mandatory">*</span></label
                  >
                  <single-file-uploader
                    field_name="create_sow"
                  ></single-file-uploader>
                </div>
              </div>
              <!--end row -->
            </div>
          </div>
          <!--end row -->
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import TheButton from "@/modules/shared/TheButton.vue";
import { useRoute, useRouter } from "vue-router";
import DataLoadingSpinner from "@/modules/shared/DataLoadingSpinner.vue";
import Select2 from "vue3-select2-component";
import SingleFileUploader from "../../../core/shared/file-uploader/SingleFileUploader.vue";
import toastr from "toastr";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import SingleImageUploader from "@/modules/core/shared/SingleImageUploader.vue";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";

const route = useRoute();
const router = useRouter();
let singleData = "";

//Button Loading
let buttonLoading = ref(false);

//Data Loading Spinner
let loadingSpinner = ref(false);

//categories list for Category Select
const project_names = ref([]);

//categories list for Category Select
const categories = ref([]);

//employee list for assain employee Select
const assign_employees = ref([]);

//Load Data form computed onMounted
onMounted(() => {
  getAssignEmployees();
  getCategories();
  getProjectNames();
});

async function getProjectNames() {
  await Axios.get("/projects-selectable")
    .then((response) => {
      if (response.data.code === 200) {
        project_names.value = response.data.data;
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

async function getCategories() {
  await Axios.get("/milestone-categories-selectable")
    .then((response) => {
      if (response.data.code === 200) {
        categories.value = response.data.data;
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

async function getAssignEmployees() {
  await Axios.get("/employees-selectable")
    .then((response) => {
      if (response.data.code === 200) {
        assign_employees.value = response.data.data;
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

const formState = reactive({
  project_name: "",
  milestone_name: "",
  assign_employee: "",
  points: "",
  follow_up: "",
  category: "",
  start_date: "",
  end_date: "",
  extended_date: "",
  file_name: "",
  description: "",
});

const rules: any = {
  project_name: { required },
  milestone_name: { required },
  assign_employee: { required },
  points: { required },
  follow_up: { required },
  category: { required },
  start_date: { required },
  end_date: { required },
  extended_date: { required },
};

const emit = defineEmits(["select"]);

const v$ = useVuelidate(rules, formState);

//Updated Data
async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    buttonLoading.value = true;
    await Axios.put("milestones/" + route.params.id, formState)
      .then((response) => {
        buttonLoading.value = false;
        if (response.data.code === 200) {
          reset();
          swal(
            "Success Job!",
            "Your milestones update successfully!",
            "success"
          );
          router.push("/pmm/milestones");
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}

onMounted(async () => {
  loadingSpinner.value = true;
  await Axios.get("/milestones/" + route.params.id).then((response) => {
    singleData = response.data.data;
    if (singleData != "") {
      formState.project_name = singleData.project_name;
      formState.milestone_name = singleData.milestone_name;
      formState.assign_employee = singleData.assign_employee;
      formState.points = singleData.points;
      formState.follow_up = singleData.follow_up;
      formState.category = singleData.category;
      formState.start_date = singleData.start_date;
      formState.end_date = singleData.end_date;
      formState.extended_date = singleData.extended_date;
      formState.description = singleData.description;
    }
    loadingSpinner.value = false;
  });
});

//reset all property
function reset() {
  formState.project_name = "";
  formState.milestone_name = "";
  formState.assign_employee = "";
  formState.points = "";
  formState.follow_up = "";
  formState.category = "";
  formState.start_date = "";
  formState.end_date = "";
  formState.extended_date = "";
  formState.file_name = "";
  formState.description = "";
  v$.value.$reset();
}
</script>

<style scoped></style>
