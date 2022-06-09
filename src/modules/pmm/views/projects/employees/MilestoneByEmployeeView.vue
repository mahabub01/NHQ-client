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
                    <a href="" class="rev-underline-subtitle">Project List</a>
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
                        placeholder="Search By Project ID/Title"
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
                    <milestone-table
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      @delete="remove($event)"
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
          ><i class="fas fa-filter"></i> Filter Project
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
                <input
                  type="date"
                  class="form-input"
                  v-model="filterState.extended_date"
                />
              </div>
              <div class="col-md-4 mb_30">
                <label class="form-label"> Start Date</label>
                <input
                  type="date"
                  class="form-input"
                  v-model="filterState.start_date"
                />
              </div>
              <div class="col-md-4 mb_30">
                <label class="form-label"> End Date</label>
                <input
                  type="date"
                  class="form-input"
                  v-model="filterState.end_date"
                />
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
import { onMounted, ref, watch, reactive, computed } from "vue";
import Axios from "@/http-common";
import MilestoneTable from "./MilestoneTable.vue";
import { useDatatable } from "@/composables/datatables";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";
import FilterModal from "@/modules/core/shared/FilterModal.vue";
import TheSpinner from "@/modules/shared/spinners/TheSpinner.vue";
import { useStore } from "vuex";
import { usePermission } from "@/composables/permissions";
import { useRoute } from "vue-router";

const route = useRoute();

const { getPermission } = usePermission();

const userInfo = computed(() => {
  return store.state.currentUser.userPemissions;
});

//use for deleting spenner
let deletingSpinner = ref(false);
let savingSpinner = ref(false);
//create store
const store = useStore();

//use datatable composables
const { entries, datatables, showEntries, currentEntries, filterData } =
  useDatatable();

const user_id = ref(localStorage.getItem("user_id"));
const flag = ref(localStorage.getItem("flag"));
//search field
let search = ref("");

//filter by POC ID/ Poc title

watch([search], async () => {
  datatables.loadingState = true;
  await Axios.get(
    "/employee-milestone?showEntries=" +
      currentEntries.value +
      "&page=" +
      datatables.currentPage +
      "&search=" +
      search.value +
      "&user_id=" +
      route.params.user_id +
      "&project_id=" +
      route.params.project_id +
      "&flag=" +
      userInfo.value.flag
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
onMounted(async () => {
  filterData(
    "/employee-milestone",
    "&user_id=" +
      route.params.user_id +
      "&project_id=" +
      route.params.project_id +
      "&flag=" +
      userInfo.value.flag
  );
});

const filterState = reactive({
  milestone_name_id: "",
  project_id: "",
  extended_date: "",
  start_date: "",
  end_date: "",
});

let filteringSpinner = ref(false);

async function filterSubmit() {
  store.commit("modalModule/CHNAGE_FILTER_MODAL", false);
  datatables.loadingState = true;
  filteringSpinner.value = true;

  await Axios.post("employee-milestone-filter", filterState).then(
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
    "/employee-project",
    "&user_id=" + user_id.value + "&flag=" + flag.value
  );
}

//show previous page data
function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    filterData(
      "/employee-project",
      "&user_id=" + user_id.value + "&flag=" + flag.value
    );
  }
}

//show next page data
function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    filterData(
      "/employee-project",
      "&user_id=" + user_id.value + "&flag=" + flag.value
    );
  }
}

//show current Page Data
function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  filterData(
    "/employee-project",
    "&user_id=" + user_id.value + "&flag=" + flag.value
  );
}
</script>

<style scoped></style>
