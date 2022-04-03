<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
          <th class="col-serial">Serial</th>
          <th>Task Name</th>
          <th>Task ID</th>
          <th>Project ID</th>
          <th>Expected</th>
          <th>Accepted</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Extended</th>
          <th>Task Progress</th>
          <th>Status</th>
          <th>Milestone Progress</th>
          <th class="col-icon">Edit</th>
          <th class="col-icon">File</th>
          <th class="col-serial">Action</th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr v-for="(td, index) in $attrs.entries" :key="td">
          <td class="col-serial">
            <input
              type="checkbox"
              v-model="multiselect"
              :value="td.id"
              @change="updateCheckall"
            />
            {{ index + 1 }}
          </td>
          <td>NHQ Project Management</td>
          <td>NP-T-1</td>
          <td>NP-T-1</td>
          <td>3hr</td>
          <td>3hr</td>
          <td>Feb 27, 2022</td>
          <td>April 27, 2022</td>
          <td>5 Days</td>
          <td>Task Progress</td>
          <td>copmplete</td>
          <td>Milestone Progress</td>
          <td class="col-icon"><i class="fa fa-pen"></i></td>
          <td class="col-icon"><i class="fa fa-paperclip"></i></td>

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
              <ul class="dropdown-menu table-dropdown">
                <li>
                  <a
                    href="#"
                    v-if="td.is_active == 1"
                    class="dropdown-item inactiveStatus"
                    @click.prevent="changeStatus(td.id, td.is_active)"
                    ><i class="far fa-times-circle"></i> In-Active</a
                  >

                  <a
                    href="#"
                    v-else
                    :to="`/pmm/employees/${td.id}/edit`"
                    class="dropdown-item activeStatus"
                    @click.prevent="changeStatus(td.id, td.is_active)"
                    ><i class="far fa-check-circle"></i> Active</a
                  >

                  <router-link
                    :to="`/pmm/employees/${td.id}/edit`"
                    class="dropdown-item"
                    ><i class="fas fa-edit"></i> Edit</router-link
                  >
                  <a
                    href="#"
                    @click.prevent="removeItem(td.id)"
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
  "update:nameSearch",
  "update:isActiveSearch",
  "activation",
]);

const props = defineProps({
  multiselected: Array,
  isActiveSearch: String,
  nameSearch: String,
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
