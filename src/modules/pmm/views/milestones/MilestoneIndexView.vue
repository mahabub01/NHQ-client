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
                    <a class="rev-underline-subtitle" href=""
                      >Milestones List</a
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
                        v-model.lazy="nameSearch"
                        placeholder="Search Milestone"
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

                      <template v-if="route.params.project_id != ''">
                        <router-link
                          v-if="getPermission(`create_milestone_list`)"
                          :to="`/pmm/milestones/create/${route.params.project_id}`"
                          class="link_btn"
                          style="margin-right: 7px"
                          ><i class="fas fa-plus"></i> Create</router-link
                        >
                      </template>
                      <template v-else>
                        <router-link
                          v-if="getPermission(`create_milestone_list`)"
                          to="/pmm/milestones/create"
                          class="link_btn"
                          style="margin-right: 7px"
                          ><i class="fas fa-plus"></i> Create</router-link
                        >
                      </template>

                      <div class="btn-group">
                        <button
                          v-if="getPermission(`bulk_delete_milestone_list`)"
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
                    <milestone-table
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      v-model:nameSearch.lazy="nameSearch"
                      @delete="remove($event)"
                      @activation="changeStatus($event)"
                      ref="multiselected"
                    ></milestone-table>

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
    ></the-spinner>

    <!--start Filter Modal -->
    <div>
      <filter-modal>
        <template v-slot:header
          ><i class="fas fa-filter"></i> Filter Milestone
        </template>
        <template v-slot:body>
          <form @submit.prevent="filterSubmit" class="form-page">
            <div class="row">
              <div class="col-md-4 mb_30">
                <label class="form-label"> Name/ID </label>
                <input
                  type="text"
                  class="form-input"
                  v-model="filterState.milestone_name_id"
                />
              </div>

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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive } from "vue";
import swal from "sweetalert";
import Axios from "@/http-common";
import Datepicker from "vuejs3-datepicker";
import { useDatatable } from "@/composables/datatables";
import MilestoneTable from "./MilestoneTable.vue";
import FilterModal from "../../../core/shared/FilterModal.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";

import { useStore } from "vuex";
import { usePermission } from "@/composables/permissions";
import { useRoute } from "vue-router";

const { getPermission } = usePermission();

//create store
const store = useStore();

//use for route
const route = useRoute();

//use for deleting spenner
let deletingSpinner = ref(false);
let savingSpinner = ref(false);

//use for multiselected
const multiselected = ref([]);

const user_id = ref(localStorage.getItem("user_id"));
const flag = ref(localStorage.getItem("flag"));

//use datatable composables
const { entries, datatables, showEntries, currentEntries, filterData } =
  useDatatable();

//Search Property
let nameSearch = ref(null);

watch([nameSearch], async () => {
  datatables.loadingState = true;
  await Axios.get(
    "/milestones?showEntries=" +
      currentEntries.value +
      "&page=" +
      datatables.currentPage +
      "&searchName=" +
      nameSearch.value +
      "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&project_id=" +
      route.params.project_id
  ).then((response) => {
    entries.value = response.data.data;
    datatables.totalItems = response.data.meta.total;
    datatables.currentPage = response.data.meta.current_page;
    datatables.allPages = response.data.meta.last_page;
    datatables.pagination = response.data.meta.links;
    datatables.loadingState = false;
  });
});

//Load Data form computed onMounted
onMounted(() => {
  filterData(
    "/milestones",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&project_id=" +
      route.params.project_id
  );
});

//show data using show Menu
function paginateEntries(e: any) {
  currentEntries.value = e.target.value;
  filterData(
    "/milestones",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&project_id=" +
      route.params.project_id
  );
}

//show previous page data
function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    filterData(
      "/milestones",
      "&user_id=" +
        user_id.value +
        "&flag=" +
        flag.value +
        "&project_id=" +
        route.params.project_id
    );
  }
}

//show next page data
function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    filterData(
      "/milestones",
      "&user_id=" +
        user_id.value +
        "&flag=" +
        flag.value +
        "&project_id=" +
        route.params.project_id
    );
  }
}

//show current Page Data
function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  filterData(
    "/milestones",
    "&user_id=" +
      user_id.value +
      "&flag=" +
      flag.value +
      "&project_id=" +
      route.params.project_id
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
      await Axios.delete("/milestones/" + id).then((response) => {
        entries.value = entries.value.filter(
          (e: { id: number }) => e.id !== id
        );
        filterData(
          "/milestones",
          "&user_id=" +
            user_id.value +
            "&flag=" +
            flag.value +
            "&project_id=" +
            route.params.project_id
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
      await Axios.post("/milestones-multidelete", {
        ids: multiselected.value.multiselect,
      }).then((response) => {
        filterData(
          "/milestones",
          "&user_id=" +
            user_id.value +
            "&flag=" +
            flag.value +
            "&project_id=" +
            route.params.project_id
        );
        deletingSpinner.value = false;
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      });
    }
  });
}

// use for filter
let filteringSpinner = ref(false);

const filterState = reactive({
  milestone_name_id: "",
  extended_date: "",
  start_date: "",
  end_date: "",
  user_id: user_id.value,
  flag: flag.value,
  project_id: route.params.project_id,
});

async function filterSubmit() {
  store.commit("modalModule/CHNAGE_FILTER_MODAL", false);
  datatables.loadingState = true;
  filteringSpinner.value = true;

  await Axios.post("milestones-filter", filterState).then((response) => {
    filteringSpinner.value = false;
    entries.value = response.data.data;
    datatables.totalItems = response.data.meta.total;
    datatables.currentPage = response.data.meta.current_page;
    datatables.allPages = response.data.meta.last_page;
    datatables.pagination = response.data.meta.links;
    datatables.loadingState = false;
  });
}
</script>

<style scoped></style>
