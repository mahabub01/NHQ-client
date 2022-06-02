<template>
  <div>
    <div
      class="modal fade modal-bg"
      id="avatarModal"
      tabindex="-1"
      aria-labelledby="avatarModalLabel"
      aria-hidden="true"
      :class="{
        show: stateAvatarModal,
        modalDisplay: stateAvatarModal,
      }"
    >
      <div class="modal-dialog modal-dialog-centered" :class="`${modalsize}`">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title form-modal-title">
              <slot name="avatarheader"></slot>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click.prevent="avatarModalClose()"
            ></button>
          </div>
          <div class="modal-body"><slot name="avatarbody"></slot></div>
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

const stateAvatarModal = computed(() => store.state.modalModule.avatarModal);

const props = defineProps({
  modalsize: {
    type: String,
    default: "modal-md",
  },
});

function avatarModalClose() {
  store.commit("modalModule/CHNAGE_AVATAR_MODAL", false);
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
