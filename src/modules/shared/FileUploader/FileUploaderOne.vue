<template>
  <div>
    <input
      type="file"
      ref="fileUploader"
      @change="fileUploaded"
      class="form-page-input"
    />
    <div style="margin-top: 20px">
      <div v-if="isUploading" class="progress">
        <div
          ref="single_upload_pro"
          class="progress-bar progress-bar-striped bg-info"
          :class="{ bgSuccess: isApplyBgSuccess }"
          role="progressbar"
          :style="{ width: currentValue + '%' }"
          aria-valuenow="{{currentValue.toFixed(2)}}"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ currentValue.toFixed(0) }}%
        </div>
      </div>
      <button
        v-if="isDoneUploading"
        type="button"
        class="btn btn-link"
        style="color: red; font-size: 13px"
        @click.prevent="removeFile"
      >
        <i class="far fa-times-circle"></i> Remove
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUploader } from "@/composables/file-uploader";
import { defineProps, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  field_name: String,
});

const store = useStore();
const fileUploader = ref();
const {
  isUploading,
  currentValue,
  isApplyBgSuccess,
  fileuploader,
  isDoneUploading,
  removeUploadedFile,
} = useUploader(props.field_name, "demo-attachment");

function fileUploaded() {
  fileuploader(fileUploader.value.files[0]);
}

function removeFile() {
  removeUploadedFile("remove-demo-attachment");
  fileUploader.value = null;
}
</script>

<style scoped>
.bgSuccess {
  background-color: #198754 !important;
}
</style>
