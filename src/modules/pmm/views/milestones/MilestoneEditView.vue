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
              <label class="form-label">Start Date</label>
              <input
                type="date"
                class="form-input"
                v-model.lazy="formState.start_date"
              />
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
              <input
                type="date"
                class="form-input"
                v-model.lazy="formState.end_date"
              />
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
              <input
                type="date"
                class="form-input"
                v-model.lazy="formState.extended_date"
              />
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
              <input
                type="number"
                class="form-input"
                v-model.lazy="formState.points"
              />
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
import Axios from "@/http-common";
import swal from "sweetalert";
import { useRoute, useRouter } from "vue-router";
import Select2 from "vue3-select2-component";
import SingleFileUploader from "../../../core/shared/file-uploader/SingleFileUploader.vue";
import toastr from "toastr";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import { useStore } from "vuex";
import MultiImageUploader from "@/modules/core/shared/MultiImageUploader.vue";

const route = useRoute();
const router = useRouter();
let singleData = "";

const store = useStore();

//Data Loading Spinner
let loadingSpinner = ref(false);

//categories list for Category Select
const project_names = ref([]);

//categories list for Category Select
const categories = ref([]);

//employee list for assain employee Select
const assign_employees = ref([]);

//set CKEditor Data
const setDescription = (value: any) => {
  formState.description = value;
};

//Load Data form computed onMounted
onMounted(() => {
  getAssignEmployees();
  getCategories();
  getProjectNames();
});

//get Files
const getFiles = ref(null);

const user_id = ref(localStorage.getItem("user_id"));
const token = ref(localStorage.getItem("token"));

// Load CkEditor Data
const loadCKEditor = computed(() => {
  return store.state.modalModule.loadCKEditor;
});

async function getProjectNames() {
  await Axios.get("/project-selectable")
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
  token: token.value,
  duration: "",
  user_id: user_id.value,
});

const rules: any = {
  project_name: { required },
  milestone_name: { required },
};

const emit = defineEmits(["select"]);

const v$ = useVuelidate(rules, formState);

//Updated Data
async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    await Axios.put("milestones/" + route.params.id, formState)
      .then((response) => {
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
    if (response.data.data != "") {
      formState.project_name = String(response.data.data.project_name);
      formState.milestone_name = response.data.data.milestone_name;
      formState.assign_employee = response.data.data.assign_employee;
      formState.points = response.data.data.points;
      formState.follow_up = String(response.data.data.follow_up);
      formState.category = String(response.data.data.category);
      formState.start_date = response.data.data.start_date;
      formState.end_date = response.data.data.end_date;
      formState.extended_date = response.data.data.extended_date;
      formState.description = response.data.data.description;
      formState.duration = response.data.data.duration;
      getFiles.value = response.data.data.file_name;
      store.commit("modalModule/LOAD_CKEDITOR_MODAL", true);
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
