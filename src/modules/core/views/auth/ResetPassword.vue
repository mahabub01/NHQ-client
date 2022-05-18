<template>
  <div class="box">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div
            class="form_section d-flex flex-column justify-content-center align-items-center"
          >
            <div class="card-signup bg-transparent">
              <the-spinner
                :is-authenticating="is_authenticating"
                :is-authenticated="is_authenticated"
              ></the-spinner>
              <!--start alert section-->
              <div
                v-if="isShowAlert"
                class="alert alert-danger d-flex align-items-center"
                role="alert"
              >
                <div>
                  <i class="fas fa-exclamation-triangle"></i> {{ alertMessage }}
                </div>
              </div>
              <!--end alert section-->
            </div>

            <div class="logo">
              <img
                class="img-fluid w-100 mb-3 logo"
                src="@/assets/images/logo.png"
                alt="Logo"
              />
            </div>
            <div class="card card-signup">
              <div class="card-body mb-2">
                <form @submit.prevent="handleSubmit" class="form-page">
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      :class="{ isInvalid: v$.email.$error }"
                      v-model="v$.email.$model"
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

                  <div class="d-grid gap-2">
                    <button class="btn btn-design" type="submit">
                      Send Reset Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="content_section">
            <h1>
              Start your free trial. No credit card required, no softwer to
              install
            </h1>
            <p>With your trial, you get.</p>
            <ul>
              <li>
                <i class="fas fa-check text-success"></i>Preloaded data or
                upload your own
              </li>
              <li>
                <i class="fas fa-check text-success"></i>Preconfigerd dashboard
                prossec and reports
              </li>
              <li>
                <i class="fas fa-check text-success"></i>Preloaded data or
                upload your own
              </li>
              <li>
                <i class="fas fa-check text-success"></i>Preloaded data or
                upload your own
              </li>
            </ul>
            <button type="submit" class="btn btn-primary mt-3 text-uppercase">
              Start My Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import axios from "axios";
import TheSpinner from "@/modules/shared/spinners/TheSpinner.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import Axios from "@/http-common";
import toastr from "toastr";
import swal from "sweetalert";

const isShowAlert = ref(false);
const alertMessage = ref("");
const is_authenticating = ref(false);
const is_authenticated = ref(false);
const router = useRouter();

const store = useStore();

const { cookies } = useCookies();

const formState = reactive({
  email: "",
});

const rules = {
  email: { required },
};

const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  v$.value.$validate();
  v$.value.$touch();
  if (!v$.value.$error) {
    isShowAlert.value = false;

    await Axios.post("reset-password", formState)
      .then((response) => {
        if (response.data.code == 200) {
          alert(response.data.message);

          isShowAlert.value = true;
          alertMessage.value = response.data.message;

          //   resetForm();
          swal("Success Job!", "Your modules created successfully!", "success");
        } else {
          isShowAlert.value = false;
          toastr.error(response.data.message);
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}

async function getAllPermissions(userId: number) {
  await Axios.get("/get-user-all-permissions/" + userId).then((response) => {
    store.dispatch("currentUser/assignAllPermission", response.data);
  });
}
</script>

<style scoped>
.bg-transparent {
  background-color: transparent;
}
</style>
