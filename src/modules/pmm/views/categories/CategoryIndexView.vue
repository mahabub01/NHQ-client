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

                      <button
                        v-if="getPermission(`create_project_category`)"
                        type="button"
                        class="link_btn"
                        style="margin-right: 7px"
                        @click="
                          store.commit('modalModule/CHNAGE_CREATE_MODAL', true),
                            resetForm()
                        "
                      >
                        <i class="fas fa-plus"></i> Create
                      </button>
                      <div class="btn-group">
                        <button
                          v-if="getPermission(`bulk_delete_project_category`)"
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

    <!--start Create Modal -->
    <div>
      <create-modal>
        <template v-slot:header
          ><i class="fas fa-plus-square"></i> Create Category
        </template>
        <template v-slot:body>
          <form @submit.prevent="createSubmit" class="form-page">
            <div class="row">
              <div class="col-md-12">
                <label class="form-label">
                  Title
                  <span class="mandatory">*</span>
                </label>
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.title.$error }"
                  v-model.lazy="v$.title.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.title.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
            </div>
            <div class="row form-row">
              <div class="col-md-12">
                <label class="form-label">Description</label>
                <textarea
                  class="form-textarea"
                  v-model.lazy="state.description"
                ></textarea>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="form-button-danger"
                data-bs-dismiss="modal"
                @click.prevent="
                  store.commit('modalModule/CHNAGE_CREATE_MODAL', false)
                "
              >
                <i class="far fa-times-circle"></i> Close
              </button>
              <button type="submit" class="form-button">
                <i class="fas fa-save"></i> Save
              </button>
            </div>
          </form>
        </template>
      </create-modal>
    </div>
    <!--end Create Modal -->

    <!--start Edit Modal -->
    <div>
      <edit-modal>
        <template v-slot:editheader>
          <i class="fas fa-plus-square"></i> Edit Category
        </template>
        <template v-slot:editbody>
          <form @submit.prevent="editSubmit" class="form-page">
            <div class="row">
              <div class="col-md-12">
                <label class="form-label">
                  Title
                  <span class="mandatory">*</span>
                </label>
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.title.$error }"
                  v-model.lazy="v$.title.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.title.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
            </div>
            <div class="row form-row">
              <div class="col-md-12">
                <label class="form-label">Description</label>
                <textarea
                  class="form-textarea"
                  v-model.lazy="state.description"
                ></textarea>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="form-button-danger"
                data-bs-dismiss="modal"
                @click.prevent="
                  store.commit('modalModule/CHNAGE_EDIT_MODAL', false)
                "
              >
                <i class="far fa-times-circle"></i> Close
              </button>
              <button type="submit" class="form-button">
                <i class="fas fa-save"></i> Save
              </button>
            </div>
          </form>
        </template>
      </edit-modal>
    </div>
    <!--end Create Modal -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive } from "vue";
import Axios from "@/http-common";
import CategoryTable from "./CategoryTable.vue";
import swal from "sweetalert";
import { useDatatable } from "@/composables/datatables";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import CreateModal from "../../../core/shared/CreateModal.vue";
import EditModal from "../../../core/shared/EditModal.vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import toastr from "toastr";
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
  fetchData("/projects/categories");
});

/**********************
 * Create Category
 ***********************/
const state = reactive({
  title: "",
  description: "",
});

// validation item
const rules: any = {
  title: { required },
};

const v$ = useVuelidate(rules, state);

async function createSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    savingSpinner.value = true;
    await Axios.post("projects/categories", state)
      .then((response) => {
        if (response.data.code == 200) {
          store.commit("modalModule/CHNAGE_CREATE_MODAL", false);
          fetchData("/projects/categories");
          resetForm();
          savingSpinner.value = false;
          swal(
            "Success Job!",
            "Your category created successfully!",
            "success"
          );
        } else {
          savingSpinner.value = false;
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}

/**********************
 * End Create Category
 ***********************/

/************* Start Edit Category ****************/

// recived all editable data
const single_datas = ref([]);

// Selected id for edit
let editableId = "";

// open edit modal
function showEdit(id) {
  editableId = id;
  getEditData(id);
  store.commit("modalModule/CHNAGE_EDIT_MODAL", true);
}

// Selected Edit id's get all data
async function getEditData(id: number) {
  await Axios.get("/projects/categories/" + id).then((response) => {
    single_datas.value = response.data.data;
    state.title = single_datas.value.title;
    state.description = single_datas.value.description;
  });
}

// Edit Submit
async function editSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    savingSpinner.value = true;
    await Axios.put("projects/categories/" + editableId, state)
      .then((response) => {
        if (response.data.code == 200) {
          store.commit("modalModule/CHNAGE_EDIT_MODAL", false);
          fetchData("/projects/categories");
          resetForm();
          savingSpinner.value = false;
          swal(
            "Success Job!",
            "Your category updated successfully!",
            "success"
          );
        } else {
          savingSpinner.value = false;
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}

/************* End Edit Category ****************/

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

//Change selected data status
async function changeStatus(status: { id: number; status: number }) {
  await Axios.post("/projects/categories-status", status).then((response) => {
    swal("Your data status changed", {
      icon: "success",
    });
    fetchData("/projects/categories");
  });
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
      await Axios.delete("/projects/categories/" + id).then((response) => {
        entries.value = entries.value.filter(
          (e: { id: number }) => e.id !== id
        );
        fetchData("/projects/categories");
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
      await Axios.post("/projects/categories-multidelete", {
        ids: multiselected.value.multiselect,
      }).then((response) => {
        fetchData("/projects/categories");
        deletingSpinner.value = false;
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      });
    }
  });
}

//reset all property
function resetForm() {
  state.title = "";
  state.description = "";
  v$.value.$reset();
}

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
