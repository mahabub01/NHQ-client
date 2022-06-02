<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
          <th class="col-serial" style="width: 20px !important">
            <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
          </th>
          <th
            class="col-serial"
            style="width: 30px !important; text-align: center"
          >
            SL
          </th>
          <th class="col-serial" style="width: 50px !important">Action</th>
          <th>Time</th>
          <th style="width: 280px">Task Name</th>
          <th>Task ID</th>
          <th>Expected</th>
          <th>Actual</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th class="text-center" style="width: 70px !important">Priority</th>
          <th v-if="getPermission(`status_task`)">Status</th>
          <th class="col-icon align-center" v-if="getPermission(`edit_task`)">
            Edit
          </th>
          <th class="col-icon align-center">File</th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr v-for="(item, index) in entries" :key="item.id">
          <td class="col-serial" style="width: 20px !important">
            <input
              type="checkbox"
              v-model="multiselect"
              :value="item.id"
              @change="updateCheckall"
            />
          </td>
          <td
            class="col-serial"
            style="width: 30px !important; text-align: center"
          >
            <span>{{ index + 1 }}</span>
          </td>

          <td class="col-serial" style="width: 50px !important">
            <div class="btn-group">
              <button
                type="button"
                class="table_icon_btn"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                <i class="fas fa-sort-down"></i>
              </button>
              <ul class="dropdown-menu">
                <template v-if="getPermission(`time_status_task`)">
                  <li
                    style="
                      text-align: center;
                      margin-top: 10px;
                      margin-bottom: 10px;
                    "
                    v-if="checkAlreadyExit(`${item.id}`)"
                  >
                    <button
                      type="button"
                      @click="EndTaskTimer(`${index}`, `${item.id}`)"
                      class="btn btn-info icon_btn btn-weight stop-btn-color"
                    >
                      End Time
                    </button>
                  </li>

                  <li
                    style="
                      text-align: center;
                      margin-top: 10px;
                      margin-bottom: 10px;
                    "
                    v-else-if="timerBtnCond.includes(`${item.id}`)"
                  >
                    <button
                      type="button"
                      @click="EndTaskTimer(`${index}`, `${item.id}`)"
                      class="btn btn-info icon_btn btn-weight stop-btn-color"
                    >
                      End Time
                    </button>
                  </li>

                  <li
                    style="
                      text-align: center;
                      margin-top: 10px;
                      margin-bottom: 10px;
                    "
                    v-else
                  >
                    <button
                      type="button"
                      @click="StartTaskTimer(`${index}`, `${item.id}`)"
                      class="btn btn-info icon_btn btn-weight"
                    >
                      Start Time
                    </button>
                  </li>
                </template>

                <li v-if="getPermission(`time_tracker_task`)">
                  <router-link
                    v-if="route.params.submilestone_id != ''"
                    :to="`/pmm/task-time-tracker/${route.params.submilestone_id}/${item.id}`"
                    class="dropdown-item"
                    >Time Tracker</router-link
                  >
                  <router-link
                    v-else
                    :to="`/pmm/task-time-tracker/${item.id}`"
                    class="dropdown-item"
                    >Time Tracker</router-link
                  >
                </li>

                <li v-if="getPermission(`details_task`)">
                  <router-link
                    v-if="route.params.submilestone_id != ''"
                    :to="`/pmm/tasks/${route.params.submilestone_id}/details/${item.id}`"
                    class="dropdown-item"
                    >Task Details</router-link
                  >
                  <router-link
                    v-else
                    :to="`/pmm/tasks/details/${item.id}`"
                    class="dropdown-item"
                    >Task Details</router-link
                  >
                </li>

                <li v-if="getPermission(`delete_task`)">
                  <a
                    href="#"
                    @click.prevent="removeItem(item.id)"
                    class="dropdown-item"
                  >
                    Delete</a
                  >
                </li>
              </ul>
            </div>
          </td>
          <td>
            <task-timer
              :key="index"
              :taskId="`${item.id}`"
              ref="timerRef"
            ></task-timer>
          </td>
          <td style="width: 280px">{{ item.task_name }}</td>
          <td>{{ item.task_unique_id }}</td>
          <td>{{ item.expected_duration }}</td>
          <td>{{ item.actual_duration }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td
            class="text-center"
            v-html="item.priority"
            style="width: 70px !important"
          ></td>
          <td v-if="getPermission(`status_task`)">
            <select
              class="show-data-select"
              @change="changeStatus($event, item.id)"
            >
              <template v-for="status in taskStatusSelectable" :key="status.id">
                <option
                  v-if="status.id == item.task_status"
                  :value="status.id"
                  selected
                >
                  {{ status.text }}
                </option>
                <option v-else :value="status.id">
                  {{ status.text }}
                </option>
              </template>
            </select>
          </td>
          <td
            class="action-field"
            style="text-align: center"
            v-if="getPermission(`edit_task`)"
          >
            <router-link :to="`/pmm/tasks/${item.id}/edit`" title="Edit Task"
              ><i class="fa fa-pen action-icon"></i
            ></router-link>
          </td>

          <td class="action-field" style="text-align: center">
            <a v-if="item.file != ''" :href="`${item.file}`" target="_blank"
              ><i class="fa fa-paperclip action-icon"></i
            ></a>
            <a href="#" onclick="alert('File not uploaded')" v-else
              ><i class="fa fa-paperclip action-icon" style="opacity: 0.6"></i
            ></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import {
  useAttrs,
  ref,
  defineEmits,
  defineProps,
  defineExpose,
  computed,
  onUpdated,
} from "vue";
import TaskTimer from "./TaskTimer.vue";
import { useTimeTracker } from "@/composables/task-time-tracker";
import toastr from "toastr";
import { useRoute } from "vue-router";
import { reactive } from "vue";
import Axios from "@/http-common";
import { usePermission } from "@/composables/permissions";

const { getPermission } = usePermission();

const route = useRoute();

const store = useStore();
const user_id = computed(() => store.state.currentUser.user.id);

const attrs = useAttrs();

const multiselect = ref([]);
let isCheckAll = ref(false);
const timerRef = ref();
const timerBtnCond = ref([] as string[]);
const entries = ref();

const { secondsToString } = useTimeTracker();

const emit = defineEmits([
  "delete",
  "update:nameSearch",
  "update:isActiveSearch",
  "activation",
]);

function checkAlreadyExit(task_id: string) {
  let running = localStorage.getItem("r_t_" + task_id + "_" + user_id.value);
  if (running != "" && running != null) {
    timerBtnCond.value.push(task_id);
    return true;
  }
  return false;
}

const props = defineProps({
  multiselected: Array,
  isActiveSearch: String,
  nameSearch: String,
  entries: Array,
});

onUpdated(() => {
  entries.value = props.entries;
});

defineExpose({ multiselect });

//MultiSelect using checkbox
function checkAll() {
  isCheckAll.value = !isCheckAll.value;
  multiselect.value = [];
  if (isCheckAll.value) {
    for (var key in entries.value) {
      multiselect.value.push(entries.value[key].id);
    }
  }
}

//MultiSelect using checkbox
function updateCheckall() {
  if (multiselect.value.length == entries.value.length) {
    isCheckAll.value = true;
  } else {
    isCheckAll.value = false;
  }
}

//Delete Emit use for Delete
function removeItem(id: number) {
  emit("delete", id);
}

//Start Task Timer
function StartTaskTimer(index: any, task_id: any) {
  timerRef.value[index].startCounter(task_id);
  timerBtnCond.value.push(task_id);
  toastr.success("Timer started Successfully.");
}

//End Task timer
function EndTaskTimer(index: any, task_id: any) {
  timerRef.value[index].endCounter(task_id);
  let arrayIndex = timerBtnCond.value.indexOf(task_id);
  if (arrayIndex > -1) {
    timerBtnCond.value.splice(arrayIndex, 1);
  }
  // let data = attrs.entries.filter((item: any) => item.id != task_id);
  props.entries.forEach((item, index) => {
    if (item.id == task_id) {
      let sumSecond =
        item.actual_s +
        Number(timerRef.value[index].timeTrackerResult.all_seconds);
      item.actual_duration = secondsToString(sumSecond);
      entries.value.push = item;
    } else {
      entries.value.push = item;
    }
  });
  toastr.success("Timer end Successfully.");
}

const taskStatusSelectable = reactive([
  { id: "1", text: "To Do" },
  { id: "3", text: "In Progress" },
  { id: "2", text: "Completed" },
]);

//Change selected data status
const selectedStatusId = ref("");
async function changeStatus(event: any, id: number) {
  let result = taskStatusSelectable.filter(
    (item) => item.id == event.target.value
  );
  selectedStatusId.value = result[0].id;

  await Axios.post("/tasks-status", { id: id, status: result[0] }).then(
    (response) => {
      toastr.success("Change status Successfully.");
    }
  );
}
</script>

<style scoped>
.activeStatus {
  color: green;
}
.inactiveStatus {
  color: red;
}
.col-serial {
  width: 65px !important;
}

.stop-btn-color {
  background-color: brown !important;
}

.btn-weight {
  width: 128px;
}
</style>
