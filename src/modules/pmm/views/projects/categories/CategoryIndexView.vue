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
                <div class="col-md-8">
                  <button class="page-bootcamp-brand">
                    <i class="fas fa-address-card"></i>
                  </button>
                  <div class="page-bootcamp-left">
                    <a class="rev-underline-subtitle" href=""
                      >Projects > Category List</a
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
                <div class="col-md-4">
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

                      <router-link
                        class="link_btn"
                        style="margin-right: 7px"
                        to="/pmm/categories/create"
                        ><i class="fas fa-plus"></i> Create</router-link
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
                    <category-table
                      :columns="columns"
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      v-model:titleSearch.lazy="titleSearch"
                      v-model:isActiveSearch.lazy="isActiveSearch"
                      @delete="remove($event)"
                      @activation="changeStatus($event)"
                      ref="multiselected"
                    ></category-table>
                    <!--start table pagination -->
                    <nav aria-label="...">
                      <ul
                        class="pagination"
                        v-if="datatables.pagination != null"
                      >
                        <li
                          :class="[
                            datatables.currentPage == 1 ? 'disabled' : '',
                          ]"
                          class="page-item"
                        >
                          <a
                            class="page-link"
                            href="#"
                            tabindex="-1"
                            @click.prevent="prev"
                            >Previous</a
                          >
                        </li>

                        <li
                          v-for="pagi in datatables.allPages"
                          class="page-item"
                          :key="pagi"
                          :class="[
                            pagi == datatables.currentPage ? 'active' : '',
                          ]"
                          @click.prevent="currentPage(pagi)"
                        >
                          <a class="page-link" href="#">{{ pagi }} </a>
                        </li>
                        <li
                          class="page-item"
                          :class="[
                            datatables.currentPage == datatables.allPages
                              ? 'disabled'
                              : '',
                          ]"
                        >
                          <a class="page-link" href="#" @click.prevent="next"
                            >Next</a
                          >
                        </li>
                      </ul>
                    </nav>
                    <!--end table pagination -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <data-deleting-spinner
      :deleting-spinner="deletingSpinner"
    ></data-deleting-spinner>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, watch } from "vue";
import Axios from "@/http-common";
import CategoryTable from "./CategoryTable.vue";
import swal from "sweetalert";
import DataDeletingSpinner from "@/modules/shared/DataDeletingSpinner.vue";

//use for deleting spenner
let deletingSpinner = ref(false);

//use for multiselected
const multiselected = ref([]);

let entries = ref([]) as any;
let datatables = reactive({
  totalItems: null,
  loadingState: false,
  currentPage: 1,
  allPages: 1,
  pagination: null,
});

//Search Property
let titleSearch = ref("");
let isActiveSearch = ref("");

watch([titleSearch, isActiveSearch], async () => {
  console.log("hey");
  datatables.loadingState = true;
  await Axios.get(
    "/projects/categories?showEntries=" +
      currentEntries +
      "&page=" +
      datatables.currentPage +
      "&searchTitle=" +
      titleSearch.value +
      "&is_active=" +
      isActiveSearch.value
  ).then((response) => {
    entries.value = response.data.data.data;
    datatables.totalItems = response.data.data.total;
    datatables.currentPage = response.data.data.current_page;
    datatables.allPages = response.data.data.last_page;
    datatables.pagination = response.data.data.links;
    datatables.loadingState = false;
  });
});

//Load Data form computed onMounted
onMounted(() => {
  fatchData();
});

//fetch data Module Data
async function fatchData() {
  datatables.loadingState = true;
  await Axios.get(
    "/projects/categories?showEntries=" +
      currentEntries +
      "&page=" +
      datatables.currentPage
  ).then((response) => {
    entries.value = response.data.data.data;
    datatables.totalItems = response.data.data.total;
    datatables.currentPage = response.data.data.current_page;
    datatables.allPages = response.data.data.last_page;
    datatables.pagination = response.data.data.links;
    datatables.loadingState = false;
  });
}

const columns = [
  { name: "id", text: "ID", class: "col-serial" },
  { name: "title", text: "Title", class: "" },
  { name: "slug", text: "Slug", class: "" },
  { name: "description", text: "Description", class: "" },
  { name: "actions", text: "Actions", class: "" },
];
const showEntries = [25, 50, 100, 250, 500];
let currentEntries = 25;

//Load Data depends on PaginateEntires
function paginateEntries(e) {
  currentEntries = e.target.value;
  fatchData();
}

function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    fatchData();
  }
}

function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    fatchData();
  }
}

function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  fatchData();
}

//Delete Item
function remove(id: number) {
  //alert("Remove" + id);
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this record!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      deletingSpinner.value = true;
      await Axios.delete("/projects/categories/" + id).then((response) => {
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

//Bulk Delete
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
      await Axios.post("/projects/categories-multidelete", {
        ids: multiselected.value.multiselect,
      }).then((response) => {
        //Fetch Data By Api
        fatchData();
        deletingSpinner.value = false;
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      });
    }
  });
}

//Change Status
async function changeStatus(status: { id: number; status: number }) {
  await Axios.post("/projects/categories-status", status).then((response) => {
    swal("Your data status changed", {
      icon: "success",
    });
    fatchData();
  });
}
</script>

<style scoped></style>
