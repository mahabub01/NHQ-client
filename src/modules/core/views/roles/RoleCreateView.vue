<template>
  <div class="container-fluid">
    <!--start Spinner -->
    <the-spinner :isSaving="savingSpinner" :isLoading="isLoading"></the-spinner>

    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/core/roles"
              >Role List <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="/core/roles/create">Create</router-link>
          </div>
          <div class="col-md-8">
            <div class="float-right">
              <button type="submit" class="form-button margin-right-10">
                <i class="far fa-save"></i> Submit
              </button>
              <router-link
                class="form-button-danger"
                style="color: white"
                to="/core/roles"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="form-design-body">
        <div class="container">
          <h4 class="form-page-title">Create Roles</h4>
          <div class="row">
            <div class="col-md-5 offset-md-1">
              <!--start field-->
              <div class="form-row">
                <label class="form-label"
                  >Role Name<span class="mandatory">*</span></label
                >
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
              <!--end field-->
            </div>
            <!--end column-->
            <div class="col-md-5">
              <!--start field-->
              <div class="form-row">
                <label class="form-label"
                  >Flag<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.flag.$model"
                  :options="flagList"
                  :settings="{ placeholder: 'Choose' }"
                  :class="{ isInvalid: v$.flag.$error }"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.flag.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end field-->
            </div>
          </div>

          <div class="row">
            <div class="col-md-10 offset-md-1">
              <h3
                class="form-page-title"
                style="
                  text-align: left;
                  margin-bottom: 10px;
                  padding-bottom: 7px;
                  border-bottom: 1px dotted silver;
                "
              >
                All Modules and Components
              </h3>
              <!--start accordion-->
              <div class="accordion" id="accordionExample">
                <template
                  v-for="(modules, moduleIndex) in modulesList"
                  :key="moduleIndex"
                >
                  <div style="margin-bottom: 30px">
                    <h3
                      class="form-page-title"
                      style="
                        text-align: left;
                        margin-bottom: 10px;
                        padding-bottom: 0px;
                      "
                    >
                      <i class="fas fa-tools"></i> {{ modules.name }} Module
                    </h3>
                    <div
                      class="accordion-item"
                      v-for="(component, index) in modules.components"
                      :key="index"
                    >
                      <h2
                        class="accordion-header"
                        :id="`heading_${modules.id}_${component.id}`"
                      >
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="`#collapse_${modules.id}_${component.id}`"
                          aria-expanded="false"
                          :aria-controls="`collapse_${modules.id}_${component.id}`"
                        >
                          <input
                            type="checkbox"
                            style="margin-right: 7px"
                            @change="
                              componentAllSelect(`${moduleIndex}`, `${index}`)
                            "
                            v-model="isCheckAll[component.id]"
                          />
                          {{ component.name }}
                        </button>
                      </h2>
                      <div
                        :id="`collapse_${modules.id}_${component.id}`"
                        class="accordion-collapse collapse"
                        :aria-labelledby="`heading_${modules.id}_${component.id}`"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <div class="row">
                            <div
                              class="col-md-3"
                              v-for="(permission, k) in component.permissions"
                              :key="k"
                            >
                              <label
                                style="
                                  color: #208da5;
                                  margin-bottom: 10px;
                                  font-weight: 500;
                                "
                                ><input
                                  type="checkbox"
                                  v-model="multiselect"
                                  :value="`${permission.id}`"
                                  @change="
                                    changeModuleComponent(
                                      `${permission.id}`,
                                      `${permission.module_id}`,
                                      `${permission.component_id}`,
                                      $event
                                    )
                                  "
                                />
                                {{ permission.name }}</label
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <!--end accordion-->
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import Select2 from "vue3-select2-component";
import toastr from "toastr";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

//use for saving preloader
let savingSpinner = ref(false);

const router = useRouter();

//create store
const store = useStore();

//Category list for Category Select
const flagList = ref([]);

const modulesList = ref([]);

const isLoading = ref(false);

// const modulesList = ref([
//   {
//     id: 1,
//     name: "Project Management",
//     components: [
//       {
//         id: 1,
//         name: "Component 1",
//         all_selected: false,
//         permissions: [
//           { id: 1, name: "Display POC", module_id: 1, component_id: 1 },
//           { id: 2, name: "Create POC", module_id: 1, component_id: 1 },
//           { id: 3, name: "Edit POC", module_id: 1, component_id: 1 },
//           { id: 4, name: "Delete POC", module_id: 1, component_id: 1 },
//           { id: 5, name: "Filter POC", module_id: 1, component_id: 1 },
//           { id: 6, name: "Export POC", module_id: 1, component_id: 1 },
//           { id: 7, name: "Import POC", module_id: 1, component_id: 1 },
//         ],
//       },
//       { id: 2, name: "Component 2", all_selected: false },
//       { id: 3, name: "Component 3", all_selected: false },
//     ],
//   },
//   {
//     id: 2,
//     name: "CRM",
//     components: [
//       {
//         id: 4,
//         name: "CRM Component 1",
//         all_selected: false,
//         permissions: [
//           { id: 8, name: "Display POC", module_id: 2, component_id: 4 },
//           { id: 9, name: "Create POC", module_id: 2, component_id: 4 },
//           { id: 10, name: "Edit POC", module_id: 2, component_id: 4 },
//           { id: 11, name: "Delete POC", module_id: 2, component_id: 4 },
//           { id: 12, name: "Filter POC", module_id: 2, component_id: 4 },
//           { id: 13, name: "Export POC", module_id: 2, component_id: 4 },
//           { id: 14, name: "Import POC", module_id: 2, component_id: 4 },
//         ],
//       },
//       { id: 5, name: "CRM Component 2", all_selected: false },
//       { id: 6, name: "CRM Component 3", all_selected: false },
//     ],
//   },
// ]);

