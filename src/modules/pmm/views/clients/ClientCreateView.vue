<template>
  <div class="container-fluid">
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/clients"
              >Client List <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="/pmm/clients/create">Create</router-link>
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
                <label class="form-label">Company Email</label>
                <input
                  type="text"
                  class="form-input"
                  v-model.lazy="formState.email"
                />
              </div>
              <!--end form-->

              <!--start form-->
              <div class="form-row">
                <label class="form-label">Address</label>
                <textarea v-model.lazy="formState.address"></textarea>
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
                <single-image-uploader-two
                  label="Company Logo"
                  field_name="company_logo"
                ></single-image-uploader-two>
              </div>
              <!--end form-->
            </div>
            <div class="col-md-4 offset-md-2">
              <!--start form-->
              <div class="form-row">
                <label class="form-label">Contact Person Name</label>
                <input
                  type="text"
                  class="form-input"
                  v-model.lazy="formState.contact_person_name"
                />
              </div>
              <!--end form-->

              <!--start-->
              <div class="form-row">
                <label class="form-label">Contact Person Phone</label>
                <input
                  type="text"
                  class="form-input"
                  v-model.lazy="formState.contact_person_phone"
                />
              </div>
              <!--end-->

              <!--start form-->
              <div class="form-row">
                <label class="form-label">Contact Person Email</label>
                <input
                  type="text"
                  class="form-input"
                  v-model.lazy="formState.contact_person_email"
                />
              </div>
              <!--end form-->

              <!--start-->
              <div class="form-row">
                <label class="form-label">Contact Person Designation</label>
                <Select2
                  v-model="formState.contact_person_designation"
                  :options="selectable_desination"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>
              <!--end-->

              <!--start form-->
              <div class="form-row">
                <!-- <multi-file-uploader-two
                  label="Company Profile"
                  field_name="company_profile"
                ></multi-file-uploader-two> -->
                <label class="form-label">Company Profile</label>
                <single-file-uploader
                  field_name="company_profile_attachment"
                ></single-file-uploader>
              </div>
              <!--end form-->

              <!--start form-->
              <div class="form-row">
                <!-- <multifile-uploader
                  label="V-Card Attchment"
                  field_name="vcard_attachment"
                ></multifile-uploader> -->
                <label class="form-label">V-Card Attchment</label>
                <single-file-uploader-two
                  field_name="v_card_attchment"
                ></single-file-uploader-two>
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
import { reactive, ref, defineEmits, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import { useRouter } from "vue-router";
import toastr from "toastr";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";
import { useStore } from "vuex";
import Select2 from "vue3-select2-component";
import SingleFileUploader from "@/modules/core/shared/file-uploader/SingleFileUploader.vue";
import SingleFileUploaderTwo from "@/modules/core/shared/file-uploader/SingleFileUploaderTwo.vue";
import SingleImageUploaderTwo from "@/modules/core/shared/SingleImageUploaderTwo.vue";

const router = useRouter();

//create store
const store = useStore();

//set CKEditor Data
const setDescription = (value: any) => {
  formState.company_description = value;
};

//const selectable_project = ref([]);
const selectable_desination = ref([]);

onMounted(() => {
  designationSelectable();
});

// async function projectSelectable() {
//   await Axios.get("/project-selectable").then((response) => {
//     selectable_project.value = response.data.data;
//   });
// }

async function designationSelectable() {
  await Axios.get("/designation-selectable").then((response) => {
    selectable_desination.value = response.data.data;
  });
}

let buttonLoading = ref(false);
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
  contact_person_designation: "",
  company_profile_attachment: "",
  token: store.state.currentUser.token,
});

const rules: any = {
  company_name: { required },
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
        console.log(response);
        buttonLoading.value = false;
        if (response.data.code === 200) {
          resetForm();
          swal("Success Job!", "Created record successfully!", "success");
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

//reset all property
function resetForm() {
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
