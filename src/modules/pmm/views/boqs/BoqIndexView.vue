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
                    <router-link
                      to="/pmm/projects"
                      class="rev-underline-subtitle"
                      style="margin-right: 7px"
                      >NHQ Project</router-link
                    >
                    >
                    <a class="rev-underline-subtitle" href="">Boq List</a>
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
                        placeholder="Search"
                        style="margin-right: 7px"
                        v-model.lazy="search"
                        class="table-search"
                      />

                      <button
                        type="button"
                        class="theme-color-btn"
                        style="margin-right: 7px"
                        @click="
                          store.commit('modalModule/CHNAGE_FILTER_MODAL', true)
                        "
                      >
                        <i class="fas fa-filter"></i>
                      </button>

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

                      <router-link
                        to=""
                        class="theme-color-btn"
                        style="margin-right: 7px"
                        ><i class="fas fa-cloud-upload-alt"></i>
                        Import</router-link
                      >

                      <router-link
                        to=""
                        class="theme-color-btn"
                        style="margin-right: 7px"
                        ><i class="fas fa-file-excel"></i> Export</router-link
                      >

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
                    <boq-table
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      @delete="remove($event)"
                      @activation="changeStatus($event)"
                      @getFiles="downloadFile($event)"
                      @edit="editModal($event)"
                      ref="multiselected"
                    ></boq-table>

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
      :isLoading="loadingSpinner"
    ></the-spinner>

    <!--start Create Modal -->
    <div>
      <create-modal :modalsize="modalSize" v-if="createModalState">
        <template v-slot:header
          ><i class="fas fa-plus-square"></i> Create BOQ
        </template>
        <template v-slot:body>
          <form @submit.prevent="submitHandler" class="form-page">
            <div class="row">
              <div class="col-md-6">
                <label class="form-label"
                  >Version<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.version_id.$model"
                  :options="versions"
                  :settings="{ placeholder: 'Choose' }"
                  :class="{ isInvalid: v$.version_id.$error }"
                />

                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.version_id.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>

              <div class="col-md-6">
                <label class="form-label">
                  Items Name
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
              <div class="col-md-6">
                <label class="form-label"
                  >Section Category<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="formState.boq_category_id"
                  :options="categories"
                  :settings="{ placeholder: 'Choose' }"
                  :class="{ isInvalid: v$.boq_category_id.$error }"
                  @change="myChangeEvent($event)"
                  @select="myChangeEvent($event)"
                />

                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.boq_category_id.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>

              <div class="col-md-6">
                <label class="form-label"
                  >Items Category<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.boq_category_items_id.$model"
                  :options="categoryItems"
                  :settings="{ placeholder: 'Choose' }"
                  :class="{ isInvalid: v$.boq_category_items_id.$error }"
                />

                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.boq_category_items_id.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
            </div>

            <div class="row form-row">
              <div class="col-md-6">
                <label class="form-label"> Part Number/ Specification </label>
                <input
                  type="text"
                  class="form-input"
                  v-model.lazy="formState.part_number"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label"> Quantity </label>
                <input
                  type="text"
                  class="form-input"
                  v-model.lazy="formState.quantity"
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
              <div class="col-md-6" style="min-height: 267px">
                <label class="form-label">Description</label>
                <!-- :content="" use for set default Data-->
                <TheCKEditor @sendContent="setDescription" />
              </div>

              <div class="col-md-6">
                <div class="row" style="margin-bottom: 20px">
                  <div class="col-md-12">
                    <label class="form-label"> Unit of Measurement </label>
                    <input
                      type="text"
                      class="form-input"
                      v-model.lazy="formState.unit"
                    />
                  </div>
                </div>

                <label class="form-label">Choose File</label>
                <single-file-uploader
                  field_name="create_boq"
                  :version-id="v$.version_id.$model"
                ></single-file-uploader>
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
        ><i class="fas fa-plus-square"></i> Edit BOQ
      </template>
      <template v-slot:editbody>
        <form @submit.prevent="updateHandler" class="form-page">
          <div class="row">
            <div class="col-md-6">
              <label class="form-label"
                >Version<span class="mandatory">*</span></label
              >
              <Select2
                v-model="v$.version_id.$model"
                :options="versions"
                :settings="{ placeholder: 'Choose', multiple: false }"
                :class="{ isInvalid: v$.version_id.$error }"
              />

              <p
                class="error-mgs"
                v-for="(error, index) in v$.version_id.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i>
                {{ error.$message }}
              </p>
            </div>

            <div class="col-md-6">
              <label class="form-label">
                Items Name
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
            <div class="col-md-6">
              <label class="form-label"
                >Section Category<span class="mandatory">*</span></label
              >
              <Select2
                v-model="formState.boq_category_id"
                :options="categories"
                :settings="{ placeholder: 'Choose' }"
                :class="{ isInvalid: v$.boq_category_id.$error }"
                @change="myChangeEvent($event)"
                @select="myChangeEvent($event)"
              />

              <p
                class="error-mgs"
                v-for="(error, index) in v$.boq_category_id.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i>
                {{ error.$message }}
              </p>
            </div>

            <div class="col-md-6">
              <label class="form-label"
                >Items Category<span class="mandatory">*</span></label
              >
              <Select2
                v-model="v$.boq_category_items_id.$model"
                :options="categoryItems"
                :settings="{ placeholder: 'Choose' }"
                :class="{ isInvalid: v$.boq_category_items_id.$error }"
              />

              <p
                class="error-mgs"
                v-for="(error, index) in v$.boq_category_items_id.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i>
                {{ error.$message }}
              </p>
            </div>
          </div>

          <div class="row form-row">
            <div class="col-md-6">
              <label class="form-label"> Part Number/ Specification </label>
              <input
                type="text"
                class="form-input"
                v-model.lazy="formState.part_number"
              />
            </div>

            <div class="col-md-6">
              <label class="form-label"> Quantity </label>
              <input
                type="text"
                class="form-input"
                v-model.lazy="formState.quantity"
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
            <div class="col-md-6" style="min-height: 267px">
              <label class="form-label">Description</label>
              <!-- :content="" use for set default Data-->
              <TheCKEditor
                v-if="loadCKEditor"
                @sendContent="setDescription"
                :content="formState.description"
              />
            </div>

            <div class="col-md-6">
              <div class="row" style="margin-bottom: 20px">
                <div class="col-md-12">
                  <label class="form-label"> Unit of Measurement </label>
                  <input
                    type="text"
                    class="form-input"
                    v-model.lazy="formState.unit"
                  />
                </div>
              </div>

              <label class="form-label">Choose File</label>
              <single-file-uploader
                field_name="create_boq"
                :version-id="v$.version_id.$model"
              ></single-file-uploader>

              <a
                target="_blank"
                v-if="editable_file != null"
                :href="`${editable_file}`"
                >Download File</a
              >
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
    </EditModal>
    <!--end Edit Modal -->

    <!--start filter Modal -->
    <filter-modal v-if="fileModalState">
      <template v-slot:header
        ><i class="fas fa-filter"></i> Filter BOQ
      </template>
      <template v-slot:body>
        <form class="form-page" @submit.prevent="filterHandler">
          <div class="row form-row">
            <div class="col-md-4">
              <label class="form-label"> BOQ ID/Title </label>
              <input
                type="text"
                class="form-input"
                v-model="filterState.search"
                placeholder="Search here"
              />
            </div>
            <div class="col-md-4">
              <label class="form-label"> Created Date </label>
              <input
                type="date"
                class="form-input"
                v-model="filterState.created_date"
              />
            </div>
            <div class="col-md-4">
              <label class="form-label"> Updated Date</label>
              <input
                type="date"
                class="form-input"
                v-model="filterState.updated_date"
              />
            </div>
          </div>

          <div class="row form-row">
            <div class="col-md-4">
              <label class="form-label"> Version </label>
              <Select2
                v-model="filterState.version"
                :options="versions"
                :settings="{ placeholder: 'Choose' }"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.prevent="
                store.commit('modalModule/CHNAGE_FILTER_MODAL', false)
              "
            >
              <i class="far fa-times-circle"></i> Close
            </button>
            <button type="submit" class="btn pro-button">
              <i class="fas fa-filter"></i> Filter
            </button>
          </div>
        </form>
      </template>
    </filter-modal>
    <!--start end Filter Modal-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed, watch } from "vue";
