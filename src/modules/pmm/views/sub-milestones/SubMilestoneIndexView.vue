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
                    <router-link
                      v-if="route.params.milestone_id != ''"
                      :to="`/pmm/sub-milestones/${route.params.milestone_id}`"
                      class="rev-underline-subtitle"
                      >Sub Milestone List</router-link
                    >
                    <router-link
                      v-else
                      to="/pmm/sub-milestones"
                      class="rev-underline-subtitle"
                      >Sub Milestone List</router-link
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

                      <button
                        type="button"
                        class="link_btn"
                        style="margin-right: 7px"
                        @click="
                          store.commit('modalModule/CHNAGE_FILTER_MODAL', true)
                        "
                      >
                        <i class="fas fa-filter"></i>
                      </button>

                      <template
                        v-if="getPermission(`create_submilestone_list`)"
                      >
                        <router-link
                          v-if="route.params.milestone_id != ''"
                          :to="`/pmm/sub-milestones/create/${route.params.milestone_id}`"
                          class="link_btn"
                          style="margin-right: 7px"
                          ><i class="fas fa-plus"></i> Create</router-link
                        >

                        <router-link
                          v-else
                          to="/pmm/sub-milestones/create"
                          class="link_btn"
                          style="margin-right: 7px"
                          ><i class="fas fa-plus"></i> Create</router-link
                        >
                      </template>

                      <input
                        id="importId"
                        type="file"
                        ref="excelImporter"
                        @change="importExcel()"
                        style="display: none"
                      />
                      <label
                        v-if="getPermission(`import_submilestone_list`)"
                        for="importId"
                        class="theme-color-btn"
                        style="margin-right: 7px; cursor: pointer"
                        ><i class="fas fa-cloud-upload-alt"></i> Import</label
                      >

                      <button
                        type="button"
                        class="link_btn"
                        style="margin-right: 7px"
                        @click="exportSubmilestone()"
                      >
                        <i class="fas fa-file-excel"></i> Export
                      </button>

                      <div
                        class="btn-group"
                        v-if="getPermission(`bulk_delete_submilestone_list`)"
                      >
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
                          <li>
                            <a
                              href="#"
                              @click="bulkDelete"
                              class="dropdown-item"
                              ><i class="fas fa-download"></i> Download Import
                              template</a
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
                    <sub-milestone-table
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      v-model:nameSearch.lazy="nameSearch"
                      v-model:isActiveSearch.lazy="isActiveSearch"
                      @delete="remove($event)"
                      ref="multiselected"
                    ></sub-milestone-table>

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

  <!--start Filter Modal -->
  <div>
    <filter-modal>
      <template v-slot:header
        ><i class="fas fa-filter"></i> Filter Submilestone
      </template>
      <template v-slot:body>
        <form @submit.prevent="filterSubmit" class="form-page">
          <div class="row">
            <div class="col-md-4 mb_30">
              <label class="form-label"> Name/ID </label>
              <input
                type="text"
                class="form-input"
                v-model="filterState.submilestone_name_id"
              />
            </div>

            <div class="col-md-4 mb_30">
              <label class="form-label"> Project List </label>
              <Select2
                v-model="filterState.project_id"
                :options="projectSelectable"
                :settings="{ placeholder: 'Choose' }"
              />
            </div>

            <div class="col-md-4 mb_30">
              <label class="form-label"> Milestone List </label>
              <Select2
                v-model="filterState.milestone_id"
                :options="milestoneSelectable"
                :settings="{ placeholder: 'Choose' }"
              />
            </div>

            <!-- <div class="col-md-4 mb_30">
              <label class="form-label"> Submilestone Category List </label>
              <Select2
                v-model="filterState.submilestone_category_id"
                :options="submilestoneCategorySelectable"
                :settings="{ placeholder: 'Choose' }"
              />
            </div> -->

            <div class="col-md-4 mb_30">
              <label class="form-label"> Extend Date </label>
              <datepicker :value="filterState.extended_date"></datepicker>
            </div>
            <div class="col-md-4 mb_30">
              <label class="form-label"> Start Date</label>
              <datepicker :value="filterState.start_date"></datepicker>
            </div>
            <div class="col-md-4 mb_30">
              <label class="form-label"> End Date</label>
              <datepicker :value="filterState.end_date"></datepicker>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="form-button-danger"
              data-bs-dismiss="modal"
              @click.prevent="
                store.commit('modalModule/CHNAGE_FILTER_MODAL', false)
              "
            >
              <i class="far fa-times-circle"></i> Close
            </button>
            <button type="submit" class="form-button">
              <i class="fas fa-filter"></i> Filter
            </button>
          </div>
        </form>
      </template>
    </filter-modal>
  </div>
  <!--end Filter Modal -->
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed, reactive } from "vue";
import Axios from "@/http-common";
import SubMilestoneTable from "./SubMilestoneTable.vue";
import swal from "sweetalert";
import { useDatatable } from "@/composables/datatables";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import { useStore } from "vuex";
import { useExcelImport } from "@/composables/excel-import";
import FilterModal from "../../../core/shared/FilterModal.vue";
import Select2 from "vue3-select2-component";
import { useRoute } from "vue-router";
import { usePermission } from "@/composables/permissions";
import { useExcelExport } from "@/composables/export-excel";
import toastr from "toastr";
import Datepicker from "vuejs3-datepicker";

