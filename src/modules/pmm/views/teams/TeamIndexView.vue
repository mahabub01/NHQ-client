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
                    <router-link to="/pmm/teams" class="rev-underline-subtitle"
                      >Team List</router-link
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
                        placeholder="Search Team"
                        style="margin-right: 7px"
                        v-model.lazy="team_nameSearch"
                      />

                      <button
                        v-if="getPermission(`create_team`)"
                        type="button"
                        class="link_btn"
                        style="margin-right: 7px"
                        @click="openCreateModal()"
                      >
                        <i class="fas fa-plus"></i> Create
                      </button>
                      <div class="btn-group">
                        <button
                          v-if="getPermission(`bulk_delete_team`)"
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
                    <team-table
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      @delete="remove($event)"
                      @activation="changeStatus($event)"
                      @editId="showEdit($event)"
                      ref="multiselected"
                    ></team-table>

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
          ><i class="fas fa-plus-square"></i> Create Team
        </template>
        <template v-slot:body>
          <form @submit.prevent="teamSubmit" class="form-page">
            <div class="row">
              <div class="col-md-12">
                <label class="form-label">
                  Team Name
                  <span class="mandatory">*</span>
                </label>
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.team_name.$error }"
                  v-model.lazy="v$.team_name.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.team_name.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
            </div>

            <div class="row form-row">
              <div class="col-md-12">
                <label class="form-label"
                  >Team Lead<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.team_lead.$model"
                  :options="employeesSelectable"
                  :settings="{ placeholder: 'Choose' }"
                  :class="{ isInvalid: v$.team_lead.$error }"
                />

                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.team_lead.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
            </div>

            <div class="row form-row">
              <div class="col-md-12">
                <label class="form-label"
                  >Add User<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.clients.$model"
                  :options="employeesSelectable"
                  :settings="{ placeholder: 'Choose', multiple: true }"
                  :class="{ isInvalid: v$.clients.$error }"
                />

                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.clients.$errors"
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
          <i class="fas fa-plus-square"></i> Edit Team
        </template>
        <template v-slot:editbody>
          <form @submit.prevent="editSubmit" class="form-page">
            <div class="row">
              <div class="col-md-12">
                <label class="form-label">
                  Team Name
                  <span class="mandatory">*</span>
                </label>
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.team_name.$error }"
                  v-model.lazy="v$.team_name.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.team_name.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
            </div>

            <div class="row form-row">
              <div class="col-md-12">
                <label class="form-label"
                  >Team Lead<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.team_lead.$model"
                  :options="employeesSelectable"
                  :settings="{ placeholder: 'Choose', multiple: false }"
                  :class="{ isInvalid: v$.team_lead.$error }"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.team_lead.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
            </div>

            <div class="row form-row">
              <div class="col-md-12">
                <label class="form-label"
                  >Add User<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.clients.$model"
                  :options="employeesSelectable"
                  :settings="{ placeholder: 'Choose', multiple: true }"
                  :class="{ isInvalid: v$.clients.$error }"
                />

                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.clients.$errors"
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
import TeamTable from "./TeamTable.vue";
import swal from "sweetalert";
import { useDatatable } from "@/composables/datatables";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import CreateModal from "../../../core/shared/CreateModal.vue";
import EditModal from "../../../core/shared/EditModal.vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Select2 from "vue3-select2-component";
import toastr from "toastr";
import { usePermission } from "@/composables/permissions";

const { getPermission } = usePermission();

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
 * Create Team
 ***********************/
const state = reactive({
  team_name: "",
  team_lead: "",
  description: "",
  clients: "",
});

const rules: any = {
  team_name: { required },
  team_lead: { required },
  clients: { required },
};

const v$ = useVuelidate(rules, state);

async function teamSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    savingSpinner.value = true;
    await Axios.post("projects/teams", state)
      .then((response) => {
        if (response.data.code == 200) {
          store.commit("modalModule/CHNAGE_CREATE_MODAL", false);
          fetchData("/projects/teams");
          resetForm();
          savingSpinner.value = false;
          swal("Success Job!", "Your team created successfully!", "success");
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
  state.team_name = "";
  state.team_lead = "";
  state.description = "";
  state.clients = "";
  v$.value.$reset();
}
/**********************
 * End Create Team
 ***********************/

//Search Property
let team_nameSearch = ref("");

watch([team_nameSearch], async () => {
  datatables.loadingState = true;
  await Axios.get(
    "/projects/teams?showEntries=" +
      currentEntries.value +
      "&page=" +
      datatables.currentPage +
      "&searchTeam_Name=" +
      team_nameSearch.value
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
  fetchData("/projects/teams");
});

//show data using show Menu
function paginateEntries(e: any) {
  currentEntries.value = e.target.value;
  fetchData("/projects/teams");
}

//show previous page data
function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    fetchData("/projects/teams");
  }
}

//show next page data
function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    fetchData("/projects/teams");
  }
}

//show current Page Data
function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  fetchData("/projects/teams");
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
      await Axios.delete("/projects/teams/" + id).then((response) => {
        entries.value = entries.value.filter(
          (e: { id: number }) => e.id !== id
        );
        deletingSpinner.value = false;
        fetchData("/projects/teams");

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
      await Axios.post("/projects/teams-multidelete", {
        ids: multiselected.value.multiselect,
      }).then((response) => {
        fetchData("/projects/teams");
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
  await Axios.post("/projects/teams-status", status).then((response) => {
    swal("Your data status changed", {
      icon: "success",
    });
    fetchData("/projects/teams");
  });
}

// edit pert
const single_datas = ref([]);
let editableId = "";

async function getEditData(id: number) {
  await Axios.get("/projects/teams/" + id).then((response) => {
    single_datas.value = response.data;
    state.team_name = single_datas.value.team_name;
    state.team_lead = single_datas.value.team_lead;
    state.clients = single_datas.value.clients[0];
    state.description = single_datas.value.description;
  });
}

async function userdata() {
  await Axios.get("/employees-selectable/").then((response) => {
    employeesSelectable.value = response.data.data;
  });
}

async function editSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    store.commit("modalModule/CHNAGE_EDIT_MODAL", false);
    savingSpinner.value = true;
    await Axios.put("projects/teams/" + editableId, state)
      .then((response) => {
        fetchData("/projects/teams");
        resetForm();
        savingSpinner.value = false;
        swal("Success Job!", "Your team created successfully!", "success");
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}

function showEdit(id) {
  editableId = id;
  getEditData(id);
  userdata();
  store.commit("modalModule/CHNAGE_EDIT_MODAL", true);
}

//Category list for Category Select
const employeesSelectable = ref([]);

// teams data get
async function openCreateModal() {
  resetForm();
  store.commit("modalModule/CHNAGE_CREATE_MODAL", true);
  await Axios.get("/employees-selectable").then((response) => {
    employeesSelectable.value = response.data.data;
  });
}
</script>

<style scoped></style>
