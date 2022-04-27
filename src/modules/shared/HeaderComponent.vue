<template>
  <!--start nav section-->
  <nav class="navbar navbar-expand-lg nav-bg main-nav">
    <div class="container-fluid">
      <router-link :to="'/core/dashboard'" class="navbar-brand"
        >ImpacTech ERP</router-link
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
          <li class="nav-item">
            <a class="nav-link" href="/pmm/projects"> Projects </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> CRM</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> Support </a>
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
                        <a class="auth_option_item" href="#"
                          ><i class="fas fa-user-plus"></i> Add another
                          account</a
                        >
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
                        <router-link
                          class="auth_option_item"
                          to="/core/profile-update"
                        >
                          <i class="fas fa-edit"></i> Update Profile
                        </router-link>
                      </li>
                      <li class="auth_option">
                        <a class="auth_option_item" href="#"
                          ><i class="fas fa-user"></i> Profile Information</a
                        >
                      </li>
                    </ul>
                    <ul class="auth_card pt_15">
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
  <!--end nav section-->
</template>
<script setup lang="ts">
import { computed } from "vue";
import Axios from "@/http-common";
import { useRouter } from "vue-router";
import toastr from "toastr";
import { useCookies } from "vue3-cookies";
import { useStore } from "vuex";

const router = useRouter();

const store = useStore();
const { cookies } = useCookies();

const userInfo = computed(() => {
  return store.state.currentUser.userPemissions;
});

console.log(store.state.currentUser.token);
// sign out code

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

<style scoped></style>
