<template>
  <div>
    <button
      ref="submitButton"
      type="submit"
      class="pro-button"
      :disabled="showOrHideDisable == 1"
      :class="{ disableButtonBg: buttonLoading }"
    >
      <slot></slot>
      <span
        v-if="buttonLoading"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    </button>

    <!-- <button v-if="buttonLoading" type="submit" class="pro-button">
      <i class="far fa-save"></i> Submit
    </button> -->
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
const props = defineProps({
  buttonLoading: Boolean,
});

let showOrHideDisable = 1;
if (props.buttonLoading) {
  showOrHideDisable = 1;
} else {
  showOrHideDisable = 0;
}
console.log(props.buttonLoading);
</script>

<style scoped>
.disableButtonBg {
  background-color: #017e85ab !important;
}
</style>
