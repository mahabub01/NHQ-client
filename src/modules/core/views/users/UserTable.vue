<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
          <th class="col-serial">
            <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
            Serial
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Status</th>
          <th>Edit</th>
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
          <td>{{ td.name }}</td>
          <td>{{ td.email }}</td>
          <td>{{ td.phone }}</td>
          <td>{{ td.role }}</td>
          <td>
            <span v-if="td.is_active == 1" class="activeStatus"
              ><i class="far fa-check-circle"></i>
              {{ isActive(td.is_active) }}</span
            >
            <span v-else class="inactiveStatus"
              ><i class="far fa-times-circle"></i>
              {{ isActive(td.is_active) }}</span
            >
          </td>
          <td>
            <a href="#" @click.prevent="getId(td.id)"
              ><i class="fa fa-pen action-icon"></i
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
                    :to="`/pmm/categories/${td.id}/edit`"
                    class="dropdown-item activeStatus"
                    @click.prevent="changeStatus(td.id, td.is_active)"
                    ><i class="far fa-check-circle"></i> Active</a
                  >
                </li>

                <li>
                  <a
                    href="#"
                    @click.prevent="getIdPassword(td.id)"
                    class="dropdown-item"
                    ><i class="fas fa-key"></i> Change Password</a
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
                <li>
                  <router-link
                    class="dropdown-item"
                    :to="`/core/user-permission/${td.id}`"
                  >
                    <i class="fas fa-cogs"></i> Permissions
                  </router-link>
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
import { useStore } from "vuex";

//use store
const store = useStore();

const attrs = useAttrs();

const multiselect = ref([]);
let isCheckAll = ref(false);

const emit = defineEmits([
  "delete",
  "update:titleSearch",
  "update:isActiveSearch",
  "activation",
  "editId",
  "passwordId",
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

//Get Id Emit use for update
function getId(id: number) {
  emit("editId", id);
}

//Get Id Emit use for change Password
function getIdPassword(id: number) {
  emit("passwordId", id);
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
