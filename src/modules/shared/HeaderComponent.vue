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

        <ul class="navbar-nav d-flex icon-menu-bar">
          <li class="nav-item dropdown nav-more-btn">
            <a
              style="
                padding-left: 10px !important;
                padding-right: 10px !important;
              "
              href="#"
              class="nav-link dropdown-toggle nav-more-btn-toggle"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              <span class="profile-icon-design">
                <img
                  src="@/assets/images/ellipse_1.png"
                  width="30"
                  class="user-img rounded-circle mr-3"
                />
              </span>
            </a>
            <ul class="dropdown-menu dropdown-menu-lg-end" style="width: 300px">
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
          </li>

          <li class="nav-item dropdown nav-more-btn">
            <a
              style="
                padding-left: 10px !important;
                padding-right: 10px !important;
                padding-top: 18px !important;
              "
              href="#"
              class="nav-link dropdown-toggle nav-more-btn-toggle"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              <span><i class="fas fa-grip-horizontal font-size-22"></i></span>
            </a>
            <ul class="dropdown-menu dropdown-menu-lg-end">
              <!-- <li>
                <router-link to="/modules" class="dropdown-item"
                  ><i class="fas fa-arrow-circle-right"></i>
                  Modules</router-link
                >
              </li>
              <li>
                <router-link to="/components" class="dropdown-item"
                  ><i class="fas fa-arrow-circle-right"></i>
                  Components</router-link
                >
              </li>
              <li>
                <router-link to="/permissions" class="dropdown-item"
                  ><i class="fas fa-arrow-circle-right"></i>
                  Permissions</router-link
                >
              </li>
              <li>
                <router-link to="/users" class="dropdown-item"
                  ><i class="fas fa-arrow-circle-right"></i> Users</router-link
                >
              </li>
              <li>
                <router-link to="/logout" class="dropdown-item"
                  ><i class="fas fa-arrow-circle-right"></i> Logout</router-link
                >
              </li> -->
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!--end nav section-->
</template>
<script setup lang="ts"></script>

<style scoped></style>
