<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
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
          <!-- <th>Time</th> -->
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

          <th class="col-icon align-center">File</th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr v-for="(item, index) in entries" :key="item.id">
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
              </ul>
            </div>
          </td>
          <!-- <td>
            <sub-milestone-timer
              :key="item.id"
              :taskId="`${item.id}`"
              ref="timerRef"
            ></sub-milestone-timer>
          </td> -->
          <td style="width: 280px">
            <router-link
              :to="`/pmm/tasks-by-employee/${route.params.user_id}/${route.params.project_id}/${route.params.milestone_id}/${item.id}`"
            >
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
// import SubMilestoneTimer from "./SubMilestoneTimer.vue";
import { useTimeTracker } from "@/composables/time-tracker";
import { reactive, onMounted } from "vue";
import { usePermission } from "@/composables/permissions";
import { useRoute } from "vue-router";

const { getPermission } = usePermission();

const store = useStore();
const user_id = computed(() => store.state.currentUser.user.id);
const localUser = ref(localStorage.getItem("user_id"));
const route = useRoute();

const attrs = useAttrs();

const timerRef = ref();
const timerBtnCond = ref([] as string[]);
const entries = ref();

const { secondsToString } = useTimeTracker();

const emit = defineEmits(["update:nameSearch", "update:isActiveSearch"]);

const props = defineProps({
  nameSearch: String,
  entries: Array,
});

onUpdated(() => {
  entries.value = props.entries;
});

onMounted(() => {
  //get timer id
  let runnig_task_id = localStorage.getItem("submile_" + localUser.value);
  if (runnig_task_id != null) {
    timerBtnCond.value = [];
    timerBtnCond.value.push(runnig_task_id);
  }
});

const taskStatusSelectable = reactive([
  { id: "1", text: "To Do" },
  { id: "3", text: "In Progress" },
  { id: "4", text: "Dependency" },
  { id: "2", text: "Completed" },
]);
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
