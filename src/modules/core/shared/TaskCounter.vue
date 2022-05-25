<template>
  <div>
    <div class="counter-container">
      <h1>
        {{ TimeTrackerDisplay.hr }} : {{ TimeTrackerDisplay.min }} :
        {{ TimeTrackerDisplay.sec }}
      </h1>
      <button
        v-if="isStartTimer"
        class="btn btn-danger circle-counter-stop-btn counter-btn-margine"
        @click="endCounter()"
      >
        Stop
      </button>
      <button
        v-else
        class="btn btn-info circle-counter-btn counter-btn-margine"
        @click="startCounter()"
      >
        Start
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineExpose, defineProps, onMounted } from "vue";
import { useTimeTracker } from "@/composables/task-time-tracker";

const isStartTimer = ref(false);

const emit = defineEmits(["timerStart", "timerEnd"]);

const {
  TimeTrackerDisplay,
  timeTrackerResult,
  trackerTimer,
  timeReset,
  removeIntervalId,
  storeIntervalId,
} = useTimeTracker();

const props = defineProps({
  taskid: { type: String, required: true },
  userid: { type: Number, required: true },
});

onMounted(() => {
  let running = localStorage.getItem(
    "r_t_" + props.taskid + "_" + props.userid
  );

  //when start from time tracker page
  let exits_time_tracker = localStorage.getItem(
    "r_t_counter_" + props.taskid + "_" + props.userid
  );

  if (exits_time_tracker != null) {
    let getable: string[] = [
      JSON.parse(exits_time_tracker).h,
      JSON.parse(exits_time_tracker).m,
      JSON.parse(exits_time_tracker).s,
      JSON.parse(exits_time_tracker).ats,
    ];
    trackerTimer(true, true, String(props.taskid), true, getable, "counter");
    isStartTimer.value = true;
    storeIntervalId(Number(props.taskid), Number(timeTrackerResult.intervalId));
  } else if (running != null) {
    let getable: string[] = [
      JSON.parse(running).h,
      JSON.parse(running).m,
      JSON.parse(running).s,
      JSON.parse(running).ats,
    ];
    trackerTimer(true, true, String(props.taskid), true, getable, "counter");
    isStartTimer.value = true;
    storeIntervalId(Number(props.taskid), Number(timeTrackerResult.intervalId));
  }
});

function startCounter() {
  trackerTimer(true, true, String(props.taskid), true, [], "counter");
  storeIntervalId(Number(props.taskid), Number(timeTrackerResult.intervalId));
  isStartTimer.value = true;
  emit("timerStart");
}

function endCounter() {
  trackerTimer(false, true, String(props.taskid), true, []);
  //Remove Interval by Invervalid
  removeIntervalId(Number(props.taskid));
  isStartTimer.value = false;
  timeReset();
  emit("timerEnd");
}

defineExpose({ timeTrackerResult, startCounter, endCounter });
</script>

<style scoped>
.circle-counter-btn {
  border-radius: 50%;
  height: 146px;
  width: 150px;
  font-size: 35px;
  color: white;
  text-transform: uppercase;
  background-image: radial-gradient(#0fabb0, #017e84);
  font-weight: 600;
}

.circle-counter-stop-btn {
  border-radius: 50%;
  height: 146px;
  width: 150px;
  font-size: 35px;
  color: white;
  text-transform: uppercase;
  background-image: radial-gradient(#b70606, #8b0505);
  font-weight: 600;
}

.circle-counter-btn:hover {
  background-color: #027076;
}

.counter-container {
  margin-top: 100px;
}

.counter-container h1 {
  font-size: 40px;
  font-weight: bolder;
}

.counter-container .counter-btn-margine {
  margin-left: 21px;
  margin-top: 26px;
}
</style>
