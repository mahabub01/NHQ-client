<template>
  <div>
    <div class="content-bg-section">
      <div class="content-section">
        <div
          class="container-fluid table-design-container"
          style="padding-bottom: 10px"
        >
          <div
            class="card"
            style="border-radius: 0px 5px 5px 5px; border-top: none"
          >
            <div class="page-bootcamp">
              <div class="row">
                <div class="col-md-8">
                  <button class="page-bootcamp-brand">
                    <i class="fas fa-address-card"></i>
                  </button>
                  <div class="page-bootcamp-left">
                    <a class="rev-underline-subtitle" href=""
                      >Module Name > Page Name</a
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
                      <button class="icon_btn" style="margin-right: 30px">
                        <i class="fas fa-plus"></i> Create
                      </button>

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
                    <data-table
                      :columns="columns"
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      v-model="searchTitle"
                    ></data-table>
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
                  </div>
                </div>
              </div>
            </div>

            <div class="container-fluid"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, watch } from "vue";
import Axios from "@/http-common";
import DataTable from "@/modules/shared/DataTable.vue";
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
  fatchModules();
});

//fetch data Module Data
async function fatchModules() {
  datatables.loadingState = true;
  await Axios.get(
    "/modules?currentEntries=" +
      currentEntries +
      "&page=" +
      datatables.currentPage
  ).then((response) => {
    entries.value = response.data.data;
    datatables.totalItems = response.data.total;
    datatables.currentPage = response.data.current_page;
    datatables.allPages = response.data.last_page;
    datatables.pagination = response.data.links;
    datatables.loadingState = false;
  });
}

const columns = [
  { name: "id", text: "ID", class: "col-serial" },
  { name: "title", text: "Title", class: "" },
  { name: "slug", text: "Slug", class: "" },
  { name: "action", text: "Action", class: "" },
  { name: "icon", text: "Icon", class: "" },
  { name: "comments", text: "Comments", class: "" },
  { name: "actions", text: "Actions", class: "" },
];
const showEntries = [5, 10, 25, 50, 75, 100];
let currentEntries = 5;

//Load Data depends on PaginateEntires
function paginateEntries(e) {
  currentEntries = e.target.value;
  fatchModules();
}

function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    fatchModules();
  }
}

function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    fatchModules();
  }
}

function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  fatchModules();
}
</script>

<style scoped></style>
