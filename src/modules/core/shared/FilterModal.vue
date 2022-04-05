<template>
  <div>
    <div
      class="modal fade modal-bg"
      ref="exampleModal"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      :class="{
        show: stateFilterModal,
        modalDisplay: stateFilterModal,
      }"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title form-modal-title">
              <slot name="header"></slot>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click.prevent="filterModalClose()"
            ></button>
          </div>
          <div class="modal-body"><slot name="body"></slot></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

//use store
const store = useStore();

const stateFilterModal = computed(() => store.state.modalModule.filterModal);

function filterModalClose() {
  store.commit("modalModule/CHNAGE_FILTER_MODAL", false);
}
</script>

<style scoped>
.modalDisplay {
  display: block;
}
.modal-bg {
  background: #00000066;
}
.modal-dialog {
  max-width: 1000px;
  margin: 1.75rem auto;
}
</style>
