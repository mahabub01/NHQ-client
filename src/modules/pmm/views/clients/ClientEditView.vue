<template>
  <div class="container-fluid">
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/clients"
              >Client List <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="/pmm/clients/edit">Edit</router-link>
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
          <h4 class="form-page-title">Edit Client</h4>
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <!--start form-->
              <div class="form-row">
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
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end form-->

              <!--start form-->
              <div class="form-row">
                <label class="form-label"
                  >Company Email<span class="mandatory">*</span></label
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
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end form-->

              <!--start form-->
              <div class="form-row">
                <label class="form-label">Address</label>
                <textarea
                  placeholder="Parmanent Address here"
                  v-model.lazy="formState.address"
                ></textarea>
              </div>
              <!--end form-->

              <!--start form-->
              <div class="form-row">
                <label class="form-label">Company Description</label>
                <TheCKEditor @sendContent="setDescription" />
              </div>
              <!--end form-->

              <!--start form-->
              <div class="form-row">
                <single-image-uploader
                  label="Company Logo"
                  field_name="company_logo"
                  :mandatory="true"
                ></single-image-uploader>
              </div>
              <!--end form-->
            </div>
            <div class="col-md-4 offset-md-2">
              <!--start form-->
              <div class="form-row">
                <label class="form-label">Company Person Name</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="Company Person Name here"
                  :class="{ isInvalid: v$.contact_person_name.$error }"
                  v-model.lazy="v$.contact_person_name.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.contact_person_name.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end form-->

              <!--start form-->
              <div class="form-row">
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
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end form-->

              <!--start-->
              <div class="form-row">
                <label class="form-label"
                  >Contact Person Phone<span class="mandatory">*</span></label
                >
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.contact_person_phone.$error }"
                  placeholder="Contact Person Phone here"
                  v-model.lazy="v$.contact_person_phone.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.contact_person_phone.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end-->

              <!--start form-->
              <div class="form-row">
                <label class="form-label">Company Person Email</label>
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.contact_person_email.$error }"
                  placeholder="Company Person Email here"
                  v-model.lazy="v$.contact_person_email.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.contact_person_email.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end form-->

              <!--start-->
              <div class="form-row">
                <label class="form-label"
                  >Contact Person Designation<span class="mandatory"
                    >*</span
                  ></label
                >
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.contact_person_designation.$error }"
                  placeholder="Contact Person Designation here"
                  v-model.lazy="v$.contact_person_designation.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.contact_person_designation
                    .$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end-->

              <!--start form-->
              <div class="form-row">
                <multi-file-uploader-two
                  label="Company Profile"
                  field_name="company_profile"
                  :mandatory="true"
                ></multi-file-uploader-two>
              </div>
              <!--end form-->

              <!--start form-->
              <div class="form-row">
                <multifile-uploader
                  label="V-Card Attchment"
                  field_name="vcard_attachment"
                  :mandatory="true"
                ></multifile-uploader>
              </div>
              <!--end form-->
            </div>
          </div>
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
import MultifileUploader from "@/modules/core/shared/file-uploader/MultifileUploader.vue";
import MultiFileUploaderTwo from "@/modules/core/shared/file-uploader/MultiFileUploaderTwo.vue";
import SingleImageUploader from "@/modules/core/shared/SingleImageUploader.vue";
import { useRoute, useRouter } from "vue-router";
import DataLoadingSpinner from "@/modules/shared/DataLoadingSpinner.vue";
import Select2 from "vue3-select2-component";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";
import toastr from "toastr";
import { useStore } from "vuex";

//create store
const store = useStore();

const route = useRoute();
const router = useRouter();
let singleData = "";

//set CKEditor Data
const setDescription = (value: any) => {
  formState.company_description = value;
};
//Button Loading
let buttonLoading = ref(false);

//Data Loading Spinner
let loadingSpinner = ref(false);

const formState = reactive({
  company_name: "",
  contact_person_name: "",
  email: "",
  contact_person_email: "",
  contact_person_phone: "",
  company_logo: "",
  v_card_attchment: "",
  address: "",
  company_description: "",
  number_of_projects: "",
  contact_person_designation: "",
  company_profile_attachment: "",
  token: store.state.currentUser.token,
});

const rules: any = {
  company_name: { required },
  contact_person_name: { required },
  email: { required },
  contact_person_email: { required },
  contact_person_phone: { required },
  number_of_projects: { required },
  contact_person_designation: { required },
};

const v$ = useVuelidate(rules, formState);

//Updated Data
async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    buttonLoading.value = true;
    await Axios.put("clients/" + route.params.id, formState)
      .then((response) => {
        buttonLoading.value = false;
        if (response.data.code === 200) {
          reset();
          swal("Success Job!", "Your clients update successfully!", "success");
          router.push("/pmm/clients");
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
  await Axios.get("/clients/" + route.params.id).then((response) => {
    singleData = response.data.data;
    if (singleData != "") {
      formState.company_name = singleData.company_name;
      formState.contact_person_name = singleData.contact_person_name;
      formState.email = singleData.email;
      formState.contact_person_email = singleData.contact_person_email;
      formState.contact_person_phone = singleData.contact_person_phone;
      formState.company_logo = singleData.company_logo;
      formState.v_card_attchment = singleData.v_card_attchment;
      formState.address = singleData.address;
      formState.company_description = singleData.company_description;
      formState.number_of_projects = singleData.number_of_projects;
      formState.contact_person_designation =
        singleData.contact_person_designation;
      formState.company_profile_attachment =
        singleData.company_profile_attachment;
    }
    loadingSpinner.value = false;
  });
});

//reset all property
function reset() {
  formState.company_name = "";
  formState.contact_person_name = "";
  formState.email = "";
  formState.contact_person_email = "";
  formState.contact_person_phone = "";
  formState.address = "";
  formState.company_description = "";
  formState.number_of_projects = "";
  formState.contact_person_designation = "";
  formState.company_profile_attachment = "";
  v$.value.$reset();
}
</script>

<style scoped></style>
