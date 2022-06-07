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
          <router-link to="/pmm/customer-pos"
            >Customer PO List <i class="fas fa-chevron-right"></i
          ></router-link>
          <router-link to="#">Customer PO Details</router-link>
        </div>
        <div class="col-md-8"></div>
      </div>
    </div>
    <div class="form-design-body">
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <h4 class="form-page-title details-header-title">
              Customer PO Details
            </h4>
            <div class="row">
              <div class="col-md-6">
                <!--start-->
                <div>
                  <h5 class="data-label">Customer PO ID</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.boq_id }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Customer PO Title</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.boq_title }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Customer PO Category</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.category }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Version</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.version }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Boq Category Item</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.category_item }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Project Name</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.project_title }}
                  </p>
                </div>
                <!--end-->
              </div>
              <div class="col-md-6">
                <!--start-->
                <div>
                  <h5 class="data-label">Part Number</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.part_number }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Quantity</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.quantity }}
                  </p>
                </div>
                <!--end-->
                <!--start-->
                <div>
                  <h5 class="data-label">Unit</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.unit }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Boq Description</h5>
                  <div
                    class="des"
                    v-if="getInformation != null"
                    v-html="getInformation.description"
                  ></div>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Boq Status</h5>
                  <p class="data-text" v-if="getInformation != null">
                    {{ getInformation.status }}
                  </p>
                </div>
                <!--end-->

                <!--start-->
                <div>
                  <h5 class="data-label">Boq Files</h5>
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
  await Axios.get("/projects/boqs-details/" + route.params.slug).then(
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
