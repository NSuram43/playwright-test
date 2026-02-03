import ExcelJS from "exceljs";

function getText(cellValue: ExcelJS.CellValue): string {
  if (cellValue === null || cellValue === undefined) return "";

  if (typeof cellValue === "object") {
    const anyVal = cellValue as any;
    if (typeof anyVal.text === "string") return anyVal.text;
    if (typeof anyVal.result !== "undefined") return String(anyVal.result);
    return JSON.stringify(cellValue);
  }
  return String(cellValue);
}

function findCellInColumn(
  worksheet: ExcelJS.Worksheet,
  searchText: string,
  headerName: string
) {
  const headerRow = worksheet.getRow(1);

  // find column index by header name
  let targetCol = -1;

  for (let col = 1; col <= headerRow.cellCount; col++) {
    const headerCellText = getText(headerRow.getCell(col).value).trim();
    if (headerCellText === headerName.trim()) {
      targetCol = col;
      break;
    }
  }

  if (targetCol === -1) {
    throw new Error(
      `Column header "${headerName}" not found in sheet "${worksheet.name}".`
    );
  }

  // Scan only that column from row 2..rowCount
  for (let r = 2; r <= worksheet.rowCount; r++) {
    const row = worksheet.getRow(r);
    const cell = row.getCell(targetCol);

    const cellText = getText(cell.value).trim();
    if (cellText === searchText.trim()) {
      return { row: r, column: targetCol };
    }
  }

  return null;
}

export async function excelWrite(
  filePath: string,
  columnHeader: string,
  searchText: string,
  newValue: string
) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.worksheets[0];
  if (!worksheet) throw new Error("No worksheet found in the Excel file.");

  const coords = findCellInColumn(worksheet, searchText, columnHeader);
  if (!coords) {
    throw new Error(
      `Text "${searchText}" not found under column "${columnHeader}" in sheet "${worksheet.name}".`
    );
  }

  const cell = worksheet.getCell(coords.row, coords.column);
  cell.value = newValue;

  await workbook.xlsx.writeFile(filePath);

  return {
    savedTo: filePath,
    updatedCell: cell.address,
    sheet: worksheet.name,
  };
}
