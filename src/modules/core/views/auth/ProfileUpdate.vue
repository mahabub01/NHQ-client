<template>
  <div class="container-fluid">
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="#"
              >Profile <i class="fas fa-chevron-right"></i
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
                to="/pmm/clients"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="form-design-body">
        <div class="container">
          <h4 class="form-page-title">Edit Profile</h4>
          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Name<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.name.$error }"
                placeholder="Name here"
                v-model.lazy="v$.name.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.name.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <!--start Gender Field -->
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Gender</label>
              <Select2
                v-model="formState.gender"
                :options="genderList"
                :settings="{ placeholder: 'Choose' }"
              />
            </div>
            <!--end Gender Field -->
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Email<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.email.$error }"
                placeholder="Email here"
                v-model.lazy="v$.email.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.email.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Nid Number</label>
              <input
                type="number"
                class="form-input"
                placeholder="Nid Number here"
                v-model.lazy="formState.nid_number"
              />
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Phone<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.phone.$error }"
                placeholder="Phone here"
                v-model.lazy="v$.phone.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.phone.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Date of Birth</label>
              <input
                type="date"
                class="form-input"
                placeholder="Date of Birth here"
                v-model.lazy="formState.date_of_birth"
              />
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Designation<span class="mandatory">*</span></label
              >
              <Select2
                v-model="formState.designation_id"
                :options="selectable_desination"
                :settings="{ placeholder: 'Choose' }"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.designation_id.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Department</label>
              <Select2
                v-model="formState.department_id"
                :options="selectable_department"
                :settings="{ placeholder: 'Choose' }"
              />
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">About Employee</label>
              <textarea
                placeholder="About Employee here"
                v-model.lazy="formState.about_employee"
              ></textarea>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Joinning Date</label>
              <input
                type="date"
                class="form-input"
                placeholder="Title here"
                v-model.lazy="formState.joinning_date"
              />
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">Present Address</label>
              <textarea
                placeholder="Present Address here"
                v-model.lazy="formState.present_address"
              ></textarea>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Parmanent Address</label>
              <textarea
                placeholder="Parmanent Address here"
                v-model.lazy="formState.parmanent_address"
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
  name: "",
  email: "",
  phone: "",
  designation_id: "",
  gender: "",
  date_of_birth: "",
  present_address: "",
  parmanent_address: "",
  nid_number: "",
  department_id: "",
  joinning_date: "",
  about_employee: "",
});

const rules: any = {
  name: { required },
  email: { required },
  phone: { required },
  designation_id: { required },
};

const v$ = useVuelidate(rules, formState);

//Updated Data
async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    buttonLoading.value = true;
    await Axios.post("/auth-information", formState)
      .then((response) => {
        swal(
          "Success Job!",
          "Your information updated successfully!",
          "success"
        );
        buttonLoading.value = false;
        console.log(formState);
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}
//const selectable_project = ref([]);
const selectable_department = ref([]);

//const selectable_project = ref([]);
const selectable_desination = ref([]);

onMounted(() => {
  designationSelectable();
  departmentSelectable();
});

// selectable designation
async function designationSelectable() {
  await Axios.get("/designation-selectable").then((response) => {
    selectable_desination.value = response.data.data;
  });
}

// selectable department
async function departmentSelectable() {
  await Axios.get("/department-selectable").then((response) => {
    selectable_department.value = response.data.data;
  });
}

onMounted(async () => {
  loadingSpinner.value = true;
  await Axios.get("/auth-information-data").then((response) => {
    singleData = response.data.data[0];
    if (singleData != "") {
      formState.name = singleData.name;
      formState.email = singleData.email;
      formState.phone = singleData.phone;
      formState.designation_id = singleData.designation_id;
      formState.gender = singleData.gender;
      formState.date_of_birth = singleData.date_of_birth;
      formState.present_address = singleData.present_address;
      formState.parmanent_address = singleData.parmanent_address;
      formState.nid_number = singleData.nid_number;
      formState.department_id = singleData.department_id;
      formState.joinning_date = singleData.joinning_date;
      formState.about_employee = singleData.about_employee;
    }
    loadingSpinner.value = false;
  });
});

//Gender list for Gender Select
const genderList = reactive([
  { id: 1, text: "Male" },
  { id: 2, text: "Female" },
]);
</script>

<style scoped></style>
