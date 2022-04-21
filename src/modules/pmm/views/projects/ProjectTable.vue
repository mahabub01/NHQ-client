<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
          <th class="action-field col-serial">
            <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
            Serial
          </th>
          <th>Project Name</th>
          <th>Project ID</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Extended</th>
          <th>Project Progress</th>
          <th>Status</th>
          <th>Milestone Progress</th>
          <th class="action-field align-center">Edit</th>
          <th class="action-field align-center">File</th>

          <th class="col-serial">Action</th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr v-for="(item, index) in $attrs.entries" :key="index">
          <td class="action-field col-serial">
            <input
              type="checkbox"
              v-model="multiselect"
              @change="updateCheckall"
              :value="item.id"
            />
            {{ index + 1 }}
          </td>
          <td>{{ item.project_name }}</td>
          <td>{{ item.project_ID }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td>{{ item.extended_date }}</td>
          <td>
            <div class="progress" style="height: 14px">
              <div
                class="progress-bar bg-info"
                role="progressbar"
                style="width: 50%"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                50%
              </div>
            </div>
          </td>
          <td>{{ item.status }}</td>
          <td>
            <div class="progress" style="height: 14px">
              <div
                class="progress-bar bg-warning"
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
          <td class="action-field" style="text-align: center">
            <router-link
              :to="`/pmm/projects/${item.id}/edit`"
              title="Edit Project"
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
                <li>
                  <router-link
                    :to="`/pmm/pocs/${item.id}`"
                    class="dropdown-item"
                    ><i class="far fa-plus-square"></i> Create POC</router-link
                  >

                  <router-link
                    :to="`/pmm/boqs/${item.id}`"
                    class="dropdown-item"
                    ><i class="far fa-plus-square"></i> Create BOQ</router-link
                  >

                  <router-link
                    :to="`/pmm/oems/${item.id}`"
                    class="dropdown-item"
                    ><i class="far fa-plus-square"></i> Create OEM</router-link
                  >

                  <router-link
                    :to="`/pmm/projects/${item.slug}`"
                    class="dropdown-item"
                    ><i class="fas fa-eye"></i> Details</router-link
                  >

                  <a
                    href="#"
                    @click.prevent="removeItem(item.id)"
                    class="dropdown-item"
                    ><i class="fas fa-trash-alt"></i> Delete</a
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
import { useAttrs, ref, defineEmits, defineProps, defineExpose } from "vue";

const attrs = useAttrs();

const multiselect = ref([]);
let isCheckAll = ref(false);

const emit = defineEmits([
  "delete",
  "update:titleSearch",
  "update:isActiveSearch",
  "activation",
]);

const props = defineProps({
  multiselected: Array,
  isActiveSearch: String,
  titleSearch: String,
});

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

//isActive Data
function isActive(val: number) {
  if (val == 1) {
    return "Active";
  } else {
    return "In-Active";
  }
}

//Delete Emit use for Delete
function removeItem(id: number) {
  emit("delete", id);
}

//Change Status
function changeStatus(id: number, status: number) {
  let full_status = {
    id: id,
    status: status,
  };
  emit("activation", full_status);
}
</script>

<style scoped>
.activeStatus {
  color: green;
}
.inactiveStatus {
  color: red;
}
</style>
