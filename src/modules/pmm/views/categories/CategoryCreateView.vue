<template>
  <div>
    <div class="form-container form-page">
      <h4 class="form-page-title">Project Categories</h4>
      <form @submit.prevent="categorySubmit">
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

let buttonLoading = ref(false);
const state = reactive({
  title: "",
  description: "",
});

const rules: any = {
  title: { required },
};

const v$ = useVuelidate(rules, state);

async function categorySubmit() {
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
  state.title = "";
  state.description = "";
  v$.value.$reset();
}
</script>

<style scoped></style>
