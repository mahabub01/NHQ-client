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
            v-if="route.params.submilestone_id != ''"
            :to="`/pmm/tasks/${route.params.submilestone_id}`"
            >Task List <i class="fas fa-chevron-right"></i
          ></router-link>

          <router-link to="/pmm/tasks" v-else
            >Task List <i class="fas fa-chevron-right"></i
          ></router-link>

          <router-link to="#">Task Details</router-link>
        </div>
        <div class="col-md-8"></div>
      </div>
    </div>
    <div class="form-design-body">
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <h4 class="form-page-title details-header-title">Task Details</h4>
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
                  <h5 class="data-label">Milestone ID</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.milestone_ID }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Task Name</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.task_name }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Task Id</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.task_unique_id }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Status</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.task_status }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Sub Milestone</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.submilestone }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Duration</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.duration }}
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
                  <h5 class="data-label">Expected Duration</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.expected_duration }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Actual Duration</h5>
                  <p class="data-text" v-if="getInformation != null">
                    <span v-if="getInformation.actual_duration != ''">
                      {{ getInformation.actual_duration }}
                    </span>
                    <span v-else>N/A</span>
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Assign Member</h5>
                  <template v-if="getInformation != null">
                    <p
                      class="data-text"
                      v-for="(item, index) in getInformation.assign_member"
                      :key="index"
                    >
                      {{ item.member.name }},
                    </p>
                  </template>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Files</h5>
                  <a
                    target="_blank"
                    v-if="getInformation.file != ''"
                    :href="`${getInformation.file}`"
                    >Download File</a
                  >
                </div>
                <!--end-->
              </div>
            </div>
            <div class="row margin-top">
              <h5 class="data-label margin-bottom-10">Task Snapshots</h5>
              <template v-if="getInformation != null">
                <div
                  class="col-md-4"
                  v-for="snapshot in getInformation.task_snapshots"
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
const getInformation = ref();

//Load Single Data
async function loadSingleData() {
  loadingSpinner.value = true;
  await Axios.get("/tasks/" + route.params.id).then((response) => {
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
