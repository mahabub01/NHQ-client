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
                    <a class="rev-underline-subtitle" href="">Clients List</a>
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
                        placeholder="Search by Email"
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

                      <router-link
                        v-if="getPermission(`create_client_list`)"
                        to="/pmm/clients/create"
                        class="link_btn"
                        style="margin-right: 7px"
                        ><i class="fas fa-plus"></i> Create</router-link
                      >
                      <router-link
                        v-if="getPermission(`import_client_list`)"
                        to="#"
                        class="theme-color-btn"
                        style="margin-right: 7px"
                        ><i class="fas fa-cloud-upload-alt"></i>
                        Import</router-link
                      >

                      <router-link
                        v-if="getPermission(`export_client_list`)"
                        to="#"
                        class="theme-color-btn"
                        style="margin-right: 7px"
                        ><i class="fas fa-file-excel"></i> Export</router-link
                      >

                      <div class="btn-group">
                        <button
                          v-if="getPermission(`bulk_delete_client_list`)"
                          type="button"
                          class="icon_btn page-bootcamp-group-btn"
                          data-bs-toggle="dropdown"
                          data-bs-display="static"
                          aria-expanded="false"
                        >
                          <i class="fas fa-wrench"></i> Bulk Action
                          <i class="fas fa-chevron-down"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-lg-end">
                          <li>
                            <a
                              href="#"
                              @click="bulkDelete"
                              class="dropdown-item"
                              ><i class="fas fa-trash-alt"></i> Bulk Delete
                            </a>
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
                    <client-table
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      @delete="remove($event)"
                      @activation="changeStatus($event)"
                      ref="multiselected"
                    ></client-table>

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
          ><i class="fas fa-filter"></i> Filter Client
        </template>
        <template v-slot:body>
          <form @submit.prevent="filterSubmit" class="form-page">
            <div class="row">
              <div class="col-md-4 mb_30">
                <label class="form-label"> Company Name/Email </label>
                <input
                  type="text"
                  class="form-input"
                  v-model="filterState.company_name_email"
                />
              </div>
              <div class="col-md-4 mb_30">
                <label class="form-label">
                  Contact Person Name/Email/Phone
                </label>
                <input
                  type="text"
                  class="form-input"
                  v-model="filterState.contact_person_name_email_phone"
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
import { onMounted, ref, watch, reactive } from "vue";
import Axios from "@/http-common";
import ClientTable from "./ClientTable.vue";
import swal from "sweetalert";
import { useDatatable } from "@/composables/datatables";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import { useStore } from "vuex";
import FilterModal from "../../../core/shared/FilterModal.vue";
import { usePermission } from "@/composables/permissions";

const { getPermission } = usePermission();
//create store
const store = useStore();

//use for deleting spenner
let deletingSpinner = ref(false);
let savingSpinner = ref(false);

//use for multiselected
const multiselected = ref([]);

//use datatable composables
const { entries, datatables, showEntries, currentEntries, fetchData } =
  useDatatable();

//Load Data form computed onMounted
onMounted(() => {
  fetchData("/clients");
});

//Search Property
let search = ref("");

//filter by POC ID/ Poc title
watch([search], async () => {
  fetchData("/clients", search.value);
});

//show data using show Menu
function paginateEntries(e: any) {
  currentEntries.value = e.target.value;
  fetchData("/clients");
}

//show previous page data
function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    fetchData("/clients");
  }
}

//show next page data
function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    fetchData("/clients");
  }
}

//show current Page Data
function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  fetchData("/clients");
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
      await Axios.delete("/clients/" + id).then((response) => {
        entries.value = entries.value.filter(
          (e: { id: number }) => e.id !== id
        );
        fetchData("/clients");
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
      await Axios.post("/clients-multidelete", {
        ids: multiselected.value.multiselect,
      }).then((response) => {
        fetchData("/clients");
        deletingSpinner.value = false;
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      });
    }
  });
}

//Change selected data status
async function changeStatus(status: { id: number; status: number }) {
  await Axios.post("/clients-status", status).then((response) => {
    swal("Your data status changed", {
      icon: "success",
    });
    fetchData("/clients");
  });
}

// Filter Pert

// use for filter
let filteringSpinner = ref(false);

const filterState = reactive({
  company_name_email: "",
  contact_person_name_email_phone: "",
});

async function filterSubmit() {
  store.commit("modalModule/CHNAGE_FILTER_MODAL", false);
  datatables.loadingState = true;
  filteringSpinner.value = true;
  console.log(filterState);

  await Axios.post("clients-filter", filterState).then((response) => {
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
