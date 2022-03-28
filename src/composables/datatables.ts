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
  async function fatchData(url: string) {
    datatables.loadingState = true;
    await Axios.get(
      url +
        "?showEntries=" +
        currentEntries.value +
        "&page=" +
        datatables.currentPage
    ).then((response) => {
      entries.value = response.data.data.data;
      datatables.totalItems = response.data.data.total;
      datatables.currentPage = response.data.data.current_page;
      datatables.allPages = response.data.data.last_page;
      datatables.pagination = response.data.data.links;
      datatables.loadingState = false;
    });
  }

  return {
    entries,
    datatables,
    showEntries,
    currentEntries,
    fatchData,
  };
}
