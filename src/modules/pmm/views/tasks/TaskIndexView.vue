<template>
  <div>
    <div class="content-bg-section">
      <div class="content-section">
        <div
          class="container-fluid table-design-container"
          style="padding-bottom: 10px"
        >
          <div class="card" style="border-top: none">
            <div class="page-bootcamp">
              <div class="row">
                <div class="col-md-4">
                  <button class="page-bootcamp-brand">
                    <i class="fas fa-address-card"></i>
                  </button>
                  <div class="page-bootcamp-left">
                    <router-link to="/pmm/tasks" class="rev-underline-subtitle"
                      >Task List</router-link
                    >
                  </div>
                  <div class="page-bootcamp-left">
                    <ul class="page-bootcamp-list">
                      <li v-if="datatables.totalItems != null">
                        <b>Total {{ datatables.totalItems }} Items</b>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-md-8">
                  <div class="page-bootcamp-right">
                    <div>
                      <label class="show-data-label">Show: </label>
                      <select
                        class="show-data-select"
                        @change="paginateEntries($event)"
                        style="margin-right: 7px"
                      >
                        <option
                          v-for="show_en in showEntries"
                          :key="show_en"
                          :value="show_en"
                        >
                          {{ show_en }}
                        </option>
                      </select>

                      <input
                        type="text"
                        placeholder="Search By ID"
                        style="margin-right: 7px"
                        v-model.lazy="search"
                        class="table-search"
                      />

                      <router-link
                        v-if="route.params.submilestone_id != ''"
                        :to="`/pmm/tasks/${route.params.submilestone_id}/create`"
                        class="link_btn"
                        style="margin-right: 7px"
                        ><i class="fas fa-plus"></i> Create</router-link
                      >

                      <router-link
                        v-else
                        :to="`/pmm/tasks/create`"
                        class="link_btn"
                        style="margin-right: 7px"
                        ><i class="fas fa-plus"></i> Create</router-link
                      >

                      <input
                        id="importId"
                        type="file"
                        ref="excelImporter"
                        @change="importExcel()"
                        style="display: none"
                      />
                      <label
                        v-if="userInfo.role_id != 9"
                        for="importId"
                        class="theme-color-btn"
                        style="margin-right: 7px; cursor: pointer"
                        ><i class="fas fa-cloud-upload-alt"></i> Import</label
                      >

                      <div class="btn-group">
                        <button
                          type="button"
                          class="icon_btn page-bootcamp-group-btn"
                          data-bs-toggle="dropdown"
                          data-bs-display="static"
                          aria-expanded="false"
                        >
                          <i class="fas fa-cog"></i> Bulk Action
                        </button>
                        <ul class="dropdown-menu dropdown-menu-lg-end">
                          <li>
                            <a
                              href="#"
                              @click="bulkDelete"
                              class="dropdown-item"
                              ><i class="fas fa-trash-alt"></i> Bulk Delete</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="table_section">
              <div class="row">
                <div class="col-md-12">
                  <div style="overflow-x: auto; margin-bottom: 10px">
                    <task-table
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      v-model:nameSearch.lazy="nameSearch"
                      v-model:isActiveSearch.lazy="isActiveSearch"
                      @delete="remove($event)"
                      @activation="changeStatus($event)"
                      ref="multiselected"
                    ></task-table>

                    <!--start table pagination -->
                    <table-pagination
                      :current-page="datatables.currentPage"
                      :all-pages="datatables.allPages"
                      :have-pagination="datatables.pagination"
                      @pagiPrev="prev()"
                      @pagiNext="next()"
                      @pagiCurrentPage="currentPage($event)"
                    ></table-pagination>
                    <!--end table pagination -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--start Spinner -->
    <the-spinner
      :isdeleting="deletingSpinner"
      :isSaving="savingSpinner"
      :isImporting="importSpinner"
    ></the-spinner>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import Axios from "@/http-common";
import TaskTable from "./TaskTable.vue";
import swal from "sweetalert";
import { useDatatable } from "@/composables/datatables";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import { useStore } from "vuex";
import { useExcelImport } from "@/composables/excel-import";
import { useRoute } from "vue-router";

//create store
const store = useStore();

const route = useRoute();

const userInfo = computed(() => {
  return store.state.currentUser.userPemissions;
});

const user_id = ref(localStorage.getItem("user_id"));
const flag = ref(localStorage.getItem("flag"));

//use for deleting spenner
let deletingSpinner = ref(false);
let savingSpinner = ref(false);

//use for multiselected
const multiselected = ref([]);

//use datatable composables
const {
  entries,
  datatables,
  showEntries,
  currentEntries,
  fetchData,
  filterData,
} = useDatatable();

//Search Property
let nameSearch = ref("");
let isActiveSearch = ref("");

//search field
let search = ref("");

//filter by POC ID/ Poc title
watch([search], async () => {
  filterData(
    "/tasks",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&search=" +
      search.value +
      "&submilestone_id=" +
      route.params.submilestone_id
  );
});

//Load Data form computed onMounted
onMounted(() => {
  filterData(
    "/tasks",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&submilestone_id=" +
      route.params.submilestone_id
  );
});

//show data using show Menu
function paginateEntries(e: any) {
  currentEntries.value = e.target.value;
  filterData(
    "/tasks",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&submilestone_id=" +
      route.params.submilestone_id
  );
}

//show previous page data
function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    filterData(
      "/tasks",
      "&user_id=" +
        user_id.value +
        "&flag=" +
        flag.value +
        "&submilestone_id=" +
        route.params.submilestone_id
    );
  }
}

//show next page data
function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    filterData(
      "/tasks",
      "&user_id=" +
        user_id.value +
        "&flag=" +
        flag.value +
        "&submilestone_id=" +
        route.params.submilestone_id
    );
  }
}

//show current Page Data
function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  filterData(
    "/tasks",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&submilestone_id=" +
      route.params.submilestone_id
  );
}

//Delete selected Item
function remove(id: number) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this record!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      deletingSpinner.value = true;
      await Axios.delete("/tasks/" + id).then((response) => {
        entries.value = entries.value.filter(
          (e: { id: number }) => e.id !== id
        );
        deletingSpinner.value = false;
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      });
    }
  });
}

//Delete multiselected data
function bulkDelete() {
  if (multiselected.value.multiselect == "") {
    swal("Warning", "Please select at-least one record", "warning");
    return;
  }

  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this record!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      deletingSpinner.value = true;
      await Axios.post("/tasks/tasks-multidelete", {
        ids: multiselected.value.multiselect,
      }).then((response) => {
        filterData(
          "/tasks",
          "&user_id=" +
            user_id.value +
            "&flag=" +
            flag.value +
            "&submilestone_id=" +
            route.params.submilestone_id
        );
        deletingSpinner.value = false;
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      });
    }
  });
}

//Import Task
const { excelImport, importSpinner } = useExcelImport();
const excelImporter = ref();
function importExcel() {
  //fileUploader.value.files[0]
  excelImport("tasks-import", excelImporter.value.files[0]);
  filterData(
    "/tasks",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&submilestone_id=" +
      route.params.submilestone_id
  );
}

//Change selected data status
// async function changeStatus(status: { id: number; status: number }) {
//   await Axios.post("/tasks-status", status).then((response) => {
//     swal("Your data status changed", {
//       icon: "success",
//     });
//     fetchData("/tasks");
//   });
// }
</script>

<style scoped></style>
