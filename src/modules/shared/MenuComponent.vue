<template>
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
            <router-link class="nav-link" to="/pmm/tasks">
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
                <router-link class="dropdown-item" to="/pmm/clients"
                  ><i class="fas fa-table"></i> Client list</router-link
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
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Authentication <i class="fas fa-chevron-down"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="#"
                  ><i class="fas fa-table"></i> Modules List</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="#"
                  ><i class="fas fa-table"></i> Components List</router-link
                >
              </li>

              <li>
                <router-link class="dropdown-item" to="#"
                  ><i class="fas fa-table"></i> Pemissions List</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="#"
                  ><i class="fas fa-table"></i> Roles List</router-link
                >
              </li>

              <li>
                <router-link class="dropdown-item" to="#"
                  ><i class="fas fa-table"></i> Users List</router-link
                >
              </li>
            </ul>
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
import { computed } from "vue";

const store = useStore();

const userInfo = computed(() => {
  return store.state.currentUser.userPemissions;
});
</script>

<style scoped></style>
