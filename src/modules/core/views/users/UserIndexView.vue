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
                    <router-link to="#" class="rev-underline-subtitle"
                      >Authentication
                      <i
                        class="fas fa-chevron-right"
                        style="margin-left: 6px; margin-right: 6px"
                      ></i>
                    </router-link>
                    <router-link to="/core/users" class="rev-underline-subtitle"
                      >Users List</router-link
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
                    <user-table
                      :entries="entries"
                      :loadingState="datatables.loadingState"
                      @delete="remove($event)"
                      @activation="changeStatus($event)"
                      @editId="showEdit($event)"
                      @passwordId="openChangePassword($event)"
                      ref="multiselected"
                    ></user-table>

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
          ><i class="fas fa-plus-square"></i> Create Users
        </template>
        <template v-slot:body>
          <form @submit.prevent="createSubmit" class="form-page">
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">
                  Name
                  <span class="mandatory">*</span>
                </label>
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.name.$error }"
                  v-model.lazy="v$.name.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.name.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <div class="col-md-6">
                <label class="form-label">
                  Email <span class="mandatory">*</span>
                </label>
                <input
                  type="text"
                  class="form-input"
                  v-model.lazy="v$.email.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.email.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">
                  Phone
                  <span class="mandatory">*</span>
                </label>
                <input
                  type="text"
                  class="form-input"
                  :class="{ isInvalid: v$.phone.$error }"
                  v-model.lazy="v$.phone.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.phone.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <div class="col-md-6">
                <label class="form-label">
                  Role
                  <span class="mandatory">*</span>
                </label>
                <Select2
                  v-model="v$.role_id.$model"
                  :options="roleList"
                  :settings="{ placeholder: 'Choose' }"
                  :class="{ isInvalid: v$.role_id.$error }"
                />

                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.role_id.$errors"
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
                  Password <span class="mandatory">*</span></label
                >
                <input
                  type="password"
                  class="form-input"
                  :class="{ isInvalid: v$.password.$error }"
                  v-model.lazy="v$.password.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.password.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <div class="col-md-6">
                <label class="form-label">
                  Confirm Password <span class="mandatory">*</span></label
                >
                <input
                  type="password"
                  class="form-input"
                  :class="{ isInvalid: v$.confirm_password.$error }"
                  v-model.lazy="v$.confirm_password.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.confirm_password.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
            </div>

            <div class="modal-footer" style="margin-top: 30px">
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
        ><i class="fas fa-plus-square"></i> Edit User
      </template>
      <template v-slot:editbody>
        <form @submit.prevent="updateHandler" class="form-page">
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label">
                Name
                <span class="mandatory">*</span>
              </label>
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: vEdit$.name.$error }"
                v-model.lazy="vEdit$.name.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in vEdit$.name.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i>
                {{ error.$message }}
              </p>
            </div>
            <div class="col-md-6">
              <label class="form-label">
                Email <span class="mandatory">*</span>
              </label>
              <input
                type="text"
                class="form-input"
                v-model.lazy="vEdit$.email.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in vEdit$.email.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i>
                {{ error.$message }}
              </p>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label">
                Phone
                <span class="mandatory">*</span>
              </label>
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: vEdit$.phone.$error }"
                v-model.lazy="vEdit$.phone.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in vEdit$.phone.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i>
                {{ error.$message }}
              </p>
            </div>
            <div class="col-md-6">
              <label class="form-label">
                Role
                <span class="mandatory">*</span>
              </label>
              <Select2
                v-model="vEdit$.role_id.$model"
                :options="roleList"
                :settings="{ placeholder: 'Choose' }"
                :class="{ isInvalid: vEdit$.role_id.$error }"
              />

              <p
                class="error-mgs"
                v-for="(error, index) in vEdit$.role_id.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i>
                {{ error.$message }}
              </p>
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

    <!--start Password Modal -->
    <PasswordModal :modalsize="modalSm" v-if="passwordModalState">
      <template v-slot:passwordheader
        ><i class="fas fa-plus-square"></i> Password Change
      </template>
      <template v-slot:passwordbody>
        <form @submit.prevent="passwordUpdate" class="form-page">
          <div class="row mb-3">
            <div class="col-md-12">
              <label class="form-label">
                Password
                <span class="mandatory">*</span>
              </label>
              <input
                type="password"
                class="form-input"
                :class="{ isInvalid: vPassword$.password.$error }"
                v-model.lazy="vPassword$.password.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in vPassword$.password.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i>
                {{ error.$message }}
              </p>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-12">
              <label class="form-label">
                Confirm Password
                <span class="mandatory">*</span>
              </label>
              <input
                type="password"
                class="form-input"
                :class="{ isInvalid: vPassword$.confirm_password.$error }"
                v-model.lazy="vPassword$.confirm_password.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in vPassword$.confirm_password.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i>
                {{ error.$message }}
              </p>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.prevent="
                store.commit('modalModule/CHNAGE_PASSWORD_MODAL', false)
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
    </PasswordModal>
    <!--end Password Modal -->
    <h1 v-if="getPermission(`project displaysadflkjsd`)">Test Data Here</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed, reactive } from "vue";
