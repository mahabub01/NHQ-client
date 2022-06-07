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
                <div class="col-md-7">
                  <button class="page-bootcamp-brand">
                    <i class="fas fa-address-card"></i>
                  </button>
                  <div class="page-bootcamp-left">
                    <router-link
                      to="/pmm/projects"
                      class="rev-underline-subtitle"
                      >Projects
                      <i
                        class="fas fa-chevron-right"
                        style="margin-left: 6px; margin-right: 6px"
                      ></i>
                    </router-link>
                    <a href="" class="rev-underline-subtitle">Category List</a>
                  </div>
                  <div class="page-bootcamp-left">
                    <ul class="page-bootcamp-list">
                      <li v-if="datatables.totalItems != null">
                        <b>Total {{ datatables.totalItems }} Items</b>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-5">
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
                        placeholder="Search Title"
                        style="margin-right: 7px"
                        v-model.lazy="titleSearch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="table_section">
              <div class="row">
                <div class="col-md-12">
                  <div style="overflow-x: auto; margin-bottom: 10px">
                    <category-table
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      @delete="remove($event)"
                      @activation="changeStatus($event)"
                      @editId="showEdit($event)"
                      ref="multiselected"
                    ></category-table>

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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive } from "vue";
import Axios from "@/http-common";
import CategoryTable from "./LogTable.vue";
import { useDatatable } from "@/composables/datatables";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";
// import TheSpinner from "../../../shared/spinners/TheSpinner.vue";

import { useStore } from "vuex";
import { usePermission } from "@/composables/permissions";

//use datatable composables
const { entries, datatables, showEntries, currentEntries, fetchData } =
  useDatatable();

//use for Permission
const { getPermission } = usePermission();

//create store
const store = useStore();

//use for multiselected
const multiselected = ref([]);

//use for deleting spenner
let deletingSpinner = ref(false);
let savingSpinner = ref(false);

//Load Data form computed onMounted
onMounted(() => {
  fetchData("/logs");
});

//Input Search Property
let titleSearch = ref("");

watch([titleSearch], async () => {
  datatables.loadingState = true;
  await Axios.get(
    "/projects/categories?showEntries=" +
      currentEntries.value +
      "&page=" +
      datatables.currentPage +
      "&searchTitle=" +
      titleSearch.value
  ).then((response) => {
    entries.value = response.data.data;
    datatables.totalItems = response.data.meta.total;
    datatables.currentPage = response.data.meta.current_page;
    datatables.allPages = response.data.meta.last_page;
    datatables.pagination = response.data.meta.links;
    datatables.loadingState = false;
  });
});

//show data using show Menu
function paginateEntries(e: any) {
  currentEntries.value = e.target.value;
  fetchData("/projects/categories");
}

//show previous page data
function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    fetchData("/projects/categories");
  }
}

//show next page data
function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    fetchData("/projects/categories");
  }
}

//show current Page Data
function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  fetchData("/projects/categories");
}
</script>

<style scoped></style>