import Axios from "@/http-common";
import BoqTable from "./BoqTable.vue";
import swal from "sweetalert";
import { useDatatable } from "@/composables/datatables";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import CreateModal from "../../../core/shared/CreateModal.vue";
import EditModal from "../../../core/shared/EditModal.vue";
import FilterModal from "../../../core/shared/FilterModal.vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Select2 from "vue3-select2-component";
import SingleFileUploader from "../../../core/shared/file-uploader/SingleFileUploader.vue";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";
import { useRoute } from "vue-router";
import toastr from "toastr";

//get route information using route
const route = useRoute();

//create store
const store = useStore();

//use for deleting spenner
let deletingSpinner = ref(false);
let savingSpinner = ref(false);
let loadingSpinner = ref(false);

//use for multiselected
const multiselected = ref([]);

//modal size
const modalSize = ref("modal-lg");

//use datatable composables
const { entries, datatables, showEntries, currentEntries, filterData } =
  useDatatable();

/**********************
 * Create BOQ
 ***********************/
const editable_file = ref(null);

const formState = reactive({
  version_id: "",
  title: "",
  description: "",
  boq_category_items_id: "",
  boq_category_id: "",
  quantity: "",
  unit: "",
  part_number: "",
  project_id: route.params.project_id,
  token: store.state.currentUser.token,
});

