import swal from "sweetalert";
import Axios from "@/http-common";

export function useBaseService() {
  function removeData(id: number, api_url: string) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        return true;
      }
    });
  }

  return {
    removeData,
  };
}
