<template>
  <div class="container-fluid">
    <!--start Spinner -->
    <the-spinner :isSaving="savingSpinner"></the-spinner>

    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/projects"
              >Project List <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="/pmm/projects/create">Create</router-link>
          </div>
          <div class="col-md-8">
            <div class="float-right">
              <button type="submit" class="form-button margin-right-10">
                <i class="far fa-save"></i> Submit
              </button>
              <router-link
                class="form-button-danger"
                style="color: white"
                to="/pmm/projects"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="form-design-body">
        <div class="container">
          <h4 class="form-page-title">Create Project</h4>
          <div class="row">
            <div class="col-md-4 offset-md-1">
              <!--start field-->
              <div class="form-row">
                <label class="form-label"
                  >Project Name<span class="mandatory">*</span></label
                >
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.name.$error }"
                  v-model.lazy="v$.name.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.name.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end field-->
              <!--start field-->
              <div class="form-row">
                <label class="form-label"
                  >Category Name<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.category_id.$model"
                  :options="categoryList"
                  :settings="{ placeholder: 'Choose' }"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.category_id.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end field-->

              <!--start field-->
              <div class="form-row">
                <label class="form-label">Project Lead</label>
                <Select2
                  v-model="formState.lead_id"
                  :options="leadList"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field-->

              <!--start field-->
              <div class="form-row">
                <label class="form-label">Project Member</label>
                <Select2
                  v-model="formState.team_id"
                  :options="teamList"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field-->

              <!--start field-->
              <div class="form-row">
                <label class="form-label">Add Client</label>
                <Select2
                  v-model="formState.client_id"
                  :options="clientList"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field-->

              <!--start field-->
              <div class="form-row">
                <label class="form-label">Project Operation Point</label>
                <input
                  type="number"
                  class="form-input"
                  v-model.lazy="formState.operation_point"
                />
              </div>
              <!--end field-->
              <!--start field-->
              <div class="form-row">
                <label class="form-label">Project Onboarding Point</label>
                <input
                  type="number"
                  class="form-input"
                  v-model.lazy="formState.onboarding_point"
                />
              </div>
              <!--end field-->
              <!--start field-->
              <div class="form-row">
                <label class="form-label">Choose File</label>
                <single-file-uploader
                  field_name="create_project"
                ></single-file-uploader>
              </div>
              <!--end field-->
            </div>
            <!--end column-->
            <div class="col-md-4 offset-md-2">
              <!--start field-->
              <div class="form-row">
                <label class="form-label">Tags</label>
                <Select2
                  v-model="formState.tags"
                  :options="tagList"
                  :settings="{ placeholder: 'Choose', multiple: true }"
                />
              </div>
              <!--end field-->

              <!--start field-->
              <div class="form-row">
                <label class="form-label">Start Date</label>
                <datepicker
                  @selected="startDateHandler"
                  format="dd-MM-yyyy"
                ></datepicker>
              </div>
              <!--end field-->
              <!--start field-->
              <div class="form-row">
                <label class="form-label">End Date</label>
                <datepicker
                  v-model="formState.end_date"
                  @selected="endDateHandler"
                  format="dd-MM-yyyy"
                ></datepicker>
              </div>
              <!--end field-->
              <!--start field-->
              <div class="form-row">
                <label class="form-label">Extended Date</label>
                <datepicker
                  v-model="formState.extended_date"
                  @selected="extendedDateHandler"
                  format="dd-MM-yyyy"
                ></datepicker>
              </div>
              <!--end field-->
              <!--start field-->
              <div class="form-row">
                <label class="form-label">Status</label>
                <Select2
                  v-model="formState.status"
                  :options="StatusList"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end field-->

              <!--start field-->
              <div class="form-row">
                <label class="form-label">Description</label>
                <TheCKEditor @sendContent="setDescription" />
              </div>
              <!--end field-->
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import Select2 from "vue3-select2-component";
import SingleFileUploader from "../../../core/shared/file-uploader/SingleFileUploader.vue";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";
import toastr from "toastr";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import { useRouter } from "vue-router";
import Datepicker from "vuejs3-datepicker";
import { useProject } from "../../composable/useProject";

//use for saving preloader
let savingSpinner = ref(false);

const router = useRouter();

//use project libary
const {
  formState,
  StatusList,
  categoryList,
  teamList,
  leadList,
  clientList,
  tagList,
  getTeams,
  getLeadList,
  getClientList,
  getTagList,
  getCategoryList,
  startDateHandler,
  endDateHandler,
  extendedDateHandler,
  resetForm,
} = useProject();

const rules: any = {
  name: { required },
  category_id: { required },
};

const emit = defineEmits(["select"]);

//set CKEditor Data
const setDescription = (value: any) => {
  formState.description = value;
};

//Load Data form computed onMounted
onMounted(() => {
  getTeams();
  getLeadList();
  getClientList();
  getTagList();
  getCategoryList();
});

const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();

  if (!v$.value.$error) {
    savingSpinner.value = true;
    await Axios.post("/projects/projects", formState)
      .then((response) => {
        // console.log(response.data.message);

        if (response.data.code === 200) {
          resetForm();
          //Stop Saving Spinner
          savingSpinner.value = false;
          swal("Success Job!", "Created record successfully!", "success");
          router.push("/pmm/projects");
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
