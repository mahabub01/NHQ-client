<template>
  <div>
    <div class="form-container form-page">
      <h4 class="form-page-title">Create Project</h4>
      <form @submit.prevent="handleSubmit">
        <!--start row -->
        <div class="row">
          <div class="col-md-4">
            <label class="form-label"
              >Project Name<span class="mandatory">*</span></label
            >
            <input
              type="text"
              class="form-page-input"
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
          <div class="col-md-4">
            <label class="form-label"
              >Category Name<span class="mandatory">*</span></label
            >
            <select
              class="form-page-input"
              :class="{ isInvalid: v$.category_id.$error }"
              v-model.lazy="v$.category_id.$model"
            >
              <option value="">Choose</option>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
            </select>
            <p
              class="error-mgs"
              v-for="(error, index) in v$.category_id.$errors"
              :key="index"
            >
              <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
            </p>
          </div>
          <!--end Category Field -->
          <!--start Team Field -->
          <div class="col-md-4">
            <label class="form-label"
              >Project Team<span class="mandatory">*</span></label
            >
            <select
              class="form-page-input"
              :class="{ isInvalid: v$.team_id.$error }"
              v-model.lazy="v$.team_id.$model"
            >
              <option value="">Choose</option>
              <option value="1">Team 1</option>
              <option value="2">Team 2</option>
              <option value="3">Team 3</option>
            </select>
            <p
              class="error-mgs"
              v-for="(error, index) in v$.team_id.$errors"
              :key="index"
            >
              <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
            </p>
          </div>
          <!--end Team Field -->
        </div>
        <!--end row -->

        <!--start row -->
        <div class="row form-row">
          <div class="col-md-4">
            <label class="form-label"
              >Start Date<span class="mandatory">*</span></label
            >
            <input
              type="text"
              class="form-page-input"
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

          <!--start End Date Field -->
          <div class="col-md-4">
            <label class="form-label"
              >End Date<span class="mandatory">*</span></label
            >
            <input
              type="text"
              class="form-page-input"
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
          <!--end End Date Field -->
          <!--start Team Field -->
          <div class="col-md-4">
            <label class="form-label"
              >Extended Date<span class="mandatory">*</span></label
            >
            <input
              type="text"
              class="form-page-input"
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
          <!--end Team Field -->
        </div>
        <!--end row -->

        <!--start row -->
        <div class="row">
          <div class="col-md-4">
            <label class="form-label"
              >Project Lead<span class="mandatory">*</span></label
            >
            <select
              class="form-page-input"
              :class="{ isInvalid: v$.lead_id.$error }"
              v-model.lazy="v$.lead_id.$model"
            >
              <option value="">Choose</option>
              <option value="1">Lead 1</option>
              <option value="2">Lead 2</option>
              <option value="3">Lead 3</option>
            </select>
            <p
              class="error-mgs"
              v-for="(error, index) in v$.lead_id.$errors"
              :key="index"
            >
              <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
            </p>
          </div>

          <!--start Category Field -->
          <div class="col-md-4">
            <label class="form-label"
              >Add Client<span class="mandatory">*</span></label
            >
            <select
              class="form-page-input"
              :class="{ isInvalid: v$.client_id.$error }"
              v-model.lazy="v$.client_id.$model"
            >
              <option value="">Choose</option>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
            </select>
            <p
              class="error-mgs"
              v-for="(error, index) in v$.client_id.$errors"
              :key="index"
            >
              <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
            </p>
          </div>
          <!--end Category Field -->
          <!--start Team Field -->
          <div class="col-md-4">
            <label class="form-label"
              >Tags<span class="mandatory">*</span></label
            >
            <select
              class="form-page-input"
              :class="{ isInvalid: v$.tags.$error }"
              v-model.lazy="v$.tags.$model"
            >
              <option value="">Choose</option>
              <option value="1">Tag 1</option>
              <option value="2">Tag 2</option>
              <option value="3">Tag 3</option>
            </select>
            <p
              class="error-mgs"
              v-for="(error, index) in v$.tags.$errors"
              :key="index"
            >
              <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
            </p>
          </div>
          <!--end Team Field -->
        </div>
        <!--end row -->

        <div class="row form-row">
          <div class="col-md-12">
            <label class="form-label">Description</label>
            <textarea
              class="form-page-textarea"
              placeholder="Discription here"
              v-model.lazy="state.description"
            ></textarea>
          </div>
        </div>

        <div class="row form-row">
          <div class="col-md-12">
            <label class="form-label">File Name</label>
            <input type="file" />
          </div>
          <div class="col-md-4">
            <Select2 v-model="state.client_id" :options="myOptions" />
          </div>
          <div class="col-md-4">
            <Select2
              v-model="state.client_id"
              :options="myOptions"
              :settings="{ multiple: true }"
            />
          </div>
        </div>

        <div class="row form-row">
          <div class="col-md-12">
            <the-button :buttonLoading="buttonLoading">
              <i class="far fa-save"></i> Submit
            </the-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import TheButton from "@/modules/shared/TheButton.vue";
import Select2 from "vue3-select2-component";

let buttonLoading = ref(false);
const state = reactive({
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

const categoryList = reactive(["Cateogy 1", "Cateogy 2", "Cateogy 3"]);

const v$ = useVuelidate(rules, state);

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    buttonLoading.value = true;
    await Axios.post("projects/categories", state)
      .then((response) => {
        swal("Success Job!", "Your category created successfully!", "success");
        reset(); //reset all property
        buttonLoading.value = false;
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
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
