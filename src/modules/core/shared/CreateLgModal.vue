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
        show: stateCreateModal,
        modalDisplay: stateCreateModal,
      }"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
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
              @click.prevent="createModalClose()"
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

const stateCreateModal = computed(() => store.state.modalModule.creatModal);

function createModalClose() {
  store.commit("modalModule/CHNAGE_CREATE_MODAL", false);
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
