<template>
  <div>
    <div
      class="modal fade modal-bg"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
      :class="{
        show: stateEditModal,
        modalDisplay: stateEditModal,
      }"
    >
      <div class="modal-dialog modal-dialog-centered" :class="`${modalsize}`">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title form-modal-title">
              <slot name="editheader"></slot>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click.prevent="editModalClose()"
            ></button>
          </div>
          <div class="modal-body"><slot name="editbody"></slot></div>
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

const stateEditModal = computed(() => store.state.modalModule.editModal);

const props = defineProps({
  modalsize: {
    type: String,
    default: "modal-md",
  },
});

function editModalClose() {
  store.commit("modalModule/CHNAGE_EDIT_MODAL", false);
  store.commit("modalModule/LOAD_CKEDITOR_MODAL", false);
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
