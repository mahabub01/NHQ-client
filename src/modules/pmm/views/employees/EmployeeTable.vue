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
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Depertment</th>
          <th>Designation</th>
          <th>Employee ID</th>
          <th>Status</th>
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
              <ul class="dropdown-menu table-dropdown">
                <li v-if="getPermission(`status_employee`)">
                  <a
                    href="#"
                    v-if="td.is_active == 1"
                    class="dropdown-item inactiveStatus"
                    @click.prevent="changeStatus(td.id, td.is_active)"
                    ><i class="fas fa-angle-right"></i> In-Active</a
                  >

                  <a
                    href="#"
                    v-else
                    :to="`/pmm/categories/${td.id}/edit`"
                    class="dropdown-item activeStatus"
                    @click.prevent="changeStatus(td.id, td.is_active)"
                    ><i class="fas fa-angle-right"></i> Active</a
                  >
                </li>
                <li v-if="getPermission(`edit_employee`)">
                  <router-link
                    :to="`/pmm/employees/${td.id}/edit`"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> Edit</router-link
                  >
                </li>
                <li v-if="getPermission(`delete_employee`)">
                  <a
                    href="#"
                    @click.prevent="removeItem(td.id)"
                    class="dropdown-item"
                    ><i class="fas fa-angle-right"></i> Delete</a
                  >
                </li>
              </ul>
            </div>
          </td>

          <td style="width: 220px">
            <router-link :to="`/pmm/projects-by-employee/${td.id}`">{{
              td.name
            }}</router-link>
          </td>
          <td>{{ td.email }}</td>
          <td>{{ td.phone }}</td>
          <td>{{ td.department }}</td>
          <td>{{ td.designation }}</td>
          <td>{{ td.employee_id }}</td>

          <td>
            <span v-if="td.is_active == 1" class="activeStatus"
              ><i class="far fa-check-circle"></i> {{ isActive(td.is_active) }}
              {{ td.is_active }}</span
            >
            <span v-else class="inactiveStatus"
              ><i class="far fa-times-circle"></i>
              {{ isActive(td.is_active) }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useAttrs, ref, defineEmits, defineProps, defineExpose } from "vue";
import { usePermission } from "@/composables/permissions";

const { getPermission } = usePermission();

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
