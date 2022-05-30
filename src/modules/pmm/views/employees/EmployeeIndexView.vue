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
                <div class="col-md-5">
                  <button class="page-bootcamp-brand">
                    <i class="fas fa-address-card"></i>
                  </button>
                  <div class="page-bootcamp-left">
                    <a class="rev-underline-subtitle" href="">Employee List</a>
                  </div>
                  <div class="page-bootcamp-left">
                    <ul class="page-bootcamp-list">
                      <li v-if="datatables.totalItems != null">
                        <b>Total {{ datatables.totalItems }} Items</b>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-7">
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
                        v-model.lazy="nameSearch"
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
                        v-if="getPermission(`create_employee`)"
                        to="/pmm/employees/create"
                        class="link_btn"
                        style="margin-right: 7px"
                        ><i class="fas fa-plus"></i> Create</router-link
                      >
                      <div class="btn-group">
                        <button
                          v-if="getPermission(`bulk_delete_employee`)"
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
                    <employee-table
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      @delete="remove($event)"
                      @activation="changeStatus($event)"
                      ref="multiselected"
                    ></employee-table>

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
      :isFiltering="filteringSpinner"
    ></the-spinner>

    <!--start Filter Modal -->
    <div>
      <filter-modal>
        <template v-slot:header
          ><i class="fas fa-filter"></i> Filter Employee
        </template>
        <template v-slot:body>
          <form @submit.prevent="filterSubmit" class="form-page">
            <div class="row form-row">
              <div class="col-md-4">
                <label class="form-label"> Search </label>
                <input
                  type="text"
                  class="form-input"
                  v-model="filterState.search"
                />
              </div>

              <div class="col-md-4">
                <label class="form-label"> Date of Birth </label>
                <input
                  type="date"
                  class="form-input"
                  v-model="filterState.date_of_birth"
                />
              </div>
              <div class="col-md-4">
                <label class="form-label"> Joinning Date</label>
                <input
                  type="date"
                  class="form-input"
                  v-model="filterState.joinning_date"
                />
              </div>
              <div class="col-md-4">
                <label class="form-label">Designation</label>
                <Select2
                  v-model="filterState.designation_id"
                  :options="designations"
                  :settings="{ placeholder: 'Choose' }"
                />
              </div>

              <div class="col-md-4">
                <label class="form-label">Department</label>
                <Select2
                  v-model="filterState.department_id"
                  :options="departments"
                  :settings="{ placeholder: 'Choose' }"
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
          <!-- <h1>filter body</h1> -->
        </template>
      </filter-modal>
    </div>
    <!--end Filter Modal -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive } from "vue";
import Axios from "@/http-common";
import EmployeeTable from "./EmployeeTable.vue";
import swal from "sweetalert";
import { useDatatable } from "@/composables/datatables";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import FilterModal from "../../../core/shared/FilterModal.vue";
import { useStore } from "vuex";
import Select2 from "vue3-select2-component";
import { usePermission } from "@/composables/permissions";

const { getPermission } = usePermission();

//create store
const store = useStore();

//use for deleting spenner
let deletingSpinner = ref(false);
let savingSpinner = ref(false);

// use for filter
let filteringSpinner = ref(false);

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

watch([nameSearch], async () => {
  datatables.loadingState = true;
  await Axios.get(
    "/employees?showEntries=" +
      currentEntries.value +
      "&page=" +
      datatables.currentPage +
      "&searchName=" +
      nameSearch.value
  ).then((response) => {
    entries.value = response.data.data;
    datatables.totalItems = response.data.meta.total;
    datatables.currentPage = response.data.meta.current_page;
    datatables.allPages = response.data.meta.last_page;
    datatables.pagination = response.data.meta.links;
    datatables.loadingState = false;
  });
});

//
const departments = ref([]);
const designations = ref([]);

//Load Data form computed onMounted
onMounted(() => {
  fetchData("/employees");
  getDepartments();
  getDesignations();
});

async function getDepartments() {
  await Axios.get("department-selectable")
    .then((response) => {
      departments.value = response.data.data;
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

async function getDesignations() {
  await Axios.get("designation-selectable")
    .then((response) => {
      designations.value = response.data.data;
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

//show data using show Menu
function paginateEntries(e: any) {
  currentEntries.value = e.target.value;
  fetchData("/employees");
}

//show previous page data
function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    fetchData("/employees");
  }
}

//show next page data
function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    fetchData("/employees");
  }
}

//show current Page Data
function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  fetchData("/employees");
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
      await Axios.delete("/employees/" + id).then((response) => {
        entries.value = entries.value.filter(
          (e: { id: number }) => e.id !== id
        );
        fetchData("/employees");
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
      await Axios.post("/employees-multidelete", {
        ids: multiselected.value.multiselect,
      }).then((response) => {
        fetchData("/employees");
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
  await Axios.post("/employees-status", status).then((response) => {
    swal("Your data status changed", {
      icon: "success",
    });
    fetchData("/employees");
  });
}

// Filter Pert
const filterState = reactive({
  search: "",
  department_id: "",
  designation_id: "",
  date_of_birth: "",
  joinning_date: "",
});

async function filterSubmit() {
  let path =
    "&search=" +
    filterState.search +
    "&department_id=" +
    filterState.department_id +
    "&designation_id =" +
    filterState.designation_id +
    "&date_of_birth=" +
    filterState.date_of_birth +
    "&joinning_date=" +
    filterState.joinning_date;

  filterData("employees-filter", path);
  store.commit("modalModule/CHNAGE_FILTER_MODAL", false);
}
</script>

<style scoped>
.form-input {
  margin-bottom: 20px;
}
</style>
