<template>
  <div class="container-fluid">
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/clients"
              >Client <i class="fas fa-chevron-right"></i
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
                to="/pmm/clients"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="form-design-body">
        <div class="container">
          <h4 class="form-page-title">Create Client</h4>

          <!--start row  company name/ company person name -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Company Name<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.company_name.$error }"
                placeholder="Company Name here"
                v-model.lazy="v$.company_name.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.company_name.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >Company Person Name <span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                placeholder="Company Person Name here"
                :class="{ isInvalid: v$.contant_person_name.$error }"
                v-model.lazy="v$.contant_person_name.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.contant_person_name.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
          </div>
          <!--end row -->

          <!--start row email/company person email-->
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
              <label class="form-label">Company Person Email</label>
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.contant_person_email.$error }"
                placeholder="Company Person Email here"
                v-model.lazy="v$.contant_person_email.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.contant_person_email.$errors"
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
              <label class="form-label">Address</label>
              <textarea
                placeholder="Parmanent Address here"
                v-model.lazy="formState.address"
              ></textarea>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label">Company Description</label>
              <textarea
                placeholder="Company Description here"
                v-model.lazy="formState.company_description"
              ></textarea>
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <div class="col-md-12">
                <label class="form-label">Company Logo </label>
                <input class="form-input" type="file" />
                <!-- <p
                  class="error-mgs"
                  v-for="(error, index) in v$.company_logo.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p> -->
              </div>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >Contact Person Phone<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.contant_person_phone.$error }"
                placeholder="Contact Person Phone here"
                v-model.lazy="v$.contant_person_phone.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.contant_person_phone.$errors"
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
              <div class="col-md-12">
                <label class="form-label">Company Profile</label>
                <input class="form-input" type="file" />
                <!-- <p
                  class="error-mgs"
                  v-for="(error, index) in v$.company_profile_attachment
                    .$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p> -->
              </div>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >Contact Person Designation<span class="mandatory"
                  >*</span
                ></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.contant_person_designation.$error }"
                placeholder="Contact Person Designation here"
                v-model.lazy="v$.contant_person_designation.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.contant_person_designation.$errors"
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
              <div class="col-md-12">
                <label class="form-label">V-Card Attchment</label>
                <input class="form-input" type="file" />
                <!-- <p
                  class="error-mgs"
                  v-for="(error, index) in v$.v_card_attchment.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p> -->
              </div>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >Number of Projects<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.number_of_projects.$error }"
                placeholder="Number of Projects here"
                v-model.lazy="v$.number_of_projects.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.number_of_projects.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
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
  company_name: "",
  contant_person_name: "",
  email: "",
  contant_person_email: "",
  contant_person_phone: "",
  company_logo: "",
  v_card_attchment: "",
  address: "",
  company_description: "",
  number_of_projects: "",
  contant_person_designation: "",
  company_profile_attachment: "",
});

const rules: any = {
  company_name: { required },
  contant_person_name: { required },
  email: { required },
  contant_person_email: { required },
  contant_person_phone: { required },
  number_of_projects: { required },
  contant_person_designation: { required },
};

const emit = defineEmits(["select"]);

const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    buttonLoading.value = true;
    await Axios.post("/clients", formState)
      .then((response) => {
        swal("Success Job!", "Your client created successfully!", "success");
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
  formState.company_name,
    formState.contant_person_name,
    formState.email,
    formState.contant_person_email,
    formState.contant_person_phone,
    formState.company_logo,
    formState.v_card_attchment,
    formState.address,
    formState.company_description,
    formState.number_of_projects,
    formState.contant_person_designation,
    formState.company_profile_attachment,
    v$.value.$reset();
}
</script>

<style scoped></style>