const multiselect = ref([] as number[]); //permission id
let isCheckAll = ref([] as boolean[]);
// const moduleIds = ref([] as number[]);
// const componentIds = ref([] as number[]);

let loadPermission: any = ref([]);

//All Permission selected
function componentAllSelect(moduleIndex: any, componentIndex: any) {
  let all_permissions =
    modulesList.value[moduleIndex].components[componentIndex].permissions;

  modulesList.value[moduleIndex].components[componentIndex].all_selected =
    !modulesList.value[moduleIndex].components[componentIndex].all_selected;

  isCheckAll.value[
    modulesList.value[moduleIndex].components[componentIndex].id
  ] = modulesList.value[moduleIndex].components[componentIndex].all_selected;

  //multiselect.value = [];
  // moduleIds.value = [];
  //componentIds.value = [];
  if (
    isCheckAll.value[
      modulesList.value[moduleIndex].components[componentIndex].id
    ]
  ) {
    all_permissions?.forEach((item) => {
      if (!multiselect.value.includes(item.id)) {
        multiselect.value.push(item.id);
        loadPermission.value.push({
          permission: item.id,
          module_id: item.module_id,
          component_id: item.component_id,
        });
      }
    });
  } else {
    //Remove item from multiselect Array
    let tempArray: any = [];
    all_permissions?.forEach((item) => {
      const arr_index = multiselect.value.indexOf(item.id);
      if (arr_index > -1) {
        multiselect.value.splice(arr_index, 1); // 2nd parameter means remove one item only
      }
      tempArray.push(item.id);
    });

    loadPermission.value = loadPermission.value.filter(
      (p_item: any) => !tempArray.includes(p_item.permission)
    );
  }
}

//when change Permission that time change data using this method
function changeModuleComponent(p_id: any, m_id: any, c_id: any, event: any) {
  if (event.target.checked) {
    loadPermission.value.push({
      permission: p_id,
      module_id: m_id,
      component_id: c_id,
    });
  } else {
    loadPermission.value = loadPermission.value.filter(
      (p_item: any) => p_item.permission != p_id
    );
  }

  //console.log("change array " + loadPermission.value.id);
}

//Load Data form computed onMounted
onMounted(() => {
  getFlag();
  getPermissionsForRole();
});

//get Selectable TeamList
async function getFlag() {
  await Axios.get("flags")
    .then((response) => {
      if (response.data.code === 200) {
        flagList.value = response.data.data;
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

//get Selectable TeamList
async function getPermissionsForRole() {
  isLoading.value = true;
  await Axios.get("get-module-permission-for-role")
    .then((response) => {
      if (response.data.code === 200) {
        isLoading.value = false;
        modulesList.value = response.data.data;
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

//get Selectable leadList
async function getLeadList() {
  // await Axios.get("teamlead-selectable")
  //   .then((response) => {
  //     if (response.data.code === 200) {
  //       leadList.value = response.data.data;
  //     } else {
  //       toastr.error(response.data.message);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("problem Here" + error);
  //   });
}

const formState = reactive({
  name: "",
  flag: "",
  perissions: loadPermission.value,
});

const rules: any = {
  name: { required },
  flag: { required },
};

const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();

  if (!v$.value.$error) {
    console.log(loadPermission.value);
    // console.log("permission" + multiselect.value);
    // console.log("module " + moduleIds.value);
    // console.log("component " + componentIds.value);
    // console.log("role" + formState.name);
    // console.log("flag" + formState.flag);

    //savingSpinner.value = true;
    await Axios.post("/roles", {
      name: formState.name,
      flag: formState.flag,
      permission: loadPermission.value,
    })
      .then((response) => {
        if (response.data.code === 200) {
          resetForm();
          //Stop Saving Spinner
          savingSpinner.value = false;
          swal("Success Job!", "Created role successfully!", "success");
          router.push("/core/roles");
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

//reset all property
function resetForm() {
  formState.name = "";
  formState.flag = "";
  v$.value.$reset();
}
</script>

<style scoped>
.accordion-button {
  padding: 10px 1.25rem;
}

.accordion-button:focus {
  z-index: 3;
  border-color: #edf0f4;
  outline: 0;
  border: none;
  box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
}

.accordion-button:not(.collapsed) {
  color: #011534;
  background-color: #edf0f4;
  box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
}
</style>
