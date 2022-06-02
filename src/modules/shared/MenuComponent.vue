<template>
  <!--start nav section-->
  <nav class="navbar navbar-expand-lg nav-bg main-nav">
    <div class="container-fluid">
      <router-link :to="'/core/dashboard'" class="navbar-brand"
        >NHQ ERP</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li
            v-for="(modulelist, moduleindex) in userInfo.modules"
            :key="modulelist.id"
            class="nav-item"
          >
            <a class="nav-link" href="#" @click="loadComponent(moduleindex)">
              {{ modulelist.title }}
            </a>
          </li>
        </ul>

        <ul class="navbar-nav d-flex header_icon align-item-center">
          <li>
            <div class="dropdown">
              <button
                class="btn dropdown-toggle header_bell_btn text-white"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="far fa-bell"></i>
                <span
                  class="p-1 bg-danger rounded-circle header_bell_btn_allert"
                ></span>
              </button>

              <ul
                class="dropdown-menu dropdown-menu-lg-end"
                style="width: 200px"
              >
                <li>
                  <router-link to="/permissions" class="dropdown-item"
                    ><i class="fas fa-arrow-circle-right"></i>
                    Permissions</router-link
                  >
                </li>
                <li>
                  <router-link to="/users" class="dropdown-item"
                    ><i class="fas fa-arrow-circle-right"></i>
                    Users</router-link
                  >
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div class="dropdown">
              <button
                class="btn dropdown-toggle header_bell_btn text-white"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div class="profile-icons">
                  <img src="@/assets/images/ellipse_1.png" width="48" />
                </div>
              </button>

              <ul
                class="dropdown-menu dropdown-menu-lg-end pt_15 auth_main_card"
                style="width: 300px"
              >
                <li>
                  <div>
                    <ul class="auth_card">
                      <li class="auth_img">
                        <img src="@/assets/images/ellipse_1.png" width="48" />
                        <a href="#" @click="avaterChange"
                          ><i class="fas fa-camera camera"></i
                        ></a>
                      </li>
                      <li class="auth_name">
                        <h3>{{ userInfo.name }}</h3>
                      </li>
                      <li class="auth_email">
                        <p>{{ userInfo.email }}</p>
                      </li>
                    </ul>
                    <ul class="pl_0">
                      <li class="auth_option">
                        <router-link
                          class="auth_option_item"
                          to="/core/profile-details"
                        >
                          <i class="fas fa-user"></i> Profile Information
                        </router-link>
                      </li>
                      <li class="auth_option">
                        <router-link
                          class="auth_option_item"
                          to="/core/profile-update"
                        >
                          <i class="fas fa-edit"></i> Update Profile
                        </router-link>
                      </li>
                      <li class="auth_option">
                        <router-link
                          class="auth_option_item"
                          to="/core/password-change"
                        >
                          <i class="fas fa-key"></i> Change password
                        </router-link>
                      </li>
                      <li class="auth_option">
                        <router-link class="auth_option_item" to="#">
                          <i class="fas fa-cogs"></i> Settings
                        </router-link>
                      </li>
                      <li class="auth_option" v-if="userInfo.flag == 1">
                        <router-link class="auth_option_item" to="#">
                          <i class="fas fa-users"></i> Authentication
                        </router-link>
                        <ul>
                          <li>
                            <router-link
                              class="auth_option_item"
                              to="/core/modules"
                              ><i class="fas fa-table"></i> Modules
                              List</router-link
                            >
                          </li>
                          <li>
                            <router-link
                              class="auth_option_item"
                              to="/core/components"
                              ><i class="fas fa-table"></i> Components
                              List</router-link
                            >
                          </li>

                          <li>
                            <router-link
                              class="auth_option_item"
                              to="/core/permissions"
                              ><i class="fas fa-table"></i> Pemissions
                              List</router-link
                            >
                          </li>
                          <li>
                            <router-link
                              class="auth_option_item"
                              to="/core/roles"
                              ><i class="fas fa-table"></i> Roles
                              List</router-link
                            >
                          </li>

                          <li>
                            <router-link
                              class="auth_option_item"
                              to="/core/users"
                              ><i class="fas fa-table"></i> Users
                              List</router-link
                            >
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul class="auth_card pt_15 mb-2">
                      <li class="auth_email">
                        <button
                          type="button"
                          class="sign_out_btn"
                          @click="signOut"
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div class="profile-info"></div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!--end module list-->
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light component-navbar">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-lg-0">
          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/core/dashboard">
              Dashboard
            </router-link>
          </li>
          <template
            v-for="(viewmodulelist, comindex) in userComponents"
            :key="comindex"
          >
            <li class="nav-item dropdown" v-if="viewmodulelist.is_dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ viewmodulelist.professional_name }}
                <i class="fas fa-chevron-down"></i>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li
                  v-for="(
                    subpermission, subindex
                  ) in viewmodulelist.permissions"
                  :key="subindex"
                >
                  <router-link
                    v-if="subpermission.is_view_with_component"
                    class="dropdown-item"
                    :to="`${subpermission.url}`"
                    ><i class="fas fa-table"></i>
                    {{ subpermission.professional_name }}</router-link
                  >
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown" v-else>
              <router-link class="nav-link" :to="`${viewmodulelist.action}`">
                {{ viewmodulelist.professional_name }}
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </div>

  <!--start Edit Modal -->
  <AvatarModal :modalsize="modalSize" v-if="avatarModalState" class="z-index">
    <template v-slot:avatarheader
      ><i class="fas fa-plus-square"></i> Edit Avatar
    </template>
    <template v-slot:avatarbody>
      <form @submit.prevent="handleSubmit" class="form-page">
        <div class="row">
          <div class="col-md-12">
            <label class="form-label">Avatar</label>

            <single-image-uploader-two
              label="Company Logo"
              field_name="avatar"
            ></single-image-uploader-two>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click.prevent="
              store.commit('modalModule/CHNAGE_AVATAR_MODAL', false)
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
  </AvatarModal>
  <!--end Edit Modal -->
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref, onMounted, reactive } from "vue";
import { useCookies } from "vue3-cookies";
import Axios from "@/http-common";
import { useRouter } from "vue-router";
import toastr from "toastr";
import swal from "sweetalert";
import AvatarModal from "../core/shared/AvatarModal.vue";
import SingleImageUploaderTwo from "@/modules/core/shared/SingleImageUploaderTwo.vue";
// import { required } from "@vuelidate/validators";
// import { useVuelidate } from "@vuelidate/core";

