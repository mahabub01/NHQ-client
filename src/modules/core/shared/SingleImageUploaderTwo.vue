<template>
  <div>
    <div
      class="file-uploader-design"
      @dragenter.prevent="toggleActive"
      @dragleave.prevent="toggleActive"
      @dragover.prevent
      @drop.prevent="dropHandaler($event)"
      :class="{ 'active-dropzone': active }"
    >
      <p>Drop file here to start uploading</p>
      <p>or</p>
      <label for="single_image_uploader_two">Select File</label>
      <input
        id="single_image_uploader_two"
        type="file"
        ref="fileUploader"
        @change="fileUploaded"
        style="display: none"
      />
    </div>

    <div style="margin-top: 20px">
      <div style="overflow: hidden" v-if="isDoneUploading">
        <span class="upload-file-name">{{ progress_bar_filename }}</span>
        <span class="upload-remove-file" @click.prevent="removeFile"
          ><i class="fas fa-times-circle"></i> Remove
        </span>
      </div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSingleImageUploader } from "@/composables/single-image-uploader";
import { defineProps, ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "File Label",
  },
  field_name: {
    type: String,
    default: "default",
  },
  mandatory: {
    type: Boolean,
    default: false,
  },
});

const fileValidation = {
  extension: ["png", "jpg", "jpeg"],
  size: 2048, //File size is KB
};

const progress_bar_filename = ref("");
const fileUploader = ref();
const {
  isUploading,
  currentValue,
  isApplyBgSuccess,
  fileuploader,
  isDoneUploading,
  removeUploadedFile,
} = useSingleImageUploader(
  props.field_name,
  "demo-image-upload",
  fileValidation
);

function fileUploaded() {
  //fileuploader(fileUploader.value.files[0]);
  fileuploader(fileUploader.value.files[0]);
  progress_bar_filename.value = fileUploader.value.files[0].name;
}

function removeFile() {
  removeUploadedFile("remove-demo-attachment");
  fileUploader.value = null;
}

//for drag and drop option using
const active = ref(false);
const toggleActive = () => {
  active.value = !active.value;
};

function fileUploadedByDrop(file: any) {
  fileuploader(file);
  fileUploader.value = null;
}

const dropHandaler = (event: any) => {
  fileUploadedByDrop(event.dataTransfer.files);
  progress_bar_filename.value = event.dataTransfer.files[0].name;
};
//end for drag and drop option using
</script>

<style scoped>
.bgSuccess {
  background-color: #198754 !important;
}
.active-dropzone {
  color: #fff;
  border-color: #41b883;
  /* background-color: #41b883; */
}

.upload-remove-file {
  float: right;
  color: red;
  cursor: pointer;
}
.upload-remove-file:hover {
  text-decoration: underline;
}
.upload-file-name {
  float: left;
  width: 77%;
  word-break: break-all;
}
.mtop-10 {
  margin-top: 10px;
}
</style>