const rules: any = {
  version_id: { required },
  title: { required },
  boq_category_items_id: { required },
  boq_category_id: { required },
};

const setDescription = (value: any) => {
  formState.description = value;
};

const v$ = useVuelidate(rules, formState);

//reset all property
function resetForm() {
  formState.version_id = "";
  formState.title = "";
  formState.description = "";
  formState.boq_category_items_id = "";
  formState.boq_category_id = "";
  formState.quantity = "";
  formState.unit = "";
  formState.part_number = "";
  v$.value.$reset();
}
/**********************
 * End Create BOQ
 ***********************/

//Search Property
let search = ref("");
const versions = ref([]);
const categories = ref([]);
const categoryItems = ref([]);

//Load Data form computed onMounted
onMounted(() => {
  filterData("/projects/boqs", "&project_id=" + route.params.project_id);
  getVersions();
  getCategories();
});

//filter by BOQ ID/ BOQ title
watch([search], async () => {
  filterData(
    "/projects/boqs",
    "&project_id=" + route.params.project_id + "&search=" + search.value
  );
});

//modal setting
const createModalState = computed(() => {
  return store.state.modalModule.creatModal;
});

const editModalState = computed(() => {
  return store.state.modalModule.editModal;
});

const fileModalState = computed(() => {
  return store.state.modalModule.filterModal;
});

