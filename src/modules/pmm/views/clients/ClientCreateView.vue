<template>
  <div>
    <div class="form-container form-page">
      <h4 class="form-page-title">Create Clients</h4>
      <form @submit.prevent="categorySubmit">
        <!--start row-->
        <div class="row">
          <!--start company name-->
          <div class="col-md-4">
            <label class="form-label"
              >Company Name<span class="mandatory">*</span></label
            >
            <input
              type="text"
              class="form-page-input"
              :class="{ isInvalid: v$.company_name.$error }"
              placeholder="Company Name"
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
          <!--end company name-->

          <!--start email -->
          <div class="col-md-4">
            <label class="form-label" for="company_email"
              >Company Email<span class="mandatory">*</span></label
            >
            <input
              type="text"
              class="form-page-input"
              :class="{ isInvalid: v$.email.$error }"
              placeholder="Company Email"
              v-model.lazy="v$.email.$model"
              id="company_email"
            />
            <p
              class="error-mgs"
              v-for="(error, index) in v$.email.$errors"
              :key="index"
            >
              <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
            </p>
          </div>
          <!--end email-->
        </div>
        <!--end row -->

        <!--start company Address -->
        <div class="row form-row">
          <div class="col-md-12">
            <label class="form-label" for="company_address">Address</label>
            <textarea
              class="form-page-textarea"
              placeholder="Address"
              v-model.lazy="formState.address"
              id="company_address"
            ></textarea>
          </div>
        </div>
        <!--end company Address -->

        <!--start row -->
        <div class="row form-row">
          <!--start contact person-->
          <div class="col-md-4">
            <label class="form-label"
              >Contact person name<span class="mandatory">*</span></label
            >
            <input
              type="text"
              class="form-page-input"
              :class="{ isInvalid: v$.contant_person_name.$error }"
              placeholder="Contact person name"
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
          <!--end contact person-->

          <!--start contact person-->
          <div class="col-md-4">
            <label class="form-label"
              >Contact person desination<span class="mandatory">*</span></label
            >
            <input
              type="text"
              class="form-page-input"
              :class="{ isInvalid: v$.contant_person_designation.$error }"
              placeholder="Contact person desination"
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
          <!--end contact person-->

          <!--start contact person-->
          <div class="col-md-4">
            <label class="form-label">Number of project</label>
            <input
              type="text"
              class="form-page-input"
              placeholder="Number of project"
              v-model.lazy="formState.number_of_projects"
            />
          </div>
          <!--end contact person-->
        </div>
        <!--end row-->

        <!--start company Address -->
        <div class="row form-row">
          <div class="col-md-12">
            <label class="form-label" for="company_description"
              >Company Description</label
            >
            <textarea
              class="form-page-textarea"
              v-model.lazy="formState.company_description"
              id="company_description"
            ></textarea>
          </div>
        </div>
        <!--end company Address -->

        <!--start company name-->
        <div class="row form-row">
          <div class="col-md-4">
            <single-image-uploader
              label="Company Logo"
              field_name="company_logo"
            ></single-image-uploader>
          </div>

          <div class="col-md-4">
            <multi-file-uploader-two
              label="Company Profile"
              field_name="company_profile"
            ></multi-file-uploader-two>
          </div>

          <div class="col-md-4">
            <multifile-uploader
              label="V-Card Attchment"
              field_name="vcard_attachment"
            ></multifile-uploader>
          </div>
        </div>
        <!--end company name-->

        <div class="row form-row">
          <div class="col-md-12">
            <the-button :buttonLoading="buttonLoading">
              <i class="far fa-save"></i> Submit
            </the-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import TheButton from "@/modules/shared/TheButton.vue";
import MultifileUploader from "@/modules/core/shared/file-uploader/MultifileUploader.vue";
import MultiFileUploaderTwo from "@/modules/core/shared/file-uploader/MultiFileUploaderTwo.vue";
import SingleImageUploader from "@/modules/core/shared/SingleImageUploader.vue";

let buttonLoading = ref(false);
const formState = reactive({
  company_name: "",
  company_logo: "",
  email: "",
  address: "",
  contant_person_name: "",
  contant_person_designation: "",
  contant_person_email: "",
  contant_person_phone: "",
  v_card_attchment: "",
  company_description: "",
  company_profile_attachment: "",
  number_of_projects: "",
});

const rules: any = {
  company_name: { required },
  email: { required },
  contant_person_name: { required },
  contant_person_designation: { required },
  contant_person_email: { required },
  contant_person_phone: { required },
};

const v$ = useVuelidate(rules, formState);

async function categorySubmit() {
  console.log(formState);
  //   v$.value.$validate();
  //   v$.value.$touch();
  //   if (!v$.value.$error) {
  //     buttonLoading.value = true;
  //     await Axios.post("projects/categories", formState)
  //       .then((response) => {
  //         swal("Success Job!", "Your category created successfully!", "success");
  //         reset(); //reset all property
  //         buttonLoading.value = false;
  //       })
  //       .catch((error) => {
  //         console.log("problem Here" + error);
  //       });
  //   }
}

//reset all property
function reset() {
  //   formState.title = "";
  //   formState.description = "";
  v$.value.$reset();
}
</script>

<style scoped></style>
