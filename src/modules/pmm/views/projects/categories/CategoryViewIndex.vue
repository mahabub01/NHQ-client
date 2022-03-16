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
                        {{ datatables.totalItems }} Items
                      </li>
                      <li>Shorted By ID</li>
                      <li>Filterd By</li>
                      <li>Updated</li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="page-bootcamp-right">
                    <!-- <div style="margin-bottom: 5px">
                      <button class="icon_btn">
                        <i class="fas fa-plus"></i> Create
                      </button>
                    </div> -->

                    <div>
                      <router-link
                        class="link_btn"
                        style="margin-right: 30px"
                        to="/pmm/categories/create"
                        ><i class="fas fa-plus"></i> Create</router-link
                      >

                      <label class="show-data-label">Show: </label>
                      <select
                        class="show-data-select"
                        @change="paginateEntries($event)"
                      >
                        <option
                          v-for="show_en in showEntries"
                          :key="show_en"
                          :value="show_en"
                        >
                          {{ show_en }}
                        </option>
                      </select>

                      <div class="btn-group">
                        <button
                          type="button"
                          class="icon_btn page-bootcamp-group-btn"
                          data-bs-toggle="dropdown"
                          data-bs-display="static"
                          aria-expanded="false"
                        >
                          <i class="fas fa-cog"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-lg-end">
                          <li>
                            <a href="" class="dropdown-item"
                              ><i class="far fa-file-excel"></i> All Export</a
                            >
                          </li>

                          <li>
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#selectableModal"
                              class="dropdown-item"
                              ><i class="fas fa-columns"></i> Show/Hide
                              Column</a
                            >
                          </li>
                        </ul>
                      </div>

                      <a href=""
                        ><button type="button" class="icon_btn">
                          <i class="fas fa-redo"></i></button
                      ></a>

                      <a href="#"
                        ><button
                          type="button"
                          class="icon_btn"
                          data-bs-toggle="modal"
                          data-bs-target="#filterModal"
                        >
                          <i class="fas fa-filter"></i></button
                      ></a>
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
                      v-model="searchTitle"
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, watch } from "vue";
import Axios from "@/Axios";
import CategoryTable from "./CategoryTable.vue";
let entries = ref(null) as any;
let datatables = reactive({
  totalItems: null,
  loadingState: false,
  currentPage: 1,
  allPages: 1,
  pagination: null,
});
let searchTitle = ref(null);

watch(searchTitle, async () => {
  console.log(searchTitle.value);
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
</script>

<style scoped></style>
