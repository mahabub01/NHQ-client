import { ref } from "vue";
import Axios from "@/http-common";
import { useStore } from "vuex";
import toastr from "toastr";

export function useSingleImageUploader(
  field_name = "default_field",
  api_url: string,
  fileValidation: any
) {
  //end file Validation
  const currentValue = ref(0);
  const isApplyBgSuccess = ref(false);
  const isUploading = ref(false);
  const isDoneUploading = ref(false);
  const store = useStore();

  const fileuploader = async (file: any, version_id = "") => {
    //File Validation
    let ex = null;
    ex = file.name.split(".");
    if (fileValidation.extension.indexOf(ex[1]) == -1) {
      toastr.warning(
        "Your file formate is not Valid. Your selected file extension is <b>'" +
          ex[1] +
          "'</b> but requied file formate is <b>'" +
          fileValidation.toString() +
          "'</b>",
        "Warning!"
      );
      return;
    }

    if (file.size / 1024 > fileValidation.size) {
      toastr.warning(
        "Your file size is geather then validation file size. Your selected file size is <b>'" +
          file.size +
          "'</b> but validation file size is <b>'" +
          fileValidation.size / 1024 +
          "'</b>",
        "Warning!"
      );
      return;
    }

    isUploading.value = true;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("field_name", field_name);
    formData.append("token", store.state.currentUser.token);
    formData.append("version_id", version_id);
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
        if (response.data.code === 200) {
          //isUploading.value = false;
          isDoneUploading.value = true;
          store.dispatch("addFileNameOne", response.data.data);
          //dispatch data in vuex store
        } else {
          //Show Error message
          currentValue.value = 0;
          isApplyBgSuccess.value = false;
          toastr.error(response.data.message);
          isDoneUploading.value = false;
        }
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
