<template>
  <div class="container-fluid">
    <!--start Spinner -->
    <the-spinner
      :isSaving="savingSpinner"
      :is-loading="loadingSpinner"
    ></the-spinner>

    <div class="form-bootcamp">
      <div class="row">
        <div class="col-md-4">
          <router-link to="/pmm/projects"
            >Project List <i class="fas fa-chevron-right"></i
          ></router-link>
          <router-link to="#">Project Details</router-link>
        </div>
        <div class="col-md-8"></div>
      </div>
    </div>
    <div class="form-design-body">
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <h4 class="form-page-title details-header-title">Client Details</h4>
            <div class="row">
              <div class="col-md-6">
                <!--start-->
                <div>
                  <h5 class="data-label">Company Name</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.company_name }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Company Email</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.email }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Company Address</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.address }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Company Description</h5>
                  <div
                    class="des"
                    v-if="getInformation != null"
                    v-html="getInformation.company_description"
                  ></div>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Number Of Project</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.number_of_project }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Company Logo</h5>
                  <img
                    v-if="getInformation.company_logo != null"
                    :src="`${getInformation.company_logo}`"
                    alt="Logo"
                    height="100"
                  />
                </div>
                <!--end-->
              </div>
              <div class="col-md-6">
                <!--start-->
                <div>
                  <h5 class="data-label">Contact Person Name</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.contact_person_name }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Contact Person Designation</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.contact_person_designation_id }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Contact Person Email</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.contact_person_email }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Contact Person Phone</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.contact_person_phone }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Company V-Card Attachment</h5>
                  <p class="data-text" v-if="getInformation != null">
                    <a
                      target="_blank"
                      v-if="getInformation != null"
                      :href="`${getInformation.v_card_attchment}`"
                      >Download File</a
                    >
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Company Profile Attachment</h5>
                  <p class="data-text" v-if="getInformation != null">
                    <a
                      target="_blank"
                      v-if="getInformation != null"
                      :href="`${getInformation.company_profile_attachment}`"
                      >Download File</a
                    >
                  </p>
                </div>
                <!--end-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import Axios from "@/http-common";
import toastr from "toastr";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

//use for saving preloader
let savingSpinner = ref(false);
let loadingSpinner = ref(false);

//use route
const route = useRoute();
const router = useRouter();

//create store
const store = useStore();

//Load Data form computed onMounted
onMounted(() => {
  loadSingleData();
  store.commit("modalModule/LOAD_CKEDITOR_MODAL", false);
});

//get Files
const getInformation = ref("");

//Load Single Data
async function loadSingleData() {
  loadingSpinner.value = true;
  await Axios.get("/clients/" + route.params.id).then((response) => {
    console.log(response);
    loadingSpinner.value = false;
    if (response.data.code === 200) {
      getInformation.value = response.data.data;
    } else {
      toastr.error(response.data.message);
    }
  });
}
</script>

<style scoped>
.details-header-title {
  text-align: left;
  font-size: 20px;
  font-weight: 700;
}

.data-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 3px;
}
.data-text {
  color: #6b778c;
  font-size: 12px;
}

.des p {
  color: #6b778c;
  font-size: 12px;
}
</style>
