<template>
  <div class="container-fluid">
    <form @submit.prevent="handleSubmit">
      <div class="form-bootcamp">
        <div class="row">
          <div class="col-md-4">
            <router-link to="/core/profile-details"
              >Profile <i class="fas fa-chevron-right"></i
            ></router-link>
            <router-link to="#">Change Password</router-link>
          </div>
          <div class="col-md-8">
            <div class="float-right">
              <button type="submit" class="form-button margin-right-10">
                <i class="far fa-save"></i> Submit
              </button>
              <router-link
                class="form-button-danger"
                style="color: white"
                to="/core/profile-details"
                ><i class="far fa-times-circle"></i> Discard
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="form-design-body m-auto">
        <div class="container">
          <h4 class="form-page-title">Change Password</h4>
          <!--start row -->
          <div class="row form-row">
            <div class="col-md-4 m-auto">
              <label class="form-label"
                >Old Password<span class="mandatory">*</span></label
              >
              <input
                type="password"
                class="form-input"
                :class="{ isInvalid: v$.old_password.$error }"
                v-model.lazy="v$.old_password.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.old_password.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
          </div>
          <div class="row form-row">
            <div class="col-md-4 m-auto">
              <label class="form-label"
                >New Password<span class="mandatory">*</span></label
              >
              <input
                type="password"
                class="form-input"
                :class="{ isInvalid: v$.new_password.$error }"
                v-model.lazy="v$.new_password.$model"
              />
              <p
                class="error-mgs"
                v-for="(error, index) in v$.new_password.$errors"
                :key="index"
              >
                <i class="fas fa-exclamation-triangle"></i> {{ error.$message }}
              </p>
            </div>
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
import toastr from "toastr";

let buttonLoading = ref(false);
const formState = reactive({
  old_password: "",
  new_password: "",
});

const rules: any = {
  old_password: { required },
  new_password: { required },
};

// const emit = defineEmits(["select"]);

const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();

  if (!v$.value.$error) {
    buttonLoading.value = true;
    await Axios.post("password-change", formState)
      .then((response) => {
        if (response.data.code == 200) {
          reset();
          buttonLoading.value = false;
          swal(
            "Success Job!",
            "Your password updated successfully!",
            "success"
          );
        } else {
          buttonLoading.value = false;
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}

//reset all property
function reset() {
  formState.old_password = "";
  formState.new_password = "";

  v$.value.$reset();
}
</script>

<style scoped></style>
