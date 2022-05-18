<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
          <th class="col-serial">
            <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
            Serial
          </th>
          <th>Project ID</th>
          <th>Created Date</th>
          <th>Updated Date</th>
          <th style="width: 40% !important">Scope of Work List</th>
          <th>Section Category</th>
          <th class="action-field">Edit</th>
          <th class="action-field">File</th>
          <th class="col-serial">Action</th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr v-for="(item, index) in $attrs.entries" :key="index">
          <td class="col-serial">
            <input
              type="checkbox"
              v-model="multiselect"
              :value="item.id"
              @change="updateCheckall"
            />
            {{ index + 1 }}
          </td>
          <td>{{ item.boq_unique_id }}</td>
          <td>{{ item.created_at }}</td>
          <td>{{ item.updated_at }}</td>
          <td style="width: 40% !important">{{ item.boq_title }}</td>
          <td>{{ item.category }}</td>
          <td class="action-field" style="text-align: center">
            <a href="#" @click.prevent="getEdit(item.id)" title="Edit Boq"
              ><i class="fa fa-pen action-icon"></i
            ></a>
          </td>
          <td class="action-field" style="text-align: center">
            <a v-if="item.file != null" :href="`${item.file}`" target="_blank"
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
                  <router-link
                    :to="`/pmm/boqs/details/${item.slug}`"
                    class="dropdown-item"
                    ><i class="fas fa-eye"></i> Details</router-link
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
.action-field {
  width: 30px !important;
}
</style>
