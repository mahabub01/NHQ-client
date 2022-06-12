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
import FilterModal from "../../../../core/shared/FilterModal.vue";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";
import TheSpinner from "../../../../shared/spinners/TheSpinner.vue";
import { useStore } from "vuex";
import { useExcelImport } from "@/composables/excel-import";
import { useRoute } from "vue-router";
import Datepicker from "vuejs3-datepicker";

const route = useRoute();
//create store
const store = useStore();

const userInfo = computed(() => {
  return store.state.currentUser.userPemissions;
});

//use datatable composables
const { entries, datatables, showEntries, currentEntries, filterData } =
  useDatatable();

//Search Property
let nameSearch = ref("");
let isActiveSearch = ref("");

//search field
let search = ref("");
let filteringSpinner = ref(false);

const filterState = reactive({
  submilestone_name_id: "",
  extended_date: "",
  start_date: "",
  end_date: "",
});

//filter by POC ID/ Poc title
watch([search], async () => {
  //fetchData("/tasks", search.value);
  filterData(
    "/employee-sub-milestone",
    "&user_id=" +
      route.params.user_id +
      "&search=" +
      search.value +
      "&project_id =" +
      route.params.project_id +
      "&milestone_id =" +
      route.params.id
  );
});

//Load Data form computed onMounted
onMounted(() => {
  // fetchData("/tasks");
  filterData(
    "/employee-sub-milestone",
    "&user_id=" +
      route.params.user_id +
      "&project_id =" +
      route.params.project_id +
      "&milestone_id =" +
      route.params.id
  );
});

async function filterSubmit() {
  store.commit("modalModule/CHNAGE_FILTER_MODAL", false);
  datatables.loadingState = true;
  filteringSpinner.value = true;

  await Axios.post("employee-sub-milestone-filter", filterState).then(
    (response) => {
      filteringSpinner.value = false;
      entries.value = response.data.data;
      datatables.totalItems = response.data.meta.total;
      datatables.currentPage = response.data.meta.current_page;
      datatables.allPages = response.data.meta.last_page;
      datatables.pagination = response.data.meta.links;
      datatables.loadingState = false;
    }
  );
}

//show data using show Menu
function paginateEntries(e: any) {
  currentEntries.value = e.target.value;
  filterData(
    "/employee-sub-milestone",
    "&user_id=" +
      route.params.user_id +
      "&project_id =" +
      route.params.project_id +
      "&milestone_id =" +
      route.params.id
  );
}

//show previous page data
function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    filterData(
      "/employee-sub-milestone",
      "&user_id=" +
        route.params.user_id +
        "&project_id =" +
        route.params.project_id +
        "&milestone_id =" +
        route.params.id
    );
  }
}

//show next page data
function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    filterData(
      "/employee-sub-milestone",
      "&user_id=" +
        route.params.user_id +
        "&project_id =" +
        route.params.project_id +
        "&milestone_id =" +
        route.params.id
    );
  }
}

//show current Page Data
function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  filterData(
    "/employee-sub-milestone",
    "&user_id=" +
      route.params.user_id +
      "&project_id =" +
      route.params.project_id +
      "&milestone_id =" +
      route.params.id
  );
}
</script>

<style scoped></style>
