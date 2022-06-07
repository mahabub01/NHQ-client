<template>
  <div class="container-fluid">
    <div class="form-bootcamp">
      <div class="row">
        <div class="col-md-4">
          <router-link to="/pmm/sub-milestones"
            >Sub Milestone List <i class="fas fa-chevron-right"></i
          ></router-link>
          <router-link to="#">Time Tracker</router-link>
        </div>
        <div class="col-md-8"></div>
      </div>
    </div>
    <div class="form-design-body">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <the-counter
              @timerStart="startTimer()"
              @timerEnd="stopTimer()"
              ref="timerResult"
              :taskid="`${route.params.submilestone_id}`"
              :userid="Number(user_id)"
            ></the-counter>
          </div>
          <div class="col-md-6 timer-table">
            <!--start table-->
            <table class="table table-full-width">
              <thead>
                <tr>
                  <th scope="col">SL</th>
                  <th scope="col">Date</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">End Time</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in loadTimeData" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.start_date }}</td>
                  <td>{{ item.start_time }}</td>
                  <td>{{ item.end_time }}</td>
                  <td>{{ item.expected_duration }}</td>
                </tr>
              </tbody>
            </table>
            <!--end table-->
          </div>
        </div>
      </div>
    </div>
    <!--start Spinner -->
    <the-spinner
      :isLoading="loadingSpinner"
      :isSaving="savingSpinner"
    ></the-spinner>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import TheCounter from "../../../core/shared/TheCounter.vue";
import Axios from "@/http-common";
import toastr from "toastr";
import { useRoute } from "vue-router";
import TheSpinner from "@/modules/shared/spinners/TheSpinner.vue";

const route = useRoute();
//const store = useStore();
//const user_id = computed(() => store.state.currentUser.user.id);
const user_id = ref(localStorage.getItem("user_id"));
const loadingSpinner = ref(false);
const savingSpinner = ref(false);

const loadTimeData = ref([] as string[]);
const timerResult = ref([]);
const task_time_id = ref("");
const timerstated = ref(false); // for stop reloading

const timeTrackerState = reactive({
  user_id: user_id.value,
  task_id: route.params.submilestone_id,
  start_date: "",
  end_date: "",
  start_time: "",
  end_time: "",
  expected_duration: "",
  minit: 0,
  sec: 0,
  hour: 0,
  all_seconds: 0,
});

onMounted(() => {
  loadTimerData();
  let exits_time_id = localStorage.getItem(
    "sub_timer_" + route.params.submilestone_id
  );
  if (exits_time_id != null) {
    task_time_id.value = exits_time_id;
  }
});

async function loadTimerData() {
  loadingSpinner.value = true;
  await Axios.get(
    "/submilestone-timers?user_id=" +
      user_id.value +
      "&submilestone_id=" +
      route.params.submilestone_id
  ).then((response) => {
    if (response.data.code == 200) {
      loadTimeData.value = response.data.data;
      loadingSpinner.value = false;
    } else {
      toastr.error(response.data.message);
    }
  });
}

async function startTimer() {
  let exposeData = timerResult.value.timeTrackerResult;
  timerstated.value = true;
  timeTrackerState.start_date = exposeData.start_date;
  //timeTrackerState.end_date = exposeData.end_date;
  timeTrackerState.start_time = exposeData.start_time;
  //timeTrackerState.end_time = exposeData.end_time;
  loadTimeData.value.push(exposeData);
  await Axios.post("submilestone-timers", timeTrackerState)
    .then((response) => {
      if (response.data.code === 200) {
        task_time_id.value = response.data.data.id;
        localStorage.setItem(
          "sub_timer_" + route.params.submilestone_id,
          response.data.data.id
        );
        toastr.success("Sub Milestone timer started successfully.");
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

async function stopTimer() {
  // console.log(timerResult.value.timeTrackerResult);
  let exposeData = timerResult.value.timeTrackerResult;
  timeTrackerState.end_date = exposeData.end_date;
  timeTrackerState.end_time = exposeData.end_time;
  timeTrackerState.expected_duration =
    exposeData.hr + "h " + exposeData.min + "m " + exposeData.sec + "s";
  timeTrackerState.minit = Number(exposeData.min);
  timeTrackerState.sec = Number(exposeData.sec);
  timeTrackerState.hour = Number(exposeData.hr);
  timeTrackerState.all_seconds = Number(exposeData.all_seconds);
  await Axios.put("submilestone-timers/" + task_time_id.value, timeTrackerState)
    .then((response) => {
      if (response.data.code === 200) {
        loadTimerData();
        localStorage.removeItem("sub_timer_" + route.params.submilestone_id);
        toastr.success("Sub Milestone timer stopped successfully.");
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
thead th {
  background-color: #f4f5f6;
  padding: 10px;
}

.table-full-width {
  width: 100%;
  border: 0.5px solid #f4f5f6;
}

tbody tr td {
  padding: 10px;
  font-size: 12px;
  color: #666666;
  border-bottom: unset;
}

tbody tr:nth-child(even) td {
  background: #f4f5f6;
}

.timer-table {
  max-height: 680px;
  overflow-y: auto;
}

@media screen and (max-width: 1350px) {
  .timer-table {
    max-height: 450px;
    overflow-y: auto;
  }
}
</style>
