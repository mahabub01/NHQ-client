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
          <router-link to="#">Profile Information</router-link>
        </div>
        <div class="col-md-8"></div>
      </div>
    </div>
    <div class="form-design-body">
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <h4 class="form-page-title details-header-title">
              Profile Information
            </h4>
            <div class="row">
              <div class="col-md-6">
                <!--start-->
                <div>
                  <h5 class="data-label">Name</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.name }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Email</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.email }}
                  </p>
                </div>
                <!--end-->
                <!--start-->
                <div>
                  <h5 class="data-label">Phone</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.phone }}
                  </p>
                </div>
                <!--end-->
                <!--start-->
                <div>
                  <h5 class="data-label">Designation</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.designation }}
                  </p>
                </div>
                <!--end-->
                <!--start-->
                <div>
                  <h5 class="data-label">Department</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.department }}
                  </p>
                </div>
                <!--end-->
                <!--start-->
                <div>
                  <h5 class="data-label">Present Address</h5>
                  <div
                    class="des"
                    v-if="getInformation != null"
                    v-html="getInformation.present_address"
                  ></div>
                </div>
                <!--end-->
                <!--start-->
                <div>
                  <h5 class="data-label">Parmanent Address</h5>
                  <div
                    class="des"
                    v-if="getInformation != null"
                    v-html="getInformation.parmanent_address"
                  ></div>
                </div>
                <!--end-->
              </div>

              <div class="col-md-6">
                <!--start-->
                <div>
                  <h5 class="data-label">Employee ID</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.employee_id }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Gender</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.gender }}
                  </p>
                </div>
                <!--end-->
                <!--start-->
                <div>
                  <h5 class="data-label">Date of Birth</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.date_of_birth }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Nid Number</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.nid_number }}
                  </p>
                </div>
                <!--end-->
                <!--start-->
                <div>
                  <h5 class="data-label">Joinning Date</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.joinning_date }}
                  </p>
                </div>
                <!--end-->
                <!--start-->
                <div>
                  <h5 class="data-label">About Employee</h5>
                  <div
                    class="des"
                    v-if="getInformation != null"
                    v-html="getInformation.about_employee"
                  ></div>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Status</h5>
                  <div
                    class="des"
                    v-if="getInformation != null"
                    v-html="getInformation.is_active"
                  ></div>
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
  await Axios.get("/profile-details").then((response) => {
    loadingSpinner.value = false;
    if (response.data.code === 200) {
      getInformation.value = response.data.data[0];
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

.des {
  color: #6b778c;
  font-size: 12px;
  padding-bottom: 15px;
}
</style>
