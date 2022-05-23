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

                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
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

                  <div class="d-grid gap-2">
                    <button class="btn btn-design" type="submit">
                      Sign In
                    </button>
                  </div>
                </form>

                <div class="mb-3 mt-2 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    name="remember"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1"
                    >Remember me</label
                  >
                </div>
                <router-link class="text-decoration-none" to="/reset-password"
                  >Forget Your Password?</router-link
                >
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

const isShowAlert = ref(false);
const alertMessage = ref("");
const is_authenticating = ref(false);
const is_authenticated = ref(false);
const router = useRouter();

const store = useStore();

const { cookies } = useCookies();

const formState = reactive({
  email: "",
  password: "",
});

const rules = {
  email: { required },
  password: { required, minLength: minLength(4), maxLength: maxLength(20) },
};

const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  v$.value.$validate();

  v$.value.$touch();

  if (!v$.value.$error) {
    is_authenticating.value = true;
    isShowAlert.value = false;
    await axios.get(process.env.VUE_APP_DOMAIN_URL + "/sanctum/csrf-cookie");
    await axios
      .post("login", formState, {
        baseURL: process.env.VUE_APP_API_URL,
        headers: {
          "Private-Key": process.env.VUE_APP_PRIVATE_KEY,
        },
      })
      .then((response) => {
        is_authenticating.value = false;
        if (response.data.code == 400) {
          isShowAlert.value = true;
          alertMessage.value = response.data.message;
          return;
        }
        //Remove old Data
        cookies.remove("user-token", "/");
        cookies.remove("user", "/");
        cookies.remove("user-token", "/core");
        cookies.remove("user", "/core");
        cookies.remove("user-token", "/pmm");
        cookies.remove("user", "/pmm");

        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        isShowAlert.value = false;
        is_authenticated.value = true;
        localStorage.setItem("token", response.data.data.access_token);
        localStorage.setItem("user_id", response.data.data.user.id);
        // cookies.set("user-token", response.data.data.access_token, "/");
        // cookies.set("user", response.data.data.user, "/");

        // store.dispatch(
        //   "currentUser/assignCurrentUser",
        //   response.data.data.user
        // );

        // store.dispatch("currentUser/isLogin", {
        //   isLoggedIn: true,
        //   token: response.data.data.access_token,
        // });

        //store.dispatch("currentUser/assignAllPermission", response.data.data);

        //console.log(response.data.data.id);
        //getAllPermissions(response.data.data.user.id);
        //router.go();
        router.push("/core/dashboard");
      })
      .catch((error) => {
        console.log("problem Here" + error);
      });
  }
}

// async function getAllPermissions(userId: number) {
//   await Axios.get("/get-user-all-permissions/" + userId).then((response) => {
//     store.dispatch("currentUser/assignAllPermission", response.data);
//   });
// }
</script>

<style scoped>
.bg-transparent {
  background-color: transparent;
}
</style>
