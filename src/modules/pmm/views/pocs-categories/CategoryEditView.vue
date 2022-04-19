<template>
  <div>
    <div class="form-container form-page">
      <h4 class="form-page-title">Update Categories</h4>
      <form @submit.prevent="categoryUpdate">
        <div class="row">
          <div class="col-md-4">
            <label class="form-label"
              >Title<span class="mandatory">*</span></label
            >
            <input
              type="text"
              class="form-page-input"
              :class="{ isInvalid: v$.title.$error }"
              placeholder="Title here"
              v-model.lazy="v$.title.$model"
            />
            <p
              class="error-mgs"
              v-for="(error, index) in v$.title.$errors"
              :key="index"
            >
              <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="row form-row">
          <div class="col-md-4">
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
            <the-button :buttonLoading="buttonLoading">
              <i class="far fa-save"></i> Update
            </the-button>
          </div>
        </div>
      </form>
    </div>
    <!--start data loading -->
    <data-loading-spinner
      :loading-spinner="loadingSpinner"
    ></data-loading-spinner>
    <!--end data loading -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Axios from "@/http-common";
import swal from "sweetalert";
import TheButton from "@/modules/shared/TheButton.vue";
import { useRoute, useRouter } from "vue-router";
import DataLoadingSpinner from "@/modules/shared/DataLoadingSpinner.vue";

const route = useRoute();
const router = useRouter();
let singleData = "";

//Button Loading
let buttonLoading = ref(false);

//Data Loading Spinner
let loadingSpinner = ref(false);

const state = reactive({
  title: "",
  description: "",
});

const rules: any = {
  title: { required },
};

const v$ = useVuelidate(rules, state);

//Updated Data
async function categoryUpdate() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    buttonLoading.value = true;
    await Axios.put("pocs/categories/" + route.params.id, state)
      .then((response) => {
        swal("Success Job!", "Your category update successfully!", "success");
        reset(); //reset all property
        buttonLoading.value = false;
        router.push("/pmm/categories");
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}

onMounted(async () => {
  loadingSpinner.value = true;
  await Axios.get("/pocs/categories/" + route.params.id).then((response) => {
    singleData = response.data.data;
    if (singleData != "") {
      state.title = singleData.title;
      state.description = singleData.description;
    }
    loadingSpinner.value = false;
  });
});

//reset all property
function reset() {
  state.title = "";
  state.description = "";
  v$.value.$reset();
}
</script>

<style scoped></style>
