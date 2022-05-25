<template>
  <div>
    <label class="form-label" for="v_card_attchment"
      >{{ label }}<span v-if="mandatory" class="mandatory">*</span></label
    >

    <div class="file-uploader-design" :class="{ 'active-dropzone': active }">
      <p>Drop file here to start uploading</p>
      <p>or</p>
      <label for="multiselectOne">Select File</label>
      <input
        ref="files"
        type="file"
        class="form-input"
        id="multiselectOne"
        style="display: none"
        @change="pickerMultiFiles"
        multiple
      />
    </div>
    <div class="">
      <div v-if="progressInfos">
        <div
          class="mtop-10"
          v-for="(progressInfo, index) in progressInfos"
          :key="index"
        >
          <div style="overflow: hidden">
            <span class="upload-file-name">{{ progressInfo.fileName }}</span>
            <span
              class="upload-remove-file"
              @click="RemoveUploadedFile(index, progressInfo.getFileName)"
              ><i class="fas fa-times-circle"></i
            ></span>
          </div>
          <div class="progress">
            <div
              class="progress-bar progress-bar-info"
              role="progressbar"
              :aria-valuenow="progressInfo.percentage"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{ width: progressInfo.percentage + '%' }"
              :class="{ bgSuccess: progressInfo.successdesign }"
            >
              {{ progressInfo.percentage }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useMultiFileUploader } from "@/composables/multifile-uploader";

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

//const fileValidation: any = ["pdf", "xlsx", "csv"];
const fileValidation = {
  extension: ["png", "PNG", "jpeg", "JPEG", "jpg", "JPG"],
  size: 1024, //File size is KB
};

const { progressInfos, files, filePicker, removeFile } = useMultiFileUploader(
  props.field_name,
  "demo-image-attachment",
  fileValidation
);

const label = ref(props.label);

function pickerMultiFiles() {
  filePicker();
}

function RemoveUploadedFile(index: number, fileName: string) {
  removeFile(index, fileName);
}

//for drag and drop option using
const active = ref(false);
</script>

<style scoped>
.bgSuccess {
  background-color: #198754 !important;
}
.upload-remove-file {
  float: right;
  color: red;
  cursor: pointer;
}
.upload-file-name {
  float: left;
  width: 90%;
  word-break: break-all;
}
.mtop-10 {
  margin-top: 10px;
}

.active-dropzone {
  color: #fff;
  border-color: #41b883;
  /* background-color: #41b883; */
}

.upload-remove-file:hover {
  text-decoration: underline;
}
</style>
