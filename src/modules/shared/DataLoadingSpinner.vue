<template>
  <!--start Data Loading Indicator -->
  <div v-if="loadingSpinner" class="data-loading-container">
    <div class="data-loading-indicator">
      <span>Loading ...</span>
    </div>
  </div>
  <!--end Data Loading Indicator-->
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  loadingSpinner: Boolean,
});
</script>

<style scoped>
.data-loading-indicator {
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
.data-loading-container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0);
  top: 0;
}
</style>
