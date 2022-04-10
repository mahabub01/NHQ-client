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
          <th>POC ID</th>
          <th>Created Date</th>
          <th>Updated Date</th>
          <th>Scope of Work List</th>
          <th>Latest Version</th>
          <th class="action-field">Edit</th>
          <th class="action-field">File</th>
          <th class="col-serial">Action</th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr v-for="(item, index) in $attrs.entries" :key="index">
          <td class="action-field align-center">
            <input
              type="checkbox"
              v-model="multiselect"
              :value="item.id"
              @change="updateCheckall"
            />
          </td>
          <td>{{ item.poc_id }}</td>
          <td>{{ item.created_at }}</td>
          <td>{{ item.updated_at }}</td>
          <td>{{ item.poc_title }}</td>
          <td>{{ item.version }}</td>
          <td class="action-field" style="text-align: center">
            <a href="#" @click.prevent="getEdit(item.id)" title="Edit POC"
              ><i class="fa fa-pen action-icon"></i
            ></a>
          </td>
          <td class="action-field" style="text-align: center">
            <a href="#" @click.prevent="getFile(item.id)" title="Download File"
              ><i class="fa fa-paperclip action-icon"></i
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
                  -->
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
  "getFiles",
  "edit",
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

//Delete Emit use for Delete
function getFile(pid: number) {
  emit("getFiles", pid);
}

//Get Id Emit use for update
function getEdit(id: number) {
  emit("edit", id);
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
