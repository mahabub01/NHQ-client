<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
          <th
            class="action-field"
            style="width: 20px !important; text-align: center"
          >
            <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
          </th>
          <th>Project Name</th>
          <th>Project ID</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Extended</th>
          <th>Project Progress</th>
          <th>Status</th>
          <th>Milestone Progress</th>
          <th class="col-serial">Edit</th>
          <th class="col-serial">File</th>

          <th class="col-serial">Action</th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr>
          <td class="action-field align-center">
            <input
              type="checkbox"
              v-model="multiselect"
              @change="updateCheckall"
            />
          </td>
          <td>Project name here</td>
          <td>Pro2321</td>
          <td>20/12/2022</td>
          <td>24/12/2022</td>
          <td>30/12/2022</td>
          <td>project progress</td>
          <td>Status</td>
          <td>milesotre progress</td>
          <td class="col-serial">Edit</td>
          <td class="col-serial">File</td>
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
                  <router-link :to="`/pmm/pocs/1`" class="dropdown-item"
                    ><i class="far fa-plus-square"></i> Create POC</router-link
                  >

                  <router-link :to="`/pmm/boq/1`" class="dropdown-item"
                    ><i class="far fa-plus-square"></i> Create BOQ</router-link
                  >

                  <router-link :to="`/pmm/oem/1`" class="dropdown-item"
                    ><i class="far fa-plus-square"></i> Create OEM</router-link
                  >
                  <!-- <a
                    href="#"
                    v-if="td.is_active == 1"
                    class="dropdown-item inactiveStatus"
                    @click.prevent="changeStatus(td.id, td.is_active)"
                    ><i class="far fa-times-circle"></i> In-Active</a
                  >

                  <a
                    href="#"
                    v-else
                    :to="`/pmm/categories/${td.id}/edit`"
                    class="dropdown-item activeStatus"
                    @click.prevent="changeStatus(td.id, td.is_active)"
                    ><i class="far fa-check-circle"></i> Active</a
                  >

                  <router-link
                    :to="`/pmm/categories/${td.id}/edit`"
                    class="dropdown-item"
                    ><i class="fas fa-edit"></i> Edit</router-link
                  >
                  <a
                    href="#"
                    @click.prevent="removeItem(td.id)"
                    class="dropdown-item"
                    ><i class="fas fa-trash-alt"></i> Delete</a
                  > -->
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