const router = useRouter();
const store = useStore();
const { cookies } = useCookies();
//Button Loading
let savingSpinner = ref(false);

const modalSize = ref("modal-md");

const userInfo = computed(() => {
  return store.state.currentUser.userPemissions;
});

const avatarModalState = computed(() => {
  return store.state.modalModule.avatarModal;
});

const userComponents = ref([] as any[]);
function loadComponent(module_index: any) {
  userComponents.value = userInfo.value.modules[module_index].components;
}
const formState = reactive({
  avatar: "",
  token: store.state.currentUser.token,
});

// const rules: any = {
//   avatar: { required },
// };

// const v$ = useVuelidate(rules, formState);

//Updated Data
async function handleSubmit() {
  // v$.value.$validate();
  // v$.value.$touch();
  // if (!v$.value.$error) {
  savingSpinner.value = true;
  await Axios.post("/avatar-update", formState)
    .then((response) => {
      savingSpinner.value = false;
      if (response.data.code === 200) {
        store.commit("modalModule/CHNAGE_AVATAR_MODAL", false);

        swal(
          "Success Job!",
          "Your information updated successfully!",
          "success"
        );
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
  // }
}

onMounted(() => {
  loadFirstComponent();
});

async function loadFirstComponent() {
  let user_id = localStorage.getItem("user_id");
  await Axios.get("/get-first-module-component/" + user_id).then((response) => {
    userComponents.value = response.data.data.components;
  });
}

function avaterChange() {
  store.commit("modalModule/CHNAGE_AVATAR_MODAL", true);
}

async function signOut() {
  const signoutState = {
    token: store.state.currentUser.token,
    user_id: userInfo.value.id,
  };

  await Axios.post("/signout", signoutState)
    .then((response) => {
      if (response.data.code == 200) {
        toastr.success("Logout your account successfully.");
        cookies.remove("user-token", "/");
        cookies.remove("user", "/");
        cookies.remove("user-token", "/core");
        cookies.remove("user", "/core");
        cookies.remove("user-token", "/pmm");
        cookies.remove("user", "/pmm");

        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("flag");
        //store.dispatch("currentUser/assignCurrentUser", {});

        // store.dispatch("currentUser/isLogin", {
        //   isLoggedIn: false,
        // });

        router.push("/login");
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log("problem Here" + error);
    });
}
</script>

<style scoped>
.auth_img {
  position: relative;
}
.camera {
  position: absolute;
  top: 0;
  right: -8px;
  color: rgb(118, 179, 155);
}
</style>
