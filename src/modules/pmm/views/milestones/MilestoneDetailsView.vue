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
          <router-link
            v-if="route.params.project_id != ''"
            :to="`/pmm/milestones/${route.params.project_id}`"
            >Milestone List <i class="fas fa-chevron-right"></i
          ></router-link>
          <router-link v-else to="/pmm/milestones"
            >Milestone List <i class="fas fa-chevron-right"></i
          ></router-link>

          <router-link to="#">Milestone Details</router-link>
        </div>
        <div class="col-md-8"></div>
      </div>
    </div>
    <div class="form-design-body">
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <h4 class="form-page-title details-header-title">
              Milestone Details
            </h4>
            <div class="row">
              <div class="col-md-6">
                <!--start-->
                <div>
                  <h5 class="data-label">Milestone ID</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.milestone_id }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Milestone Name</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.milestone_name }}
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
                  <h5 class="data-label">Milestone Category</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.categoryMilestone }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Assign Employee</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.assign_employee }}
                  </p>
                </div>
                <!--end-->
                <!--start-->
                <div>
                  <h5 class="data-label">Follow Up</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.follow_up }}
                  </p>
                </div>
                <!--end-->
                <!--start-->
                <div>
                  <h5 class="data-label">Weightage</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.weightage }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Project Weightage</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.project_weightage }}
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
                  <h5 class="data-label">Milstone Description</h5>
                  <div
                    class="des"
                    v-if="getInformation != null"
                    v-html="getInformation.description"
                  ></div>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Status</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.status }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Milsetone Files</h5>
                  <a
                    target="_blank"
                    v-if="getInformation != null"
                    :href="`${getInformation.file_name}`"
                    >Download File</a
                  >
                </div>
                <!--end-->
              </div>
            </div>
            <div class="row margin-top">
              <h5 class="data-label margin-bottom-10">Milestone Snapshots</h5>
              <template v-if="getInformation != null">
                <div
                  class="col-md-4"
                  v-for="snapshot in getInformation.snapshotFiles"
                  :key="snapshot.id"
                >
                  <div class="snapshot-container">
                    <a :href="`${snapshot}`" target="_blank"
                      ><img
                        :src="`${snapshot}`"
                        alt="task snapshot"
                        class="img-design"
                    /></a>
                  </div>
                </div>
              </template>
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
  await Axios.get("/milestones-details/" + route.params.slug).then(
    (response) => {
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

.snapshot-container {
  width: 100%;
  min-height: 146px;
  border: 1px solid rgb(223, 223, 223);
  padding: 10px;
  margin-bottom: 20px;
}

.img-design {
  width: 100%;
  height: 140px;
}

.margin-top {
  margin-top: 20px;
}
.margin-bottom-10 {
  margin-bottom: 10px;
}
</style>
