<template>
  <div>
    <input
      type="file"
      ref="fileUploader"
      @change="fileInserted"
      class="form-page-input"
      @input="$emit('update:filename', filename)"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import Axios from "@/http-common";
const props = defineProps({
  field_name: String,
});

const currentValue = ref(10);
let isUploading = ref(false);
let file: any = null;
const fileUploader = ref();
let single_upload_pro = ref();
let isApplyBgSuccess = ref(false);
const filename = ref("");

const emit = defineEmits(["update:filename"]);

//file Inserted
function fileInserted() {
  isUploading.value = true;
  file = fileUploader.value.files[0];
  fileUploader.value = null;
  fileUploaded();
  //Set Default Zero
  isApplyBgSuccess.value = false;
  currentValue.value = 0;
}


//this.file = this.$refs.imageUploader.files[0];
async function fileUploaded() {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("field_name", props.field_name);
  await Axios.post("demo-attachment", formData, {
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
    filename.value = response.data.data;
    console.log(response.data);
    //isUploading.value = false;
  });
}
</script>

<style scoped>
.bgSuccess {
  background-color: #198754 !important;
}
</style>
