import { ref, reactive } from "vue";
import Axios from "@/http-common";

export function useDatatable() {
  const entries = ref([]) as any;

  const datatables = reactive({
    totalItems: null,
    loadingState: false,
    currentPage: 1,
    allPages: 1,
    pagination: null,
  });

  const showEntries = [25, 50, 100, 250, 500];
  const currentEntries = ref(25);

  //fetch data Module Data
  async function fetchData(url: string, search = "") {
    datatables.loadingState = true;
    await Axios.get(
      url +
        "?showEntries=" +
        currentEntries.value +
        "&page=" +
        datatables.currentPage +
        "&search=" +
        search
    ).then((response) => {
      if (response.data.code == 200) {
        entries.value = response.data.data;
        datatables.totalItems = response.data.meta.total;
        datatables.currentPage = response.data.meta.current_page;
        datatables.allPages = response.data.meta.last_page;
        datatables.pagination = response.data.meta.links;
        datatables.loadingState = false;
      } else {
        toastr.error("Unauthenticated");
      }
    });
  }

  //filter filter Data
  async function filterData(url: string, filter_filed = "") {
    datatables.loadingState = true;
    await Axios.get(
      url +
        "?showEntries=" +
        currentEntries.value +
        "&page=" +
        datatables.currentPage +
        filter_filed
    ).then((response) => {
      console.log("datatable....");
      console.log(response);
      entries.value = response.data.data;
      datatables.totalItems = response.data.meta.total;
      datatables.currentPage = response.data.meta.current_page;
      datatables.allPages = response.data.meta.last_page;
      datatables.pagination = response.data.meta.links;
      datatables.loadingState = false;
    });
  }

  return {
    entries,
    datatables,
    showEntries,
    currentEntries,
    fetchData,
    filterData,
  };
}
