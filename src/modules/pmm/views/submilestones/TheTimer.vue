<template>
  <div>
    <span class="timer-result">
      {{ TimeTrackerDisplay.hr }} : {{ TimeTrackerDisplay.min }} :
      {{ TimeTrackerDisplay.sec }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { useTimeTracker } from "@/composables/time-tracker";
import {
  defineProps,
  computed,
  onMounted,
  defineExpose,
  reactive,
  ref,
} from "vue";
import { useStore } from "vuex";
import Axios from "@/http-common";

const store = useStore();
const user_id = computed(() => store.state.currentUser.user.id);

const task_time_id = ref();

const {
  TimeTrackerDisplay,
  timeTrackerResult,
  trackerTimer,
  timeReset,
  storeIntervalId,
  removeIntervalId,
} = useTimeTracker();

const prop = defineProps({
  taskId: { type: String, required: true },
});

const timeTrackerState = reactive({
  user_id: user_id.value,
  task_id: prop.taskId,
  start_date: "",
  end_date: "",
  start_time: "",
  end_time: "",
  expected_duration: "",
  day: 0,
  minit: 0,
  hour: 0,
  sec: 0,
  all_seconds: 0,
});

onMounted(() => {
  //get timer id
  let exits_time_id = localStorage.getItem("timer_" + prop.taskId);
  if (exits_time_id != null) {
    task_time_id.value = exits_time_id;
  }

  let running = localStorage.getItem(
    "r_t_" + prop.taskId + "_" + user_id.value
  );
  if (running != "" && running != null) {
    let getable: string[] = [
      JSON.parse(running).h,
      JSON.parse(running).m,
      JSON.parse(running).s,
      JSON.parse(running).ats,
    ];
    trackerTimer(true, true, prop.taskId, true, getable);
    storeIntervalId(Number(prop.taskId), Number(timeTrackerResult.intervalId));
  }
});

//const emit = defineEmits(["startTimer", "endTimer"]);

const startCounter = async (task_id: any) => {
  trackerTimer(true, true, task_id);
  // emit("startTimer");
  let exposeData = timeTrackerResult;

  timeTrackerState.start_date = exposeData.start_date;
  timeTrackerState.end_date = exposeData.end_date;
  timeTrackerState.start_time = exposeData.start_time;
  timeTrackerState.end_time = exposeData.end_time;
  // timeTrackerState.expected_duration =
  //   exposeData.hr + "h" + exposeData.min + "min" + exposeData.sec + "sec";

  //Save TimerInvercal Id
  //TimerInvercal id is important for Clear Interval
  storeIntervalId(task_id, Number(timeTrackerResult.intervalId));

  await Axios.post("task-timers", timeTrackerState)
    .then((response) => {
      if (response.data.code === 200) {
        task_time_id.value = response.data.data.id;
        localStorage.setItem("timer_" + task_id, response.data.data.id);
      } else {
        console.log(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
};

const endCounter = async (task_id: any) => {
  trackerTimer(false, true, task_id);
  // emit("startTimer");
  let exposeData = timeTrackerResult;
  timeTrackerState.end_date = exposeData.end_date;
  timeTrackerState.end_time = exposeData.end_time;
  timeTrackerState.expected_duration =
    exposeData.hr + "h " + exposeData.min + "m " + exposeData.sec + "s";
  timeTrackerState.minit = Number(exposeData.min);
  timeTrackerState.sec = Number(exposeData.sec);
  timeTrackerState.hour = Number(exposeData.hr);
  timeTrackerState.all_seconds = Number(exposeData.all_seconds);

  //Remove task taimer id
  localStorage.removeItem("timer_" + task_id);

  //Remove Interval by Invervalid
  removeIntervalId(task_id);

  await Axios.put("task-timers/" + task_time_id.value, timeTrackerState)
    .then((response) => {
      if (response.data.code != 200) {
        console.log(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
  timeReset();
};

defineExpose({
  startCounter,
  endCounter,
  timeTrackerResult,
});
</script>

<style scoped>
.timer-result {
  font-weight: bold;
  color: black;
}
</style>