import Axios from "@/http-common";
import UserTable from "./UserTable.vue";
import swal from "sweetalert";
import { useDatatable } from "@/composables/datatables";
import TablePagination from "@/modules/shared/pagination/TablePagination.vue";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import CreateModal from "../../../core/shared/CreateModal.vue";
import EditModal from "../../../core/shared/EditModal.vue";
import PasswordModal from "../../../core/shared/PasswordModal.vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Select2 from "vue3-select2-component";
import toastr from "toastr";
import { usePermission } from "@/composables/permissions";
import { useRoute } from "vue-router";

//get route information using route
const route = useRoute();

const { getPermission } = usePermission();

//modal size
const modalSize = ref("modal-lg");
const modalSm = ref("modal-md");

//modal setting
const createModalState = computed(() => {
  return store.state.modalModule.creatModal;
});

const editModalState = computed(() => {
  return store.state.modalModule.editModal;
});

const passwordModalState = computed(() => {
  return store.state.modalModule.passwordModal;
});

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
 * Create Components
 ***********************/
const state = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
  role_id: "",
});

const rules: any = {
  name: { required },
  email: { required },
  phone: { required },
  role_id: { required },
  password: { required },
  confirm_password: { required },
};

const v$ = useVuelidate(rules, state);

async function createSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    //savingSpinner.value = true;
    await Axios.post("users", state)
      .then((response) => {
        if (response.data.code == 200) {
          store.commit("modalModule/CHNAGE_CREATE_MODAL", false);
          fetchData("users");
          resetForm();
          savingSpinner.value = false;
          swal("Success Job!", "User created successfully!", "success");
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

//========== edit pert  ==============

const rulesEdit: any = {
  name: { required },
  email: { required },
  phone: { required },
  role_id: { required },
};

const vEdit$ = useVuelidate(rulesEdit, state);

// recive editable data all value
const single_datas = ref([]);

let editableId = "";

async function getEditData(id: number) {
  await Axios.get("/users/" + id).then((response) => {
    single_datas.value = response.data.data;
    state.name = single_datas.value.name;
    state.phone = single_datas.value.phone;
    state.email = single_datas.value.email;
    state.role_id = single_datas.value.role_id;
  });
}

async function updateHandler() {
  vEdit$.value.$validate();
  vEdit$.value.$touch();
  console.log(vEdit$.value.$error);
  if (!v$.value.$error) {
    savingSpinner.value = true;
    await Axios.put("users/" + editableId, state)
      .then((response) => {
        if (response.data.code == 200) {
          store.commit("modalModule/CHNAGE_EDIT_MODAL", false);
          fetchData("/users");
          resetForm();
          savingSpinner.value = false;
          swal("Success Job!", "Your user updated successfully!", "success");
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
//=========== Change Password  ===============

let passwordChangeId = "";

const rulespassword: any = {
  password: { required },
  confirm_password: { required },
};

const vPassword$ = useVuelidate(rulespassword, state);
// const single_datas = ref([]);
let passwordableId = "";

function openChangePassword(id) {
  passwordableId = id;
  store.commit("modalModule/CHNAGE_PASSWORD_MODAL", true);
}

//Change selected data status
async function passwordUpdate() {
  vPassword$.value.$validate();
  vPassword$.value.$touch();

  if (!vPassword$.value.$error) {
    savingSpinner.value = true;

    await Axios.post("/users-password-change", {
      id: passwordableId,
      password: state.password,
      password_confirmation: state.confirm_password,
    })
      .then((response) => {
        if (response.data.code == 200) {
          console.log(response.data);

          store.commit("modalModule/CHNAGE_PASSWORD_MODAL", false);
          fetchData("users");
          resetForm();
          savingSpinner.value = false;
          swal("Success Job!", "User password update successfully!", "success");
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

const roleList = ref([]);

// User role_id
async function getRoles() {
  await Axios.get("role-selectable")
    .then((response) => {
      roleList.value = response.data.data;
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

//reset all property
function resetForm() {
  state.name = "";
  state.phone = "";
  state.email = "";
  state.role_id = "";
  state.password = "";
  state.confirm_password = "";
  v$.value.$reset();
}

/**********************
 * End Create Component
 ***********************/

//Search Property
let titleSearch = ref("");

watch([titleSearch], async () => {
  datatables.loadingState = true;
  await Axios.get(
    "/users?showEntries=" +
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
  fetchData("/users");
  getRoles();
});

//show data using show Menu
function paginateEntries(e: any) {
  currentEntries.value = e.target.value;
  fetchData("/users");
}

//show previous page data
function prev() {
  if (datatables.currentPage > 1) {
    datatables.currentPage = datatables.currentPage - 1;
    fetchData("/users");
  }
}

//show next page data
function next() {
  if (datatables.currentPage != datatables.allPages) {
    datatables.currentPage = datatables.currentPage + 1;
    fetchData("/users");
  }
}

//show current Page Data
function currentPage(currentp: number) {
  datatables.currentPage = currentp;
  fetchData("users");
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
      await Axios.delete("/users/" + id).then((response) => {
        entries.value = entries.value.filter(
          (e: { id: number }) => e.id !== id
        );
        deletingSpinner.value = false;
        fetchData("/users");
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
      await Axios.post("/users-multidelete", {
        ids: multiselected.value.multiselect,
      }).then((response) => {
        fetchData("/users");
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
  await Axios.post("/users-change-status", status).then((response) => {
    swal("Your data status changed", {
      icon: "success",
    });
    fetchData("users");
  });
}
</script>

<style scoped></style>
