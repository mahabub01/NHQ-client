<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
          <th class="col-serial">
            <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
            Serial
          </th>
          <th class="col-serial" style="width: 50px !important"></th>
          <th>Time</th>
          <th style="width: 280px">Submilestone Name</th>
          <th>Submilestone ID</th>
          <th style="width: 80px !important">Project ID</th>
          <th>Milestone ID</th>
          <th>Expected</th>
          <th>Actual</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Task Progress</th>
          <th v-if="getPermission(`status_submilestone_list`)">Status</th>
          <th
            class="col-icon align-center"
            v-if="getPermission(`edit_submilestone_list`)"
          >
            Edit
          </th>
          <th class="col-icon align-center">File</th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr v-for="(item, index) in entries" :key="item.id">
          <td class="col-serial">
            <input
              type="checkbox"
              v-model="multiselect"
              :value="item.id"
              @change="updateCheckall"
            />
            {{ index + 1 }}
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
                    @click="EndSubMilestoneTimer(`${index}`, `${item.id}`)"
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
                    @click="EndSubMilestoneTimer(`${index}`, `${item.id}`)"
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
                    @click="StartSubMilestoneTimer(`${index}`, `${item.id}`)"
                    class="btn btn-info icon_btn btn-weight"
                  >
                    Start Time
                  </button>
                </li>
                <li v-if="getPermission(`time_tracker_submilestone_list`)">
                  <router-link
                    :to="`/pmm/sub-miletone-time-tracker/${item.id}`"
                    class="dropdown-item"
                    >Time Tracker</router-link
                  >
                </li>

                <li v-if="getPermission(`details_submilestone_list`)">
                  <router-link
                    :to="`/pmm/submilestones/details/${item.id}`"
                    class="dropdown-item"
                    >Submilestone Details</router-link
                  >
                </li>

                <!-- <li>
                  <router-link
                    :to="`/pmm/tasks/${item.id}/edit`"
                    class="dropdown-item"
                  >
                    Edit</router-link
                  >
                </li> -->

                <li v-if="getPermission(`delete_submilestone_list`)">
                  <a
                    href="#"
                    @click.prevent="removeItem(item.id)"
                    class="dropdown-item"
                  >
                    Delete</a
                  >
                </li>

                <li
                  style="text-align: center; margin-top: 10px"
                  v-if="getPermission(`add_sub_task_submilestone_list`)"
                >
                  <router-link
                    :to="`/pmm/milestones/${item.id}`"
                    class="btn btn-info icon_btn"
                    style="width: 80%"
                  >
                    <i class="fas fa-plus"></i> Add Sub Task</router-link
                  >
                </li>
              </ul>
            </div>
          </td>
          <td>
            <sub-milestone-timer
              :key="item.id"
              :taskId="`${item.id}`"
              ref="timerRef"
            ></sub-milestone-timer>
          </td>
          <td style="width: 280px">{{ item.submilestone_name }}</td>
          <td>{{ item.submilestone_unique_id }}</td>
          <td style="width: 80px !important">{{ item.project_ID }}</td>
          <td>{{ item.milestone_ID }}</td>
          <td>{{ item.expected_duration }}</td>
          <td>{{ item.actual_duration }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td>
            <div class="progress" style="height: 11px">
              <div
                class="progress-bar bg-info"
                role="progressbar"
                style="width: 75%"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                75%
              </div>
            </div>
          </td>
          <td>{{ item.status }}</td>
          <td
            class="action-field"
            style="text-align: center"
            v-if="getPermission(`edit_submilestone_list`)"
          >
            <router-link
              :to="`/pmm/sub-milestones/${item.id}/edit`"
              title="Edit Sub Milestone"
              ><i class="fa fa-pen action-icon"></i
            ></router-link>
          </td>

          <td class="action-field" style="text-align: center">
            <a v-if="item.files != null" :href="`${item.files}`" target="_blank"
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
import TheTimer from "./TheTimer.vue";
import SubMilestoneTimer from "./SubMilestoneTimer.vue";
import { useTimeTracker } from "@/composables/time-tracker";
import toastr from "toastr";
import { usePermission } from "@/composables/permissions";

const { getPermission } = usePermission();

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

//Start SubMilestone Timer
function StartSubMilestoneTimer(index: any, task_id: any) {
  timerRef.value[index].startCounter(task_id);
  timerBtnCond.value.push(task_id);
  toastr.success("Timer started Successfully.");
}

//End SubMilestone timer
function EndSubMilestoneTimer(index: any, task_id: any) {
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
//<td>{{ item.hour }}h {{ item.minit }}m {{ item.sec }}s</td>
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
