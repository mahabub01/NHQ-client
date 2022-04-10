<template>
  <div class="container-fluid">
    <!--start Spinner -->
    <the-spinner :isSaving="savingSpinner"></the-spinner>

    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/projects"
              >Project List <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="/pmm/projects/create">Create</router-link>
          </div>
          <div class="col-md-8">
            <div class="float-right">
              <button type="submit" class="form-button margin-right-10">
                <i class="far fa-save"></i> Submit
              </button>
              <router-link
                class="form-button-danger"
                style="color: white"
                to="/pmm/projects"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="form-design-body">
        <div class="container">
          <h4 class="form-page-title">Create Project</h4>
          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Project Name<span class="mandatory">*</span></label
              >
              <input
                type="text"
                class="form-input"
                :class="{ isInvalid: v$.name.$error }"
                placeholder="Title here"
                v-model.lazy="v$.name.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.name.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <!--start Category Field -->
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >Category Name<span class="mandatory">*</span></label
              >
              <Select2
                v-model="v$.category_id.$model"
                :options="categoryList"
                :settings="{ placeholder: 'Choose' }"
                :class="{ isInvalid: v$.category_id.$error }"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.category_id.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <!--end Category Field -->
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Project Team<span class="mandatory">*</span></label
              >
              <Select2
                v-model="v$.team_id.$model"
                :options="teamList"
                :settings="{ placeholder: 'Choose' }"
                :class="{ isInvalid: v$.team_id.$error }"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.team_id.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >Project Lead<span class="mandatory">*</span></label
              >
              <Select2
                v-model="v$.lead_id.$model"
                :options="leadList"
                :settings="{ placeholder: 'Choose' }"
                :class="{ isInvalid: v$.lead_id.$error }"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.lead_id.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Add Client<span class="mandatory">*</span></label
              >
              <Select2
                v-model="v$.client_id.$model"
                :options="clientList"
                :settings="{ placeholder: 'Choose' }"
                :class="{ isInvalid: v$.client_id.$error }"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.client_id.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >Tags<span class="mandatory">*</span></label
              >
              <Select2
                v-model="v$.tags.$model"
                :options="tagList"
                :settings="{ placeholder: 'Choose', multiple: true }"
                :class="{ isInvalid: v$.tags.$error }"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.tags.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <label class="form-label"
                >Start Date<span class="mandatory">*</span></label
              >
              <input
                type="date"
                class="form-input"
                :class="{ isInvalid: v$.start_date.$error }"
                placeholder="Title here"
                v-model.lazy="v$.start_date.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.start_date.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >End Date<span class="mandatory">*</span></label
              >
              <input
                type="date"
                class="form-input"
                :class="{ isInvalid: v$.end_date.$error }"
                placeholder="Title here"
                v-model.lazy="v$.end_date.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.end_date.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 offset-md-1">
              <div class="form-row">
                <label class="form-label"
                  >Extended Date<span class="mandatory">*</span></label
                >
                <input
                  type="date"
                  class="form-input"
                  :class="{ isInvalid: v$.extended_date.$error }"
                  placeholder="Title here"
                  v-model.lazy="v$.extended_date.$model"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.extended_date.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>

              <!--start row-->
              <div class="row form-row">
                <label class="form-label"
                  >Status<span class="mandatory">*</span></label
                >
                <Select2
                  v-model="v$.status.$model"
                  :options="StatusList"
                  :settings="{ placeholder: 'Choose' }"
                  :class="{ isInvalid: v$.status.$error }"
                />
                <p
                  class="error-mgs"
                  v-for="(error, index) in v$.status.$errors"
                  :key="index"
                >
                  <i class="fas fa-exclamation-triangle"></i>
                  {{ error.$message }}
                </p>
              </div>
              <!--end row-->

              <!--start row -->
              <div class="row form-row">
                <div class="col-md-12">
                  <label class="form-label"
                    >Choose File<span class="mandatory">*</span></label
                  >
                  <single-file-uploader
                    field_name="create_project"
                  ></single-file-uploader>
                </div>
              </div>
              <!--end row -->
            </div>

            <div class="col-md-4 offset-md-2">
              <label class="form-label">Description</label>
              <TheCKEditor @sendContent="setDescription" />
            </div>
          </div>
          <!--end row -->
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
import SingleFileUploader from "../../../core/shared/file-uploader/SingleFileUploader.vue";
import TheCKEditor from "../../../core/shared/TheCKEditor.vue";
import toastr from "toastr";
import TheSpinner from "../../../shared/spinners/TheSpinner.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

//use for saving preloader
let savingSpinner = ref(false);

const router = useRouter();

//create store
const store = useStore();

const formState = reactive({
  name: "",
  category_id: "",
  team_id: "",
  lead_id: "",
  start_date: "",
  end_date: "",
  extended_date: "",
  client_id: "",
  tags: "",
  description: "",
  status: "",
  token: store.state.currentUser.token,
});

const rules: any = {
  name: { required },
  category_id: { required },
  team_id: { required },
  start_date: { required },
  end_date: { required },
  extended_date: { required },
  tags: { required },
  client_id: { required },
  lead_id: { required },
  status: { required },
};

const emit = defineEmits(["select"]);

//set CKEditor Data
const setDescription = (value: any) => {
  formState.description = value;
};

//Status List for Status Select
const StatusList = reactive([
  { id: 0, text: "In Progress" },
  { id: 1, text: "Completed" },
]);

//Category list for Category Select
const categoryList = ref([]);

//team list for Team Select
const teamList = ref([]);

//lead list for lead Select
const leadList = ref([]);

//client list for client Select
const clientList = ref([]);

//team list for Team Select
const tagList = ref([]);

//Load Data form computed onMounted
onMounted(() => {
  getTeams();
  getLeadList();
  getClientList();
  getTagList();
  getCategoryList();
});

//get Selectable TeamList
async function getTeams() {
  await Axios.get("teams-selectable")
    .then((response) => {
      if (response.data.code === 200) {
        teamList.value = response.data.data;
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
  await Axios.get("teamlead-selectable")
    .then((response) => {
      if (response.data.code === 200) {
        leadList.value = response.data.data;
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

//get Selectable leadList
async function getClientList() {
  await Axios.get("clients-selectable")
    .then((response) => {
      if (response.data.code === 200) {
        clientList.value = response.data.data;
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

//get Selectable TagList
async function getTagList() {
  await Axios.get("tags-selectable")
    .then((response) => {
      if (response.data.code === 200) {
        tagList.value = response.data.data;
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}

//get Selectable CategoryList
async function getCategoryList() {
  await Axios.get("categories-selectable")
    .then((response) => {
      if (response.data.code === 200) {
        categoryList.value = response.data.data;
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}
const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();

  if (!v$.value.$error) {
    savingSpinner.value = true;
    await Axios.post("/projects/projects", formState)
      .then((response) => {
        if (response.data.code === 200) {
          resetForm();
          //Stop Saving Spinner
          savingSpinner.value = false;
          swal("Success Job!", "Created record successfully!", "success");
          router.push("/pmm/projects");
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
  formState.category_id = "";
  formState.team_id = "";
  formState.lead_id = "";
  formState.start_date = "";
  formState.end_date = "";
  formState.extended_date = "";
  formState.client_id = "";
  formState.tags = "";
  formState.description = "";
  formState.status = "";
  v$.value.$reset();
}
</script>

<style scoped></style>
