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
          <th style="width: 200px">Milestone Name</th>
          <th style="width: 80px">Milestone ID</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Extended</th>
          <th>Milestone Progress</th>
          <th>Priority</th>
          <th>Status</th>

          <th class="action-field align-center">File</th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr v-for="(item, index) in $attrs.entries" :key="index">
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
              <ul class="dropdown-menu table-dropdown" style="width: 165px">
                <li v-if="getPermission(`details_project_list`)">
                  <router-link
                    :to="`/pmm/projects/${item.slug}`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> Details</router-link
                  >
                </li>
              </ul>
            </div>
          </td>
          <td style="width: 200px !important">
            <router-link
              :to="`/pmm/sub-milestones-by-employee/${route.params.user_id}/${route.params.project_id}/${item.id}`"
              >{{ item.milestone_name }}</router-link
            >
          </td>
          <td style="width: 80px">{{ item.milestone_id }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td>{{ item.extended_date }}</td>
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
            style="width: 60px !important"
          ></td>

          <td style="width: 100px !important">
            <select class="show-data-select" style="width: 100%">
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
import {
  useAttrs,
  ref,
  defineEmits,
  defineProps,
  defineExpose,
  reactive,
} from "vue";
import TheSpinner from "@/modules/shared/spinners/TheSpinner.vue";
import Axios from "@/http-common";
import { usePermission } from "@/composables/permissions";
import { useRoute } from "vue-router";

const route = useRoute();

const { getPermission } = usePermission();

const attrs = useAttrs();

const emit = defineEmits(["update:titleSearch"]);

const props = defineProps({
  titleSearch: String,
});

// status
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
  background-color: #714b67 !important;
}
.progress {
  background-color: #c2cfe0 !important;
}
</style>
