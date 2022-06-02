<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
          <th class="col-serial">
            <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
            Serial
          </th>
          <th>Title</th>
          <th style="width: 30% !important">Description</th>
          <th>Uploaded File</th>
          <th
            class="action-field align-center"
            v-if="getPermission(`edit_disti_order`)"
          >
            Edit
          </th>
          <th>Files</th>
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
          <td>{{ item.title }}</td>
          <td style="width: 30% !important">{{ item.description }}</td>
          <td>
            <template v-if="item.file != 0">
              {{ item.file.length }} Files
            </template>
            <template v-else>N/A</template>
          </td>
          <td
            class="action-field"
            style="text-align: center"
            v-if="getPermission(`edit_disti_order`)"
          >
            <a
              href="#"
              @click.prevent="getEdit(item.id)"
              title="Edit Disti Order"
              ><i class="fa fa-pen action-icon"></i
            ></a>
          </td>

          <td>
            <a
              v-if="item.file.length != 0"
              @click.prevent="file_id(item.id)"
              href="#"
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
                    :to="`/pmm/disti-orders/details/${item.id}`"
                    class="dropdown-item"
                    ><i class="fas fa-eye"></i> Details</router-link
                  >
                </li>

                <li v-if="getPermission(`delete_disti_order`)">
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
import { usePermission } from "@/composables/permissions";

const { getPermission } = usePermission();
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
  "file",
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

//Get Id Emit use for file show
function file_id(id: number) {
  emit("file", id);
}
</script>

<style scoped>
.action-field {
  width: 30px !important;
}
</style>
