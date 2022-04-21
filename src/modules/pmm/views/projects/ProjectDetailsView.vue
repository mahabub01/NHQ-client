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
            <h4 class="form-page-title details-header-title">
              Project Details
            </h4>
            <div class="row">
              <div class="col-md-6">
                <!--start-->
                <div>
                  <h5 class="data-label">Project ID</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.project_ID }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Project Name</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.project_name }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Project Category</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.category }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Project Lead</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.teamLead }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Project Team</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.team }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Client</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.client }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Tag</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.tags }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Project Status</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.status }}
                  </p>
                </div>
                <!--end-->
              </div>
              <div class="col-md-6">
                <!--start-->
                <div>
                  <h5 class="data-label">Start Date</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.start_date }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">End Date</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.end_date }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Extended Date</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.extended_date }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Project Description</h5>
                  <div
                    class="des"
                    v-if="getInformation != null"
                    v-html="getInformation.description"
                  ></div>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Project Operation Point</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.operation_point }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Project Onboarding Point</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.onboarding_point }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Project Files</h5>
                  <a
                    target="_blank"
                    v-if="getInformation != null"
                    :href="`${getInformation.files}`"
                    >Download File</a
                  >
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
const getInformation = ref(null);

//Load Single Data
async function loadSingleData() {
  loadingSpinner.value = true;
  await Axios.get("/projects/projects-details/" + route.params.slug).then(
    (response) => {
      console.log(response);
      loadingSpinner.value = false;
      if (response.data.code === 200) {
        getInformation.value = response.data.data;
      } else {
        toastr.error(response.data.message);
      }
    }
  );
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
