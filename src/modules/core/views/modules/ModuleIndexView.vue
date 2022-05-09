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
                    <router-link to="#" class="rev-underline-subtitle"
                      >Authentication
                      <i
                        class="fas fa-chevron-right"
                        style="margin-left: 6px; margin-right: 6px"
                      ></i>
                    </router-link>
                    <router-link
                      to="/core/modules"
                      class="rev-underline-subtitle"
                      >Modules</router-link
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
                    <module-table
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      @delete="remove($event)"
                      @activation="changeStatus($event)"
                      @editId="showEdit($event)"
                      ref="multiselected"
                    ></module-table>

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
      <create-modal :modalsize="modalSize" v-if="createModalState">
        <template v-slot:header
          ><i class="fas fa-plus-square"></i> Create Module
        </template>
        <template v-slot:body>
          <form @submit.prevent="createSubmit" class="form-page">
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">
                  Title
                  <span class="mandatory">*</span>
                </label>
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.title.$error }"
                  placeholder="Enter Your Title"
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
              <div class="col-md-6">
                <label class="form-label">
                  Action <span class="mandatory">*</span>
                </label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="Enter Your Action"
                  v-model.lazy="v$.action.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.action.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label class="form-label">
                  Slug
                  <span class="mandatory">*</span>
                </label>
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.slug.$error }"
                  placeholder="Enter Your Slug"
                  v-model.lazy="v$.slug.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.slug.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <div class="col-md-6">
                <label class="form-label"> Icons </label>
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.title.$error }"
                  placeholder="Enter Your Icons"
                  v-model="state.icons"
                />
              </div>
            </div>

            <div class="row form-row">
              <div class="col-md-12" style="min-height: 267px">
                <label class="form-label">Comments</label>
                <!-- :content="" use for set default Data-->
                <TheCKEditor @sendContent="setComments" />
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click.prevent="
                  store.commit('modalModule/CHNAGE_CREATE_MODAL', false)
                "
              >
                <i class="far fa-times-circle"></i> Close
              </button>
              <button type="submit" class="btn pro-button">
                <i class="fas fa-save"></i> Save
              </button>
            </div>
          </form>
        </template>
      </create-modal>
    </div>
    <!--end Create Modal -->

    <!--start Edit Modal -->
    <EditModal :modalsize="modalSize" v-if="editModalState">
      <template v-slot:editheader
        ><i class="fas fa-plus-square"></i> Edit Module
      </template>
      <template v-slot:editbody>
        <form @submit.prevent="updateHandler" class="form-page">
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label">
                Title
                <span class="mandatory">*</span>
              </label>
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.title.$error }"
                placeholder="Enter Your Title"
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
            <div class="col-md-6">
              <label class="form-label"> Action </label>
              <input
                type="text"
                class="form-input"
                placeholder="Enter Your Action"
                v-model="state.action"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label class="form-label">
                Slug
                <span class="mandatory">*</span>
              </label>
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.slug.$error }"
                placeholder="Enter Your Slug"
                v-model.lazy="v$.slug.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.slug.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i>
                {{ error.$message }}
              </p>
            </div>
            <div class="col-md-6">
              <label class="form-label"> Icons </label>
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.title.$error }"
                placeholder="Enter Your Icons"
                v-model="state.icons"
              />
            </div>
          </div>

          <div class="row form-row">
            <div class="col-md-12" style="min-height: 267px">
              <label class="form-label">Comments</label>
              <!-- :content="" use for set default Data-->
              <!-- :content="" use for set default Data-->
              <TheCKEditor
                v-if="loadCKEditor"
                @sendContent="setComments"
                :content="state.comments"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.prevent="
                store.commit('modalModule/CHNAGE_EDIT_MODAL', false)
              "
            >
              <i class="far fa-times-circle"></i> Close
            </button>
            <button type="submit" class="btn pro-button">
              <i class="fas fa-save"></i> Save
            </button>
          </div>
        </form>
      </template>
    </EditModal>
    <!--end Edit Modal -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed, reactive } from "vue";
