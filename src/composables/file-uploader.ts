import { ref } from "vue";
import Axios from "@/http-common";
import { useStore } from "vuex";

export function useUploader(field_name = "default_field", api_url: string) {
  const currentValue = ref(0);
  const isApplyBgSuccess = ref(false);
  const isUploading = ref(false);
  const isDoneUploading = ref(false);
  const store = useStore();

  const fileuploader = async (file: any) => {
    isUploading.value = true;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("field_name", field_name);
    await Axios.post(api_url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: ({ total, loaded }) => {
        currentValue.value = (loaded / total) * 100;
        if (currentValue.value == 100) {
          isApplyBgSuccess.value = true;
        }
      },
    })
      .then((response) => {
        //isUploading.value = false;
        isDoneUploading.value = true;
        store.dispatch("addFileNameOne", response.data.data);
        //dispatch data in vuex store
      })
      .catch((error) => {
        console.log(error);
        throw "Error From API";
      });
  };

  const removeUploadedFile = async (url: string) => {
    await Axios.post(url, {
      filename: store.state.fileuploader.filename_one,
    }).then((response) => {
      console.log(response);
      isUploading.value = false;
      isDoneUploading.value = false;
      store.dispatch("addFileNameOne", null);
    });
  };

  return {
    isUploading,
    currentValue,
    isApplyBgSuccess,
    fileuploader,
    isDoneUploading,
    removeUploadedFile,
  };
}
