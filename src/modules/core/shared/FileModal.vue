<template>
  <div>
    <div
      class="modal fade modal-bg"
      id="fileModal"
      tabindex="-1"
      aria-labelledby="fileModalLabel"
      aria-hidden="true"
      :class="{
        show: stateFileModal,
        modalDisplay: stateFileModal,
      }"
    >
      <div class="modal-dialog modal-dialog-centered" :class="`${modalsize}`">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title form-modal-title">
              <slot name="fileheader"></slot>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click.prevent="fileModalClose()"
            ></button>
          </div>
          <div class="modal-body"><slot name="filebody"></slot></div>
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

const stateFileModal = computed(() => store.state.modalModule.fileModal);

const props = defineProps({
  modalsize: {
    type: String,
    default: "modal-md",
  },
});

function fileModalClose() {
  store.commit("modalModule/CHNAGE_FILE_MODAL", false);
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
