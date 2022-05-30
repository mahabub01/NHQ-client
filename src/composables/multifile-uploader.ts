import { ref, reactive } from "vue";
import { useStore } from "vuex";
import toastr from "toastr";
import Axios from "@/http-common";

type validation = {
  extension: any;
  size: number;
};

export function useMultiFileUploader(
  field_name = "default_field",
  api_url: string,
  fileValidation: validation
) {
  const progressInfos: any = reactive([]);
  const message = ref("");
  let selectedFiles = undefined;
  const files = ref();

  const store = useStore();

  function filePicker() {
    selectedFiles = files.value.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      let ex = null;
      ex = selectedFiles[i].name.split(".");
      let getError = 0;
      if (fileValidation.extension.indexOf(ex[1]) == -1) {
        toastr.warning(
          "Your file formate is not Valid. Your selected file extension is <b>'" +
            ex[1] +
            "'</b> but requied file formate is <b>'" +
            fileValidation.toString() +
            "'</b>",
          "Warning!"
        );
        getError++;
        break;
      }

      if (selectedFiles[i].size / 1024 > fileValidation.size) {
        alert("size check...");
        toastr.warning(
          "Your file size is geather then validation file size. Your selected file size is <b>'" +
            selectedFiles[i].size +
            "'</b> but validation file size is <b>'" +
            fileValidation.size / 1024 +
            "'</b>",
          "Warning!"
        );
        break;
        getError++;
      }

      if (getError == 0) {
        uploadFile(i, selectedFiles[i]);
      }
    }
  }

  function uploadFile(idx: number, file: any) {
    progressInfos[idx] = {
      percentage: 0,
      fileName: file.name,
      successdesign: false,
      getFileName: "",
    };

    upload(
      file,
      (event: any) => {
        const per_cal = Math.round((100 * event.loaded) / event.total);
        if (per_cal != 0) {
          progressInfos[idx].percentage = per_cal;
        }
      },
      idx
    )
      .then(
        (response: { data: { message: string; data: any; code: number } }) => {
          const prevMessage = message.value ? message.value + "\n" : "";
          message.value = prevMessage + response.data.message;
          if (response.data.code == 200) {
            progressInfos[idx].successdesign = true;
            progressInfos[idx].getFileName = response.data.data;
            toastr.success("File uploaded successfully.", "Success!");
          } else {
            toastr.error("Your file formate is not valid.", "Error!");
          }
        }
      )
      .catch(() => {
        message.value = "Could not upload the file:" + file.name;
      });
  }

  function upload(file: any, onUploadProgress: any, idx: number) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("field_name", field_name);
    formData.append("token", store.state.currentUser.token);
    formData.append("idx", String(idx));
    return Axios.post(process.env.VUE_APP_API_URL + "/" + api_url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  async function removeFile(index: number, fileName: string) {
    const formData = {
      field_name: field_name,
      token: store.state.currentUser.token,
      path: fileName,
    };

    await Axios.post(
      process.env.VUE_APP_API_URL + "/remove-demo-attachment",
      formData
    )
      .then((response) => {
        console.log(response);
        if (response.data.code == 200) {
          progressInfos.splice(index, 1);
          toastr.success("File remove successfully.", "Success!");
        } else {
          toastr.error("Some problem here.", "Error!");
        }
      })
      .catch(() => {
        toastr.error("Some problem here", "Error!");
      });
  }

  return {
    progressInfos,
    message,
    uploadFile,
    upload,
    selectedFiles,
    files,
    filePicker,
    removeFile,
  };
}
