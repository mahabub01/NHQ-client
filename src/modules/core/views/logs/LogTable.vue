<template>
  <div>
    <table class="table" id="selectable-table">
      <thead>
        <tr>
          <th class="col-serial">No</th>
          <th>Table</th>
          <th>Description</th>
          <th>New Data</th>
          <th>Old Data</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody :class="{ tableLoader: $attrs.loadingState }">
        <tr v-for="(td, index) in $attrs.entries" :key="td">
          <td class="col-serial">
            {{ index + 1 }}
          </td>
          <td>{{ td.logName }}</td>
          <td>{{ td.event }}</td>

          <td v-if="td.new_data != null">
            <ul>
              <li v-for="(item, index) in td.new_data" :key="index">
                <template v-if="item != null">
                  <b>{{ index }} :</b> {{ item }}
                </template>
              </li>
            </ul>
          </td>
          <td v-else>N/A</td>

          <td v-if="td.old_data != null">
            <ul>
              <li v-for="(item, index) in td.old_data" :key="index">
                <template v-if="item != null">
                  <b>{{ index }} :</b> {{ item }}
                </template>
              </li>
            </ul>
          </td>
          <td v-else>N/A</td>

          <td>{{ td.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useAttrs, ref, defineEmits, defineProps, defineExpose } from "vue";
import { useStore } from "vuex";
import { usePermission } from "@/composables/permissions";

const { getPermission } = usePermission();

//use store
const store = useStore();

const attrs = useAttrs();

const multiselect = ref([]);
let isCheckAll = ref(false);

const emit = defineEmits(["update:titleSearch", "update:isActiveSearch"]);

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

ol,
ul {
  padding-left: 0;
  margin-bottom: 0;
}
</style>
