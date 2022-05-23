<template>
  <div class="container-fluid">
    <div class="row form-row" style="margin-top: 30px">
      <!--start-->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h1>Projects</h1>
          </div>
        </div>
      </div>
      <!--end-->

      <!--start-->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h1>Clients</h1>
          </div>
        </div>
      </div>
      <!--end-->

      <!--start-->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h1>POC</h1>
          </div>
        </div>
      </div>
      <!--end-->
    </div>

    <div class="row">
      <!--start-->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h1>BOQ</h1>
          </div>
        </div>
      </div>
      <!--end-->

      <!--start-->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h1>OME</h1>
          </div>
        </div>
      </div>
      <!--end-->

      <!--start-->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h1>Task</h1>
          </div>
        </div>
      </div>
      <!--end-->
    </div>
  </div>
</template>

<script setup lang="ts">
import Excel from "exceljs";
import { saveAs } from "file-saver";
// import { useStore } from "vuex";
// import { useCookies } from "vue3-cookies";

// const { cookies } = useCookies();

// const store = useStore();
// console.log(store.state.currentUser.user);

async function exportData() {
  // Create workbook & add worksheet
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("ExampleSheet", {
    views: [{ showGridLines: true }],
  });

  //worksheet.headerFooter.firstHeader = "Hello Exceljs";

  worksheet.mergeCells("A3", "C3");
  worksheet.getCell("A3").value = "Detail Requerment";
  worksheet.getCell("A3").font = {
    bold: true,
    size: 18,
  };
  worksheet.getCell("A3").alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  worksheet.mergeCells("A4", "C4");
  worksheet.getCell("A4").value =
    "  The supplier shall have to do the entire work or job for the implementation of the Secure Proxy Capacity expansion HW & SW including  supply, delivery, installation and commissioning of all necessary Hardware of the system with all features, designing & planning, integration, deployment, customization, testing, commissioning for the end to end Solution, and UAT.	";

  /*Column headers*/
  worksheet.getRow(6).values = [
    "SL",
    "List of Client Requirement",
    "Remarks (If Any)",
  ];
  worksheet.getRow(6).font = {
    bold: true,
    size: 12,
  };

  worksheet.columns = [
    { key: "sl" },
    { key: "requirement" },
    { key: "remarks" },
  ];

  // Add row using key mapping to columns
  let arrData = [
    { sl: "1", requirement: "Access control Requirement	", remarks: "" },
    {
      sl: "1.1",
      requirement: "Preventing Installing Unauthorized Software",
      remarks: "Application control",
    },
  ];

  arrData.forEach(function (item, index) {
    worksheet.addRow({
      sl: item.sl,
      requirement: item.requirement,
      remarks: item.remarks,
    });
  });

  // Add rows as Array values
  //worksheet.addRow(["BCD", "Author Name 3"]);

  // Add rows using both the above of rows
  // const rows = [
  //   ["FGH", "Author Name 4"],
  //   { package_name: "PQR", author_name: "Author 5" },
  // ];

  //worksheet.addRows(rows);

  // save workbook to disk
  // workbook.xlsx
  //   .writeBuffer("sample.xlsx")
  //   .then(() => {
  //     console.log("saved");
  //   })
  //   .catch((err) => {
  //     console.log("err", err);
  //   });

  const buffer = await workbook.xlsx.writeBuffer();
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const fileExtension = ".xlsx";

  const blob = new Blob([buffer], { type: fileType });

  saveAs(blob, "fileName" + fileExtension);
}
</script>

<style scoped></style>
