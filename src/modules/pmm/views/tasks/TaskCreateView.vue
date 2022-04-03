<template>
  <div class="container-fluid">
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/tasks"
              >Task <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="#">Create</router-link>
          </div>
          <div class="col-md-8">
            <div class="float-right">
              <button type="submit" class="form-button margin-right-10">
                <i class="far fa-save"></i> Submit
              </button>
              <router-link
                class="form-button-danger"
                style="color: white"
                to="/pmm/tasks"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="form-design-body">
        <div class="container">
          <h4 class="form-page-title">Create Task</h4>
          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Project Name<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.project_name.$error }"
                placeholder="Project Name here"
                v-model.lazy="v$.project_name.$model"
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

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Task Name<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.task_name.$error }"
                placeholder="Project ID here"
                v-model.lazy="v$.task_name.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.task_name.$errors"
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
              <label class="form-label"
                >Task ID<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.task_id.$error }"
                placeholder="Task Id here"
                v-model.lazy="v$.task_id.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.task_id.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
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
              <label class="form-label">Assign Team/ Member</label>
              <Select2
                v-model="formState.assign_team"
                :options="genderList"
                :settings="{ placeholder: 'Choose' }"
              />
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Expected Duration</label>
              <input
                type="time"
                class="form-input"
                placeholder="Expected Duration here"
                v-model.lazy="formState.expected_duration"
              />
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">Task Status</label>
              <Select2
                v-model="formState.task_status"
                :options="genderList"
                :settings="{ placeholder: 'Choose' }"
              />
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Actual Duration</label>
              <input
                type="time"
                class="form-input"
                placeholder="Task Stauts here"
                v-model.lazy="formState.actual_duration"
              />
            </div>
          </div>

          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">Tags</label>
              <input
                type="text"
                class="form-input"
                placeholder="Tags here"
                v-model.lazy="formState.tags"
              />
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">File Name</label>
              <input
                type="text"
                class="form-input"
                placeholder="File Name here"
                v-model.lazy="formState.file_name"
              />
            </div>
          </div>
          <!--end row -->
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import TheButton from "@/modules/shared/TheButton.vue";
import Select2 from "vue3-select2-component";

let buttonLoading = ref(false);
const formState = reactive({
  project_name: "",
  task_name: "",
  task_id: "",
  assign_team: "",
  task_status: "",
  project_description: "",
  start_date: "",
  end_date: "",
  extended_date: "",
  expected_duration: "",
  actual_duration: "",
  file_name: "",
  task_file: "",
});

const rules: any = {
  project_name: { required },
  project_id: { required },
  task_name: { required },
  task_id: { required },
};

const emit = defineEmits(["select"]);

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
    await Axios.post("tasks", formState)
      .then((response) => {
        swal("Success Job!", "Your task created successfully!", "success");
        reset(); //reset all property
        buttonLoading.value = false;
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}

//reset all property
function reset() {
  // state.title = "";
  // state.description = "";
  // v$.value.$reset();
}
</script>

<style scoped></style>
