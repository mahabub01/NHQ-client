<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
          <th class="col-serial">
            <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
            Serial
          </th>
          <th>Company Name</th>
          <th>Email</th>
          <th>Contact Person Name</th>
          <th>Contact Person Designation</th>
          <th>Contact Person Email</th>
          <th>Contact Person Phone Number</th>
          <th>Number of Projects</th>
          <th>Status</th>
          <th class="action-field">Edit</th>
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
          <td>{{ td.company_name }}</td>
          <td>{{ td.email }}</td>
          <td>{{ td.contact_person_name }}</td>
          <td>{{ td.contact_person_designation }}</td>
          <td>{{ td.contact_person_email }}</td>
          <td>{{ td.contact_person_phone }}</td>
          <td>{{ td.number_of_projects }}</td>
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
          <td class="action-field" style="text-align: center">
            <router-link :to="`/pmm/clients/${td.id}/edit`" title="Edit Project"
              ><i class="fa fa-pen action-icon"></i
            ></router-link>
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
                    :to="`/pmm/categories/${td.id}/edit`"
                    class="dropdown-item activeStatus"
                    @click.prevent="changeStatus(td.id, td.is_active)"
                    ><i class="far fa-check-circle"></i> Active</a
                  >
                </li>
                <li>
                  <router-link
                    :to="`/pmm/clients/${td.id}`"
                    title="Client Details"
                    class="dropdown-item"
                    ><i class="fas fa-eye"></i> Details</router-link
                  >
                </li>
                <li>
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
