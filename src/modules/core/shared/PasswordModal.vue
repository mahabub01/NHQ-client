<template>
  <div>
    <div
      class="modal fade modal-bg"
      id="passwordModal"
      tabindex="-1"
      aria-labelledby="passwordModalLabel"
      aria-hidden="true"
      :class="{
        show: statePasswordModal,
        modalDisplay: statePasswordModal,
      }"
    >
      <div class="modal-dialog modal-dialog-centered" :class="`${modalsize}`">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title form-modal-title">
              <slot name="passwordheader"></slot>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click.prevent="passwordModalClose()"
            ></button>
          </div>
          <div class="modal-body"><slot name="passwordbody"></slot></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useStore } from "vuex";

//use store
const store = useStore();

const statePasswordModal = computed(
  () => store.state.modalModule.passwordModal
);

const props = defineProps({
  modalsize: {
    type: String,
    default: "modal-md",
  },
});

function passwordModalClose() {
  store.commit("modalModule/CHNAGE_PASSWORD_MODAL", false);
}
</script>

<style scoped>
.modalDisplay {
  display: block;
}
.modal-bg {
  background: #00000066;
}
</style>