const { getPermission } = usePermission();
//create store
const store = useStore();

const route = useRoute();

// const userInfo = computed(() => {
//   return store.state.currentUser.userPemissions;
// });

const user = computed(() => {
  return store.state.currentUser.user;
});

const flag = ref(localStorage.getItem("flag"));
const user_id = ref(localStorage.getItem("user_id"));

const filterState = reactive({
  project_id: "",
  milestone_id: "",
  // submilestone_category_id: "",
  submilestone_name_id: "",
  extended_date: "",
  start_date: "",
  end_date: "",
});

//use for deleting spenner
let deletingSpinner = ref(false);
let savingSpinner = ref(false);

//use for multiselected
const multiselected = ref([]);

//use datatable composables
const { entries, datatables, showEntries, currentEntries, filterData } =
  useDatatable();

//Search Property
let nameSearch = ref("");
let isActiveSearch = ref("");

//search field
let search = ref("");

//filter by POC ID/ Poc title
watch([search], async () => {
  //fetchData("/tasks", search.value);
  filterData(
    "/tasks",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&search=" +
      search.value +
      "&milestone_id=" +
      route.params.milestone_id
  );
});

//Load Data form computed onMounted
onMounted(() => {
  filterData(
    "/submilestones",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&milestone_id=" +
      route.params.milestone_id
  );
  getProjects();
  getMilestones();
  // getSubmilestoneCategories();
});

let filteringSpinner = ref(false);

async function filterSubmit() {
  store.commit("modalModule/CHNAGE_FILTER_MODAL", false);
  datatables.loadingState = true;
  filteringSpinner.value = true;

  await Axios.post("submilestones-filter", filterState).then((response) => {
    filteringSpinner.value = false;
    entries.value = response.data.data;
    datatables.totalItems = response.data.meta.total;
    datatables.currentPage = response.data.meta.current_page;
    datatables.allPages = response.data.meta.last_page;
    datatables.pagination = response.data.meta.links;
    datatables.loadingState = false;
  });
}

const projectSelectable = ref([]);
const milestoneSelectable = ref([]);
// const submilestoneCategorySelectable = ref([]);

//get milestones for Selectable
async function getProjects() {
  await Axios.get("/project-selectable")
    .then((response) => {
      if (response.data.code === 200) {
        projectSelectable.value = response.data.data;
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

//get milestones for Selectable
async function getMilestones() {
  await Axios.get("/milestones-selectable")
    .then((response) => {
      if (response.data.code === 200) {
        milestoneSelectable.value = response.data.data;
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

//show data using show Menu
function paginateEntries(e: any) {
  currentEntries.value = e.target.value;
  filterData(
    "/submilestones",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&milestone_id=" +
      route.params.milestone_id
  );
}

//show previous page data
function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    filterData(
      "/submilestones",
      "&user_id=" +
        user_id.value +
        "&flag=" +
        flag.value +
        "&milestone_id=" +
        route.params.milestone_id
    );
  }
}

//show next page data
function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    filterData(
      "/submilestones",
      "&user_id=" +
        user_id.value +
        "&flag=" +
        flag.value +
        "&milestone_id=" +
        route.params.milestone_id
    );
  }
}

//show current Page Data
function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  filterData(
    "/submilestones",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&milestone_id=" +
      route.params.milestone_id
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
      await Axios.delete("/submilestones/" + id).then((response) => {
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
      await Axios.post("/submilestones/multidelete", {
        ids: multiselected.value.multiselect,
      }).then((response) => {
        filterData(
          "/submilestones",
          "&user_id=" +
            user_id.value +
            "&flag=" +
            flag.value +
            "&milestone_id=" +
            route.params.milestone_id
        );
        deletingSpinner.value = false;
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      });
    }
  });
}

//Start Export
const { excelExport } = useExcelExport(true, true); //Have title and Subtitle in excel file
const exportTitle = "Sub Milestone List";
const exportSubtitle =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry";
const exportHeader: any = [
  "SL",
  "Project Name",
  "Milestone Name",
  "Submilestone Name",
  "Duration (Minutes)",
  "Points",
];
const exportColumn: any = [
  { key: "id" },
  { key: "project_name" },
  { key: "milestone_name" },
  { key: "submilestone_name" },
  { key: "duration" },
  { key: "points" },
];

const exportSpinner = ref(false);

async function exportSubmilestone() {
  exportSpinner.value = true;
  await Axios.post("/submilestones-export", {
    milestone_id: route.params.milestone_id,
    user_id: user_id.value,
    flag: flag.value,
    search: search.value,
  }).then((response) => {
    exportSpinner.value = false;
    if (response.data.code == 200) {
      excelExport(
        response.data.data,
        exportHeader,
        exportColumn,
        exportTitle,
        exportSubtitle
      );
    } else {
      toastr.error(response.data.message);
    }
  });
}

//Import Task
const { excelImport, importSpinner } = useExcelImport();
const excelImporter = ref();
function importExcel() {
  //fileUploader.value.files[0]
  excelImport("submilestones-import", excelImporter.value.files[0]);
  filterData(
    "/submilestones",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&milestone_id=" +
      route.params.milestone_id
  );
}
</script>

<style scoped></style>
