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
            <!-- <button type="button" @click="exportData()">Export</button> -->
          </div>
        </div>
      </div>
      <!--end-->
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useStore } from "vuex";
// import { useCookies } from "vue3-cookies";

// const { cookies } = useCookies();

// const store = useStore();
//console.log(store.state.currentUser.token);

import Excel from "exceljs";
import { saveAs } from "file-saver";

async function exportData() {
  // Create workbook & add worksheet
  const workbook = new Excel.Workbook();
  // const worksheet = workbook.addWorksheet("ExampleSheet", {
  //   views: [{ showGridLines: false }],
  // });

  //worksheet.headerFooter.firstHeader = "Hello Exceljs";
  const worksheet = workbook.addWorksheet("ExampleSheet", {
    pageSetup: {
      fitToPage: true,
      paperSize: 9,
      horizontalCentered: true,
      margins: {
        left: 0.1,
        right: 0.1,
        top: 1,
        bottom: 1,
        header: 1,
        footer: 0.3,
      },
    },
    views: [{ showGridLines: true }],
    headerFooter: {
      firstHeader: "Title from here.",
      firstFooter: "Footer from here.",
    },
  });

  // add column headers
  worksheet.addRow([3, "Sam"]);

  worksheet.columns = [
    { header: "Package", key: "package_name" },
    { header: "Author", key: "author_name" },
  ];

  worksheet.addRow([3, "Sam", new Date()]);

  // Add row using key mapping to columns
  worksheet.addRow(
    { package_name: "ABC", author_name: "Author 1" },
    { package_name: "XYZ", author_name: "Author 2" }
  );

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
