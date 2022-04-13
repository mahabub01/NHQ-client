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
              <label class="form-label">Start Date</label>
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
                >Milestone ID<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.milestone_id.$error }"
                placeholder="Milestone ID here"
                v-model.lazy="v$.milestone_id.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.milestone_id.$errors"
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

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">Priority</label>
              <input
                type="text"
                class="form-input"
                placeholder="Priority here"
                v-model.lazy="formState.priority"
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

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">Assign Employee</label>
              <Select2
                v-model="formState.assign_employee"
                :options="genderList"
                :settings="{ placeholder: 'Choose' }"
              />
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Project Wise Point</label>
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
              <label class="form-label">File Name</label>
              <input
                type="text"
                class="form-input"
                placeholder="File Name here"
                v-model.lazy="formState.file_name"
              />
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">File Attachment</label>
              <input type="file" class="form-input" />
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
import { reactive, ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import TheButton from "@/modules/shared/TheButton.vue";
import { useRoute, useRouter } from "vue-router";
import DataLoadingSpinner from "@/modules/shared/DataLoadingSpinner.vue";
import Select2 from "vue3-select2-component";

const route = useRoute();
const router = useRouter();
let singleData = "";

//Button Loading
let buttonLoading = ref(false);

//Data Loading Spinner
let loadingSpinner = ref(false);

const formState = reactive({
  milestone_name: "",
  milestone_id: "",
  assign_employee: "",
  priority: "",
  start_date: "",
  end_date: "",
  extended_date: "",
  project_wise_point: "",
  file_name: "",
  file_attachment: "",
  description: "",
});

const rules: any = {
  milestone_name: { required },
  milestone_id: { required },
};

// const emit = defineEmits(["select"]);

//Gender list for Gender Select
const genderList = reactive([
  { id: 1, text: "Male" },
  { id: 2, text: "Female" },
]);

const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    buttonLoading.value = true;
    await Axios.put("milestones/" + route.params.id, formState)
      .then((response) => {
        swal("Success Job!", "Your milestone created successfully!", "success");
        reset(); //reset all property
        buttonLoading.value = false;
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
      formState.milestone_id = singleData.milestone_id;
      formState.assign_employee = singleData.assign_employee;
      formState.priority = singleData.priority;
      formState.start_date = singleData.start_date;
      formState.end_date = singleData.end_date;
      formState.extended_date = singleData.extended_date;
      formState.project_wise_point = singleData.project_wise_point;
      formState.file_name = singleData.file_name;
      formState.file_attachment = singleData.file_attachment;
      formState.description = singleData.description;
    }
    loadingSpinner.value = false;
  });
});

//reset all property
function reset() {
  // state.title = "";
  // state.description = "";
  v$.value.$reset();
}
</script>

<style scoped></style>
