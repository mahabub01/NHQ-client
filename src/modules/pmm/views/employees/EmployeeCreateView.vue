<template>
  <div class="container-fluid">
    <the-spinner :isSaving="savingSpinner"></the-spinner>
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/employees"
              >Employee <i class="fas fa-chevron-right"></i
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
                to="/pmm/employees"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="form-design-body">
        <div class="container">
          <h4 class="form-page-title">Create Employee</h4>
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
              <label class="form-label">Department</label>
              <Select2
                v-model="formState.department_id"
                :options="departments"
                :settings="{ placeholder: 'Choose' }"
              />
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">Phone</label>
              <input
                type="text"
                class="form-input"
                v-model.lazy="formState.phone"
              />
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Date of Birth</label>
              <input
                type="date"
                class="form-input"
                v-model.lazy="formState.date_of_birth"
              />
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">Designation</label>
              <Select2
                v-model="formState.designation_id"
                :options="designations"
                :settings="{ placeholder: 'Choose' }"
              />
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Nid Number</label>
              <input
                type="number"
                class="form-input"
                v-model.lazy="formState.nid_number"
              />
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Password<span class="mandatory">*</span></label
              >
              <input
                type="password"
                class="form-input"
                :class="{ isInvalid: v$.password.$error }"
                v-model.lazy="v$.password.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.password.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Joinning Date</label>
              <input
                type="date"
                class="form-input"
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
                style="padding: 10px"
                v-model.lazy="formState.present_address"
              ></textarea>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">About Employee</label>
              <textarea
                style="padding: 10px"
                v-model.lazy="formState.about_employee"
              ></textarea>
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label">Parmanent Address</label>
              <textarea v-model.lazy="formState.parmanent_address"></textarea>
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
import Select2 from "vue3-select2-component";
import { useRouter } from "vue-router";
import toastr from "toastr";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";

const router = useRouter();
let savingSpinner = ref(false);

const formState = reactive({
  name: "",
  email: "",
  phone: "",
  designation_id: "",
  password: "",
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
  password: { required },
};

const emit = defineEmits(["select"]);

const departments = ref([]);
const designations = ref([]);

//Load Data form computed onMounted
onMounted(() => {
  getDepartments();
  getDesignations();
});

async function getDepartments() {
  await Axios.get("department-selectable")
    .then((response) => {
      departments.value = response.data.data;
      console.log(response.data.data);
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

async function getDesignations() {
  await Axios.get("designation-selectable")
    .then((response) => {
      designations.value = response.data.data;
      console.log(response.data.data);
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

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
    savingSpinner.value = true;
    await Axios.post("employees", formState)
      .then((response) => {
        console.log(response);
        savingSpinner.value = false;
        if (response.data.code == 200) {
          swal(
            "Success Job!",
            "Your employee created successfully!",
            "success"
          );
          reset(); //reset all property
          router.push("/pmm/employees");
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}

//reset all property
function reset() {
  formState.name = "";
  formState.email = "";
  formState.phone = "";
  formState.designation_id = "";
  formState.password = "";
  formState.gender = "";
  formState.date_of_birth = "";
  formState.present_address = "";
  formState.parmanent_address = "";
  formState.nid_number = "";
  formState.department_id = "";
  formState.joinning_date = "";
  formState.about_employee = "";
  v$.value.$reset();
}
</script>

<style scoped></style>