import Axios from "@/http-common";
import ModuleTable from "./ModuleTable.vue";
import swal from "sweetalert";
import { useDatatable } from "@/composables/datatables";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import CreateModal from "../../../core/shared/CreateModal.vue";
import EditModal from "../../../core/shared/EditModal.vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";
import toastr from "toastr";

//modal size
const modalSize = ref("modal-lg");

//modal setting

const createModalState = computed(() => {
  return store.state.modalModule.creatModal;
});

const editModalState = computed(() => {
  return store.state.modalModule.editModal;
});

// Load CkEditor Data
const loadCKEditor = computed(() => {
  return store.state.modalModule.loadCKEditor;
});

const setComments = (value: any) => {
  state.comments = value;
};

//create store
const store = useStore();

//use for deleting spenner
let deletingSpinner = ref(false);
let savingSpinner = ref(false);

//use for multiselected
const multiselected = ref([]);

let singleData = "";

//use datatable composables
const { entries, datatables, showEntries, currentEntries, fetchData } =
  useDatatable();

/**********************
 * Create Modules
 ***********************/
const state = reactive({
  title: "",
  slug: "",
  action: "",
  icons: "",
  comments: "",
});

const rules: any = {
  title: { required },
  slug: { required },
  action: { required },
};

const v$ = useVuelidate(rules, state);

async function createSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    savingSpinner.value = true;
    await Axios.post("modules", state)
      .then((response) => {
        if (response.data.code == 200) {
          store.commit("modalModule/CHNAGE_CREATE_MODAL", false);
          fetchData("modules");
          resetForm();
          savingSpinner.value = false;
          swal("Success Job!", "Your modules created successfully!", "success");
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

//reset all property
function resetForm() {
  state.title = "";
  state.slug = "";
  state.action = "";
  state.icons = "";
  state.comments = "";
  v$.value.$reset();
}

/**********************
 * End Create Module
 ***********************/

//Search Property
let titleSearch = ref("");

watch([titleSearch], async () => {
  datatables.loadingState = true;
  await Axios.get(
    "/modules?showEntries=" +
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

//Load Data form computed onMounted
onMounted(() => {
  fetchData("/modules");
});

//show data using show Menu
function paginateEntries(e: any) {
  currentEntries.value = e.target.value;
  fetchData("/modules");
}

//show previous page data
function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    fetchData("/modules");
  }
}

//show next page data
function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    fetchData("/modules");
  }
}

//show current Page Data
function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  fetchData("modules");
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
      await Axios.delete("/modules/" + id).then((response) => {
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
      await Axios.post("/modules-multidelete", {
        ids: multiselected.value.multiselect,
      }).then((response) => {
        fetchData("/modules");
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
  await Axios.post("/modules-change-status", status).then((response) => {
    swal("Your data status changed", {
      icon: "success",
    });
    fetchData("modules");
  });
}

// edit pert
const single_datas = ref([]);
let editableId = "";

async function getEditData(id: number) {
  await Axios.get("/modules/" + id).then((response) => {
    single_datas.value = response.data.data;
    state.title = single_datas.value.title;
    state.slug = single_datas.value.slug;
    state.action = single_datas.value.action;
    state.icons = single_datas.value.icons;
    state.comments = single_datas.value.comments;
    store.commit("modalModule/LOAD_CKEDITOR_MODAL", true);
  });
}

async function updateHandler() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    savingSpinner.value = true;
    await Axios.put("modules/" + editableId, state)
      .then((response) => {
        if (response.data.code == 200) {
          store.commit("modalModule/CHNAGE_EDIT_MODAL", false);
          fetchData("/modules");
          resetForm();
          savingSpinner.value = false;
          swal("Success Job!", "Your module updated successfully!", "success");
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

function showEdit(id) {
  editableId = id;
  getEditData(id);
  store.commit("modalModule/CHNAGE_EDIT_MODAL", true);
}
</script>

<style scoped></style>
