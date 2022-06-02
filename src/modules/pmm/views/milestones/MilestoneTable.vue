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
            <span>SL</span>
          </th>
          <th style="width: 220px">Milestone Name</th>
          <th style="width: 90px !important">Milestone ID</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Extended</th>
          <th>Milestone Progress</th>
          <th class="text-center" style="width: 50px !important">Priority</th>
          <th v-if="getPermission(`status_milestone_list`)">Status</th>
          <th
            class="col-icon align-center"
            v-if="getPermission(`edit_milestone_list`)"
          >
            Edit
          </th>
          <th class="col-icon align-center">File</th>
          <th class="col-serial">Action</th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr v-for="(td, index) in $attrs.entries" :key="td">
          <td class="col-serial" style="width: 20px !important">
            <input
              type="checkbox"
              v-model="multiselect"
              :value="td.id"
              @change="updateCheckall"
            />
          </td>
          <td
            class="col-serial"
            style="width: 30px !important; text-align: center"
          >
            <span>{{ index + 1 }}</span>
          </td>
          <td style="width: 220px">
            <router-link :to="`/pmm/sub-milestones/${td.id}`">{{
              td.milestone_name
            }}</router-link>
          </td>
          <td style="width: 90px !important">{{ td.milestone_id }}</td>
          <td>{{ td.start_date }}</td>
          <td>{{ td.end_date }}</td>
          <td>{{ td.extended_date }}</td>
          <td>
            <div class="progress" style="height: 14px; position: relative">
              <div
                class="progress-bar bg-info change-bg-color"
                role="progressbar"
                :style="`width: ${td.progress}%`"
                :aria-valuenow="`${td.progress}`"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <span class="progress-bar-text-design">{{ td.progress }}%</span>
            </div>
          </td>
          <td
            class="text-center"
            v-html="td.priority"
            style="width: 50px !important"
          ></td>

          <td style="width: 100px !important">
            <select
              class="show-data-select"
              style="width: 100%"
              @change="changeStatus($event, td.id)"
            >
              <template v-for="status in taskStatusSelectable" :key="status.id">
                <option
                  v-if="status.id == td.status"
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
            v-if="getPermission(`edit_milestone_list`)"
          >
            <router-link
              v-if="route.params.project_id != ''"
              :to="`/pmm/milestones/${td.id}/edit/${route.params.project_id}`"
              title="Edit Milestone"
              ><i class="fa fa-pen action-icon"></i
            ></router-link>

            <router-link
              :to="`/pmm/milestones/${td.id}/edit`"
              title="Edit Milestone"
              v-else
              ><i class="fa fa-pen action-icon"></i
            ></router-link>
          </td>

          <td class="action-field" style="text-align: center">
            <a
              v-if="td.file_name != null"
              :href="`${td.file_name}`"
              target="_blank"
              ><i class="fa fa-paperclip action-icon"></i
            ></a>
            <a href="#" onclick="alert('File not uploaded')" v-else
              ><i class="fa fa-paperclip action-icon" style="opacity: 0.6"></i
            ></a>
          </td>

          <td class="col-serial">
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
              <ul class="dropdown-menu table-dropdown dropdown-menu-lg-end">
                <li v-if="getPermission(`delete_milestone_list`)">
                  <a
                    href="#"
                    @click.prevent="removeItem(td.id)"
                    class="dropdown-item"
                    ><i class="fas fa-trash-alt"></i> Delete</a
                  >
                </li>

                <li v-if="getPermission(`details_milestone_list`)">
                  <router-link
                    v-if="route.params.project_id != ''"
                    :to="`/pmm/milestones/details/${td.slug}/${route.params.project_id}`"
                    class="dropdown-item"
                    ><i class="fas fa-eye"></i> Details</router-link
                  >
                  <router-link
                    v-else
                    :to="`/pmm/milestones/details/${td.slug}`"
                    class="dropdown-item"
                    ><i class="fas fa-eye"></i> Details</router-link
                  >
                </li>

                <li
                  style="text-align: center; margin-top: 10px"
                  v-if="getPermission(`display_submilestone_list`)"
                >
                  <router-link
                    :to="`/pmm/sub-milestones/${td.id}`"
                    class="btn btn-info icon_btn"
                    style="width: 80%; font-size: 11px"
                    ><i class="far fa-plus-square"></i> Add Sub
                    Milestone</router-link
                  >
                </li>
              </ul>
            </div>
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
  reactive,
  defineEmits,
  defineProps,
  defineExpose,
} from "vue";
import { usePermission } from "@/composables/permissions";
import { useRoute } from "vue-router";
import Axios from "@/http-common";
import toastr from "toastr";

const { getPermission } = usePermission();

const attrs = useAttrs();
const route = useRoute();
const entries = ref();

const multiselect = ref([]);
let isCheckAll = ref(false);

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
});

// status
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

  await Axios.post("/milestones-status", { id: id, status: result[0] }).then(
    (response) => {
      if (response.data.code == 200) {
        toastr.success("Change Status Successfully");
      } else {
        toastr.error(response.data.message);
      }
    }
  );
}

defineExpose({ multiselect });

//MultiSelect using checkbox
function checkAll() {
  isCheckAll.value = !isCheckAll.value;
  multiselect.value = [];
  if (isCheckAll.value) {
    for (var key in attrs.entries) {
      multiselect.value.push(attrs.entries[key].id);
    }
  }
}

//MultiSelect using checkbox
function updateCheckall() {
  if (multiselect.value.length == attrs.entries.length) {
    isCheckAll.value = true;
  } else {
    isCheckAll.value = false;
  }
}

// //isActive Data
// function isActive(val: number) {
//   if (val == 1) {
//     return "Complete";
//   } else {
//     return "In-Complete";
//   }
// }

//Delete Emit use for Delete
function removeItem(id: number) {
  emit("delete", id);
}

//Change Status
// function changeStatus(id: number, status: number) {
//   let full_status = {
//     id: id,
//     status: status,
//   };
//   emit("activation", full_status);
// }
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
  background-color: #017e84 !important;
}
.progress {
  background-color: #c2cfe0 !important;
}

.text-center {
  text-align: center;
}
</style>