async function submitHandler() {
  //check validation
  v$.value.$validate();
  v$.value.$touch();

  if (!v$.value.$error) {
    //Start data saving spinner
    savingSpinner.value = true;
    await Axios.post("projects/boqs", formState)
      .then((response) => {
        if (response.data.code === 200) {
          //get Data using api
          filterData(
            "/projects/boqs",
            "&project_id=" + route.params.project_id
          );
          //Close Create Modal
          store.commit("modalModule/CHNAGE_CREATE_MODAL", false);
          //reset form field
          resetForm();
          //Stop Saving Spinner
          savingSpinner.value = false;
          swal("Success Job!", "Created record successfully!", "success");
        } else {
          savingSpinner.value = false;
          //Show Error message
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}

// Load CkEditor Data
const loadCKEditor = computed(() => {
  return store.state.modalModule.loadCKEditor;
});

//editable Id
const editable_id = ref();

//Load Single data for Edit
async function editModal(id: number) {
  resetForm();
  loadingSpinner.value = true;
  editable_id.value = id;
  store.commit("modalModule/CHNAGE_EDIT_MODAL", true);
  await Axios.get("/projects/boqs/" + id).then((response) => {
    loadingSpinner.value = false;
    if (response.data.code === 200) {
      formState.project_id = response.data.data.project_id;
      formState.version_id = response.data.data.version_id;
      formState.title = response.data.data.boq_title;
      formState.description = response.data.data.project_description;
      formState.boq_category_items_id =
        response.data.data.boq_category_items_id;
      formState.boq_category_id = response.data.data.boq_category_id;
      formState.quantity = response.data.data.quantity;
      formState.unit = response.data.data.unit;
      formState.part_number = response.data.data.part_number;
      categoryItems.value = response.data.data.category_item;
      editable_file.value = response.data.data.file;
      store.commit("modalModule/LOAD_CKEDITOR_MODAL", true);
    } else {
      toastr.error(response.data.message);
    }
  });
}

//update data
async function updateHandler() {
  //check validation
  v$.value.$validate();
  v$.value.$touch();

  if (!v$.value.$error) {
    //Start data saving spinner
    savingSpinner.value = true;
    await Axios.put("projects/boqs/" + editable_id.value, formState)
      .then((response) => {
        if (response.data.code === 200) {
          //get Data using api
          filterData(
            "/projects/boqs",
            "&project_id=" + route.params.project_id
          );
          //Close Create Modal
          store.commit("modalModule/CHNAGE_EDIT_MODAL", false);
          //reset form field
          resetForm();
          //Stop Saving Spinner
          savingSpinner.value = false;
          swal("Success Job!", "Updated record successfully!", "success");
        } else {
          savingSpinner.value = false;
          //Show Error message
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}

async function getVersions() {
  await Axios.get("get-versions")
    .then((response) => {
      versions.value = response.data.data;
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

async function getCategories() {
  await Axios.get("boq-category-selectable")
    .then((response) => {
      categories.value = response.data.data;
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

async function myChangeEvent(val: any) {
  loadingSpinner.value = true;
  await Axios.get("boq-category-item-selectable/" + val.id)
    .then((response) => {
      console.log(response);
      loadingSpinner.value = false;
      categoryItems.value = response.data.data;
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

//filter start
const filterState = reactive({
  search: "",
  created_date: "",
  updated_date: "",
  version: "",
});

//filter Handler
function filterHandler() {
  let path =
    "&search=" +
    filterState.search +
    "&created_at=" +
    filterState.created_date +
    "&updated_at=" +
    filterState.updated_date +
    "&version_id=" +
    filterState.version;
  filterData("/projects/boqs", path);
  store.commit("modalModule/CHNAGE_FILTER_MODAL", false);
}

//show data using show Menu
function paginateEntries(e: any) {
  currentEntries.value = e.target.value;
  filterData("/projects/boqs", "&project_id=" + route.params.project_id);
}

//show previous page data
function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    filterData("/projects/boqs", "&project_id=" + route.params.project_id);
  }
}

//show next page data
function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    filterData("/projects/boqs", "&project_id=" + route.params.project_id);
  }
}

//show current Page Data
function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  filterData("/projects/boqs", "&project_id=" + route.params.project_id);
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
      await Axios.delete("/projects/boqs/" + id).then((response) => {
        deletingSpinner.value = false;
        if (response.data.code === 200) {
          filterData(
            "/projects/boqs",
            "&project_id=" + route.params.project_id
          );
          swal("Poof! Your data has been deleted!", {
            icon: "success",
          });
        } else {
          //Show Error message
          toastr.error(response.data.message);
        }
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
      await Axios.post("/projects/boqs-multidelete", {
        ids: multiselected.value.multiselect,
      }).then((response) => {
        deletingSpinner.value = false;
        if (response.data.code === 200) {
          filterData(
            "/projects/boqs",
            "&project_id=" + route.params.project_id
          );
          swal("Poof! Your data has been deleted!", {
            icon: "success",
          });
        } else {
          toastr.error(response.data.message);
        }
      });
    }
  });
}

//download files
async function downloadFile(boq_unique_id: number) {
  await Axios.post(
    "/projects/boqs-file-download",
    {
      id: boq_unique_id,
    },
    {
      responseType: "blob",
    }
  ).then((response) => {
    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    var fileLink = document.createElement("a");
    fileLink.href = fileURL;
    fileLink.setAttribute("download", "file.xlsx");
    document.body.appendChild(fileLink);
    fileLink.click();
    // if (response.data.code === 200) {
    //   console.log("downloaded successfully");
    // } else {
    //   toastr.error("Some problem here...");
    // }
  });
}

//Change selected data status
async function changeStatus(status: { id: number; status: number }) {
  await Axios.post("/projects/boqs-change-status", status).then((response) => {
    swal("Your data status changed", {
      icon: "success",
    });
    filterData("/projects/boqs", "&project_id=" + route.params.project_id);
  });
}
</script>

<style scoped></style>
