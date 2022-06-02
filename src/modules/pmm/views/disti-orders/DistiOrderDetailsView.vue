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
          <router-link to="/pmm/disti-order"
            >Disti Order List <i class="fas fa-chevron-right"></i
          ></router-link>
          <router-link to="#">Details</router-link>
        </div>
        <div class="col-md-8"></div>
      </div>
    </div>
    <div class="form-design-body">
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <h4 class="form-page-title details-header-title">
              Disti Order Details
            </h4>
            <div class="row">
              <div class="col-md-6">
                <!--start-->
                <div>
                  <h5 class="data-label">Title</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.disti_order_title }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Description</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.description }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">File</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.file }}
                  </p>
                </div>
                <!--end-->
              </div>
              <div class="col-md-6">
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
                  <h5 class="data-label">Project Title</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.project_title }}
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
});

//get Files
const getInformation = ref(null);

//Load Single Data
async function loadSingleData() {
  loadingSpinner.value = true;
  await Axios.get("/projects/disti-order-details/" + route.params.slug).then(
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
