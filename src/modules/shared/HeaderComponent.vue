<template>
  <!--start nav section-->
  <nav class="navbar navbar-expand-lg nav-bg main-nav">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"> ImpacTech Solutions </a>
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
            <a class="nav-link" href=""> Projects </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href=""> Services </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href=""> CRM </a>
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
                class="dropdown-menu dropdown-menu-lg-end"
                style="width: 300px"
              >
                <li>
                  <div class="profile-icons">
                    <img src="@/assets/images/ellipse_1.png" width="48" />
                  </div>
                  <div class="profile-info">
                    <h3>Mr Admin</h3>
                    <p>Role: Admin</p>
                  </div>
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
<script setup lang="ts"></script>

<style scoped></style>
