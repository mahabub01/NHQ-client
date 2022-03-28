<template>
  <div>
    <!--start authenticating -->
    <div
      class="alert alert-info d-flex align-items-center full-width"
      role="alert"
      v-if="isAuthenticating"
    >
      <div>
        <i class="fas fa-check-double"></i> Authenticating
        <span class="loading"></span>
      </div>
    </div>
    <!--end authenticating -->

    <!--start authenticated -->
    <div
      class="alert alert-success d-flex align-items-center full-width"
      role="alert"
      v-if="isAuthenticated"
    >
      <div class="text-success-color">
        <i class="fas fa-check-circle"></i> Authenticated
      </div>
    </div>
    <!--end authenticated -->

    <!--start deleting -->
    <div v-if="isdeleting" class="data-deleting-container">
      <div class="data-deleting-indicator">
        <span>Deleting</span> <span class="loading"></span>
      </div>
    </div>
    <!--end deleting -->

    <!--start deleting -->
    <div v-if="isLoading" class="data-deleting-container">
      <div class="data-deleting-indicator">
        <span>Loading</span> <span class="loading"></span>
      </div>
    </div>
    <!--end deleting -->

    <!--start deleting -->
    <div v-if="isUpdating" class="data-deleting-container">
      <div class="data-deleting-indicator">
        <span>Updating</span> <span class="loading"></span>
      </div>
    </div>
    <!--end deleting -->

    <!--start saving -->
    <div v-if="isSaving" class="data-deleting-container">
      <div class="data-deleting-indicator">
        <span>Saving</span> <span class="loading"></span>
      </div>
    </div>
    <!--end saving -->
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  isAuthenticating: {
    type: Boolean,
    default: false,
  },
  isAuthenticated: {
    type: Boolean,
    default: false,
  },

  isdeleting: {
    type: Boolean,
    default: false,
  },

  isLoading: {
    type: Boolean,
    default: false,
  },

  isUpdating: {
    type: Boolean,
    default: false,
  },

  isSaving: {
    type: Boolean,
    default: false,
  },
});

// const isAuthenticating = ref(props.isAuthenticating);
//const isAuthenticated = ref(props.isAuthenticated);
</script>

<style scoped>
.full-width {
  width: 100%;
}
.text-success-color {
  color: green;
}

.data-deleting-indicator {
  background-color: rgba(255, 255, 255, 0.466);
  color: black;
  border: 1px solid gray;
  position: fixed;
  top: 50px;
  left: 48%;
  padding: 5px 10px;
  font-weight: 600;
  border-radius: 5px;
}
.data-deleting-container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0);
  top: 0;
}
</style>
