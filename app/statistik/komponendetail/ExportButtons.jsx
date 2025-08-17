"use client";

import ExcelJS from "exceljs";

export default function ExportButtons({ datas, years }) {
  const handleExportJSON = () => {
    const jsonData = JSON.stringify(datas);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportExcel = async () => {
    let counter = 1;
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Data");

    // header
    sheet.addRow(["No", "Nama Elemen", "Satuan", ...years]);

    // isi data
    Object.values(datas).forEach(({ metadata, data }) => {
      const row = [
        counter++,
        metadata.nama_elemen,
        metadata.satuan,
        ...years.map((y) => data[y]?.value ?? ""),
      ];
      sheet.addRow(row);
    });

    // generate file dan download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExportJSON}
        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
      >
        Export JSON
      </button>
      <button
        onClick={handleExportExcel}
        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
      >
        Export Excel
      </button>
    </div>
  );
}
