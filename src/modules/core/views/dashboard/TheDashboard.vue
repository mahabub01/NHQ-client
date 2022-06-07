<template>
  <div class="container-fluid">
    <div class="row form-row" style="margin-top: 30px">
      <!--start-->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between p-md-1">
              <div class="d-flex flex-row">
                <div class="align-self-center">
                  <i class="fas fa-project-diagram text-info fa-3x me-4"></i>
                </div>
                <div>
                  <h4>Projects</h4>
                  <p class="mb-0">Number of Project</p>
                </div>
              </div>
              <div class="align-self-center">
                <h2 class="h1 mb-0" v-if="dashboard != ''">
                  {{ dashboard.projects_count }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end-->

      <!--start-->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between p-md-1">
              <div class="d-flex flex-row">
                <div class="align-self-center">
                  <i class="fas fa-chart-bar text-info fa-3x me-4"></i>
                </div>
                <div>
                  <h4>Milestone</h4>
                  <p class="mb-0">Number of Milestone</p>
                </div>
              </div>
              <div class="align-self-center">
                <h2 class="h1 mb-0" v-if="dashboard != ''">
                  {{ dashboard.milestone_count }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end-->

      <!--start-->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between p-md-1">
              <div class="d-flex flex-row">
                <div class="align-self-center">
                  <i class="fas fa-chart-pie-alt text-info fa-3x me-4"></i>
                </div>
                <div>
                  <h4>Submilestone</h4>
                  <p class="mb-0">Number of Submilestone</p>
                </div>
              </div>
              <div class="align-self-center">
                <h2 class="h1 mb-0" v-if="dashboard != ''">
                  {{ dashboard.submilestone_count }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end-->

      <!--start-->
      <div class="col-md-4" style="margin-top: 30px">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between p-md-1">
              <div class="d-flex flex-row">
                <div class="align-self-center">
                  <i class="fas fa-tasks text-info fa-3x me-4"></i>
                </div>
                <div>
                  <h4>Task</h4>
                  <p class="mb-0">Number of Task</p>
                </div>
              </div>
              <div class="align-self-center">
                <h2 class="h1 mb-0" v-if="dashboard != ''">
                  {{ dashboard.task_count }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import Axios from "@/http-common";
import toastr from "toastr";

onMounted(() => {
  getDashboard();
});

const dashboard = ref("");

async function getDashboard() {
  await Axios.get("/pmm-dashboard")
    .then((response) => {
      if (response.data.code === 200) {
        dashboard.value = response.data.data;
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}
</script>

<style scoped>
.custom-dashboard-card {
  min-height: 200px;
  border-radius: 40px;
}
</style>
