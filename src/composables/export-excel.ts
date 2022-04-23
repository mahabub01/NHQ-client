import Excel from "exceljs";
import { saveAs } from "file-saver";

export function useExcelExport(
  haveTitle = false,
  haveSubtitle = false,
  fileExtension = ""
) {
  const excelExport = async (
    exportData = [],
    header = [],
    colums = [],
    title = "",
    subtitle = ""
  ) => {
    // Create workbook & add worksheet
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("sheet 1", {
      views: [{ showGridLines: true }],
    });

    //if have export file title that time work title
    if (haveTitle) {
      worksheet.mergeCells("A3", "C3");
      worksheet.getCell("A3").value = title;
      worksheet.getCell("A3").font = {
        bold: true,
        size: 18,
      };
      worksheet.getCell("A3").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    }

    //if have export file sub title that time work subtitle
    if (haveSubtitle) {
      worksheet.mergeCells("A4", "C4");
      worksheet.getCell("A4").value = subtitle;
      worksheet.getCell("A4").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    }

    //Column Headers
    worksheet.getRow(6).values = header;
    worksheet.getRow(6).font = {
      bold: true,
      size: 12,
    };

    //Worksheet Column Key
    worksheet.columns = colums;

    exportData.forEach(function (item, index) {
      worksheet.addRow(item);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    if (fileExtension == null || fileExtension == "") {
      fileExtension = ".xlsx";
    }

    const blob = new Blob([buffer], { type: fileType });

    saveAs(blob, "fileName" + fileExtension);
  };

  return {
    excelExport,
  };
}
