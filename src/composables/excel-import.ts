import { ref } from "vue";
import Axios from "@/http-common";
import toastr from "toastr";
import { useStore } from "vuex";
import swal from "sweetalert";

export function useExcelImport() {
  const store = useStore();
  const importSpinner = ref(false);
  //Method for uploading
  async function excelImport(api_url: string, file: any, project_id: any = "") {
    // File Validator
    const fileValidation = {
      extension: ["xlsx"],
    };

    const exten = file.name.split(".");
    if (fileValidation.extension.indexOf(exten[1]) == -1) {
      toastr.warning(
        "Your file formate is not Valid. Your selected file extension is <b>'" +
          exten[0] +
          "'</b> but requied file formate is <b>'" +
          fileValidation.toString() +
          "'</b>",
        "Warning!"
      );
      return;
    }

    importSpinner.value = true;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("token", store.state.currentUser.token);
    if (project_id != "") {
      formData.append("version_id", project_id);
    }

    await Axios.post(api_url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        importSpinner.value = false;
        console.log(response);
        if (response.data.code === 200) {
          swal("Poc data imported successfully.", {
            icon: "success",
          });
        } else {
          toastr.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        throw "Error From API";
      });
  }

  return {
    excelImport,
    importSpinner,
  };
}
