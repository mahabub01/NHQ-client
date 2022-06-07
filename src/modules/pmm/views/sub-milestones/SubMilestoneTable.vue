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
          <th
            class="col-serial"
            style="width: 50px !important; text-align: cente"
          >
            Action
          </th>
          <th>Time</th>
          <th style="width: 280px">Sub Milestone Name</th>
          <th>Sub Milestone ID</th>
          <th>Expected</th>
          <th>Actual</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Sub Milestone Progress</th>
          <th class="text-center" style="width: 70px !important">Priority</th>
          <th
            v-if="getPermission(`status_submilestone_list`)"
            style="width: 80px !important"
          >
            Status
          </th>
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

          <td
            class="col-serial"
            style="width: 50px !important; text-align: cente"
          >
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
                <template v-if="getPermission(`time_status_submilestone_list`)">
                  <li
                    style="
                      text-align: center;
                      margin-top: 10px;
                      margin-bottom: 10px;
                    "
                    v-if="timerBtnCond.includes(`${item.id}`)"
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
                </template>

                <li v-if="getPermission(`time_tracker_submilestone_list`)">
                  <router-link
                    v-if="route.params.milestone_id != ''"
                    :to="`/pmm/sub-miletone-time-tracker/${route.params.milestone_id}/${item.id}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> Time
                    Tracker</router-link
                  >
                  <router-link
                    v-else
                    :to="`/pmm/sub-miletone-time-tracker/${item.id}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> Time
                    Tracker</router-link
                  >
                </li>

                <li v-if="getPermission(`details_submilestone_list`)">
                  <router-link
                    v-if="route.params.milestone_id != ''"
                    :to="`/pmm/sub-milestones/${route.params.milestone_id}/details/${item.id}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> Sub Milestone
                    Details</router-link
                  >
                  <router-link
                    v-else
                    :to="`/pmm/sub-milestones/details/${item.id}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> Sub Milestone
                    Details</router-link
                  >
                </li>

                <li v-if="getPermission(`delete_submilestone_list`)">
                  <a
                    href="#"
                    @click.prevent="removeItem(item.id)"
                    class="dropdown-item"
                  >
                    <i class="fas fa-angle-right"></i> Delete</a
                  >
                </li>

                <li
                  style="text-align: center; margin-top: 10px"
                  v-if="getPermission(`add_sub_task_submilestone_list`)"
                >
                  <router-link
                    :to="`/pmm/tasks/${item.id}`"
                    class="btn btn-info icon_btn"
                    style="width: 80%"
                  >
                    <i class="fas fa-plus"></i> Add Task</router-link
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
          <td style="width: 280px">
            <router-link :to="`/pmm/tasks/${item.id}`">
              {{ item.submilestone_name }}
            </router-link>
          </td>
          <td>{{ item.submilestone_unique_id }}</td>
          <td>{{ item.expected_duration }}</td>
          <td>{{ item.actual_duration }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td>
            <div class="progress" style="height: 14px; position: relative">
              <div
                class="progress-bar bg-info change-bg-color"
                role="progressbar"
                :style="`width: ${item.progress}%`"
                :aria-valuenow="`${item.progress}`"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <span class="progress-bar-text-design">{{ item.progress }}%</span>
            </div>
          </td>
          <td
            class="text-center"
            v-html="item.priority"
            style="width: 70px !important"
          ></td>
          <td style="width: 80px !important">
            <select
              style="width: 100%"
              class="show-data-select"
              @change="changeStatus($event, item.id)"
            >
              <template v-for="status in taskStatusSelectable" :key="status.id">
                <option
                  v-if="status.id == item.status"
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
            v-if="getPermission(`edit_submilestone_list`)"
          >
            <router-link
              v-if="route.params.milestone_id != ''"
              :to="`/pmm/sub-milestones/${item.id}/edit/${route.params.milestone_id}`"
              title="Edit Sub Milestone"
              ><i class="fa fa-pen action-icon"></i
            ></router-link>
            <router-link
              v-else
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
import SubMilestoneTimer from "./SubMilestoneTimer.vue";
import { useTimeTracker } from "@/composables/time-tracker";
import { reactive, onMounted } from "vue";
import Axios from "@/http-common";
import toastr from "toastr";
import { useRoute } from "vue-router";
import { usePermission } from "@/composables/permissions";

const { getPermission } = usePermission();

const store = useStore();
const user_id = computed(() => store.state.currentUser.user.id);
const localUser = ref(localStorage.getItem("user_id"));
const route = useRoute();

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

onMounted(() => {
  //get timer id
  let runnig_task_id = localStorage.getItem("submile_" + localUser.value);
  if (runnig_task_id != null) {
    timerBtnCond.value = [];
    timerBtnCond.value.push(runnig_task_id);
  }
});

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
  let oldRtRunningTask = localStorage.getItem("sub_r_t_" + localUser.value);
  if (oldRtRunningTask == null) {
    timerRef.value[index].startCounter(task_id);
    timerBtnCond.value.push(task_id);
    toastr.success("Timer started Successfully.");
  } else {
    toastr.warning(
      "Aready running Task. Please stop it then you can run other task."
    );
  }
}

//End SubMilestone timer
function EndSubMilestoneTimer(index: any, task_id: any) {
  timerRef.value[index].endCounter(task_id);
  timerBtnCond.value = [];
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
  { id: "4", text: "Dependency" },
  { id: "2", text: "Completed" },
]);

//Change selected data status
const selectedStatusId = ref("");
async function changeStatus(event: any, id: number) {
  let result = taskStatusSelectable.filter(
    (item) => item.id == event.target.value
  );
  selectedStatusId.value = result[0].id;

  await Axios.post("/submilestones-status", { id: id, status: result[0] }).then(
    (response) => {
      if (response.data.code == 200) {
        toastr.success("Change Status Successfully");
      } else {
        toastr.error(response.data.message);
      }
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

.progress-bar-text-design {
  font-size: 11px;
  font-weight: bold;
  display: block;
  text-align: center;
  width: 100%;
  position: absolute;
  color: white;
}

.change-bg-color {
  background-color: #017e84 !important;
}
.progress {
  background-color: #c2cfe0 !important;
}
</style>
