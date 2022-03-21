<template>
  <div>
    <input type="file" ref="fileUploader" @change="fileInserted" />
    <div style="margin-top: 20px">
      <div v-if="isUploading" class="progress">
        <div
          ref="single_upload_pro"
          class="progress-bar progress-bar-striped bg-info"
          :class="{ bgSuccess: isApplyBgSuccess }"
          role="progressbar"
          :style="{ width: currentValue + '%' }"
          aria-valuenow="{{currentValue.toFixed(2)}}"
          aria-valuemin="{{ minValue }}"
          aria-valuemax="{{ maxValue }}"
        >
          {{ currentValue.toFixed(0) }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Axios from "@/Axios";

const minValue = ref(0);
const maxValue = ref(100);
const currentValue = ref(10);
let isUploading = ref(false);
let file: any = null;
const fileUploader = ref();
let single_upload_pro = ref();
let isApplyBgSuccess = ref(false);

function fileInserted() {
  isUploading.value = true;
  file = fileUploader.value.files[0];
  fileUploader.value = null;
  fileUploaded();
  //Set Default Zero
  isApplyBgSuccess.value = false;
  currentValue.value = 0;
}
//fileUploader
//this.file = this.$refs.imageUploader.files[0];
async function fileUploaded() {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("type", "Test type");
  console.log(file);
  await Axios.post("attachment", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: ({ total, loaded }) => {
      currentValue.value = (loaded / total) * 100;
      if (currentValue.value == 100) {
        isApplyBgSuccess.value = true;
      }
    },
  }).then((response) => {
    console.log(response.data);
    //isUploading.value = false;
  });
}
/****
 *         onUploadProgress: ({ total, loaded }) => {
          this.value = (loaded / total).toFixed(2) * 100;
        },
 */
</script>

<style scoped>
.bgSuccess {
  background-color: #198754 !important;
}
</style>
