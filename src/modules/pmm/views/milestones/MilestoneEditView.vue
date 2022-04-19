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
          <!--start row -->
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
                >Start Date <span class="mandatory">*</span></label
              >
              <input
                type="date"
                class="form-input"
                v-model.lazy="formState.start_date"
              />
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Priority <span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                placeholder="Priority here"
                v-model.lazy="formState.priority"
              />
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >End Date <span class="mandatory">*</span></label
              >
              <input
                type="date"
                class="form-input"
                v-model.lazy="formState.end_date"
              />
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Assign Employee <span class="mandatory">*</span>
              </label>
              <Select2
                v-model="v$.assign_member.$model"
                :options="assign_members"
                :settings="{ placeholder: 'Choose' }"
                :class="{ isInvalid: v$.assign_member.$error }"
              />
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >Extended Date <span class="mandatory">*</span></label
              >
              <input
                type="date"
                class="form-input"
                v-model.lazy="formState.extended_date"
              />
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <single-image-uploader
                label="Company Logo"
                field_name="Choose logo"
                :mandatory="true"
              ></single-image-uploader>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >Project Wise Point <span class="mandatory">*</span></label
              >
              <input
                type="number"
                class="form-input"
                placeholder="Project Wise Points here"
                v-model.lazy="formState.project_wise_point"
              />
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">Description</label>
              <textarea
                placeholder="Present Address here"
                v-model.lazy="formState.description"
              ></textarea>
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
// import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
let singleData = "";

//Button Loading
let buttonLoading = ref(false);

//Data Loading Spinner
let loadingSpinner = ref(false);

const formState = reactive({
  milestone_name: "",
  assign_member: "",
  priority: "",
  start_date: "",
  end_date: "",
  extended_date: "",
  project_wise_point: "",
  file_attachment: "",
  description: "",
});

const rules: any = {
  milestone_name: { required },
  assign_member: { required },
  priority: { required },
  start_date: { required },
  end_date: { required },
  extended_date: { required },
  project_wise_point: { required },
  file_attachment: { required },
  description: { required },
};

const emit = defineEmits(["select"]);

//lead list for lead Select
const assign_members = ref([]);

//Load Data form computed onMounted
onMounted(() => {
  getAssignMembers();
});

async function getAssignMembers() {
  await Axios.get("/employees-selectable/")
    .then((response) => {
      if (response.data.code === 200) {
        assign_members.value = response.data.data;
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

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
      formState.milestone_name = singleData.milestone_name;
      formState.assign_member = singleData.assign_member;
      formState.priority = singleData.priority;
      formState.start_date = singleData.start_date;
      formState.end_date = singleData.end_date;
      formState.extended_date = singleData.extended_date;
      formState.project_wise_point = singleData.project_wise_point;
      formState.file_attachment = singleData.file_attachment;
      formState.description = singleData.description;
    }
    loadingSpinner.value = false;
  });
});

//reset all property
function reset() {
  formState.milestone_name = "";
  formState.assign_member = "";
  formState.priority = "";
  formState.start_date = "";
  formState.end_date = "";
  formState.extended_date = "";
  formState.project_wise_point = "";
  formState.file_attachment = "";
  formState.description = "";
  v$.value.$reset();
}
</script>

<style scoped></style>
