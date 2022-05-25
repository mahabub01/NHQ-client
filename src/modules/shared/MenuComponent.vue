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
          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/pmm/sub-milestones">
              Submilestone
            </router-link>
          </li>
        </ul>

        <!--start for Project Manager role-->
        <ul class="navbar-nav me-auto mb-lg-0" v-if="userInfo.role_id == 8">
          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/pmm/projects">
              Projects list
            </router-link>
          </li>

          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/pmm/milestones">
              Milestone list
            </router-link>
          </li>

          <!-- Sub Milestone ar poriborte hobe Task  -->
          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/pmm/sub-milestones">
              Sub Milestone
            </router-link>
          </li>

          <!-- SubTask ar poriborte hobe Task  -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#"> Task </a>
          </li>

          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/pmm/employees">
              Employee
            </router-link>
          </li>

          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/pmm/clients">
              Client
            </router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#"> Report </a>
          </li>
        </ul>
        <!--end for Project Manager role-->

        <!-- start for Admin Role -->
        <ul class="navbar-nav me-auto mb-lg-0" v-if="userInfo.role_id == 10">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Projects <i class="fas fa-chevron-down"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/pmm/categories"
                  ><i class="fas fa-table"></i> Project Category
                  list</router-link
                >
              </li>

              <li>
                <router-link class="dropdown-item" to="/pmm/pocs-categories"
                  ><i class="fas fa-table"></i> POC Category list</router-link
                >
              </li>

              <li>
                <router-link class="dropdown-item" to="/pmm/boq-categories"
                  ><i class="fas fa-table"></i> BOQ Category list</router-link
                >
              </li>

              <li>
                <router-link class="dropdown-item" to="/pmm/boq-category-items"
                  ><i class="fas fa-table"></i> BOQ Category Item
                  list</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Client <i class="fas fa-chevron-down"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/pmm/teams"
                  ><i class="fas fa-table"></i> Team list</router-link
                >
              </li>

              <li>
                <router-link class="dropdown-item" to="/pmm/tags"
                  ><i class="fas fa-table"></i> Tags list</router-link
                >
              </li>

              <li>
                <router-link class="dropdown-item" to="/pmm/departments"
                  ><i class="fas fa-table"></i> Department list</router-link
                >
              </li>

              <li>
                <router-link class="dropdown-item" to="/pmm/designations"
                  ><i class="fas fa-table"></i> Designation list</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/pmm/task-categories"
                  ><i class="fas fa-table"></i> Task Category list</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/pmm/versions"
                  ><i class="fas fa-table"></i> Version list</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/pmm/priorities"
                  ><i class="fas fa-table"></i> Priority list</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Milestone <i class="fas fa-chevron-down"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link
                  class="dropdown-item"
                  to="/pmm/milestones-categories"
                  ><i class="fas fa-table"></i> Milestone Category
                  list</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/pmm/employees">
              Employee
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#"> Report </a>
          </li>
        </ul>
        <!-- End for Admin Role -->

        <!--start for Employee role-->
        <ul class="navbar-nav me-auto mb-lg-0" v-if="userInfo.role_id == 9">
          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/pmm/milestones">
              Milestone
            </router-link>
          </li>

          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/pmm/tasks">
              Sub Milestone
            </router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#"> Task </a>
          </li>
        </ul>
        <!--start for Employee role-->
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref, onMounted } from "vue";
import { useCookies } from "vue3-cookies";
import Axios from "@/http-common";
import { useRouter } from "vue-router";
import toastr from "toastr";

const router = useRouter();
const store = useStore();
const { cookies } = useCookies();

const userInfo = computed(() => {
  return store.state.currentUser.userPemissions;
});

const userComponents = ref([] as any[]);
function loadComponent(module_index: any) {
  userComponents.value = userInfo.value.modules[module_index].components;
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

<style scoped></style>
