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
        <ul class="navbar-nav me-auto mb-lg-0">
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
                <a class="dropdown-item" href="/pmm/projects"
                  ><i class="fas fa-table"></i> Project list</a
                >
              </li>

              <li>
                <router-link class="dropdown-item" to="/pmm/categories"
                  ><i class="fas fa-table"></i> Category list</router-link
                >
              </li>

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
            </ul>
          </li>

          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/pmm/milestones">
              Milestone
            </router-link>
          </li>

          <li class="nav-item dropdown">
            <router-link class="nav-link" to="/pmm/tasks"> Task </router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#"> SubTask </a>
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
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
