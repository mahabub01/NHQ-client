<template>
  <div class="container-fluid">
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/pmm/projects"
              >Project <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="#">Create</router-link>
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
                v-model="v$.lead_id.$model"
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
                type="text"
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
                type="text"
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
              <label class="form-label">Description</label>
              <textarea
                placeholder="Discription here"
                v-model.lazy="formState.description"
              ></textarea>
            </div>
            <div class="col-md-4 offset-md-2">
              <label class="form-label"
                >Extended Date<span class="mandatory">*</span></label
              >
              <input
                type="text"
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
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
          </div>
          <!--end row -->

          <!--start row -->
          <div class="row">
            <div class="col-md-4 offset-md-1">
              <div class="col-md-12">
                <label class="form-label">File Name</label>
                <input class="form-input" type="file" />
              </div>
            </div>
            <div class="col-md-4 offset-md-2"></div>
          </div>
          <!--end row -->
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import TheButton from "@/modules/shared/TheButton.vue";
import Select2 from "vue3-select2-component";

let buttonLoading = ref(false);
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
};

const emit = defineEmits(["select"]);

//Category list for Category Select
const categoryList = reactive([
  { id: 1, text: "Category 1" },
  { id: 2, text: "Category 2" },
  { id: 3, text: "Category 3" },
]);

//team list for Team Select
const teamList = reactive(["Team 1", "Team 2", "Team 3"]);

//lead list for lead Select
const leadList = reactive(["Lead 1", "Lead 2", "Lead 3"]);

//client list for client Select
const clientList = reactive(["Client 1", "Client 2", "Client 3"]);

//team list for Team Select
const tagList = reactive(["Tag 1", "Tag 2", "Tag 3"]);

const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  console.log(formState);
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    buttonLoading.value = true;
    console.log(formState);
    // await Axios.post("projects/categories", state)
    //   .then((response) => {
    //     swal("Success Job!", "Your category created successfully!", "success");
    //     reset(); //reset all property
    //     buttonLoading.value = false;
    //   })
    //   .catch((error) => {
    //     console.log("problem Here" + error);
    //   });
  }
}

//reset all property
function reset() {
  // state.title = "";
  // state.description = "";
  // v$.value.$reset();
}
</script>

<style scoped></style>
