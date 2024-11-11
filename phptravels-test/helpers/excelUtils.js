import xlsx from 'xlsx';
import path from 'path';

const workbookPath = path.resolve(__dirname, '../testData.xlsx');
const workbook = xlsx.readFile(workbookPath);

export const getSheetData = (sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet, { header: 1 }).slice(1);
};

export const writeTestResultLogin = (sheetName, rowIndex, result) => {
    const worksheet = workbook.Sheets[sheetName];
    const resultCell = `C${rowIndex + 2}`;
    worksheet[resultCell] = { t: 's', v: result };
    xlsx.writeFile(workbook, workbookPath);
};


export const writeTestResultRegister = (sheetName, rowIndex, result) => {
    const worksheet = workbook.Sheets[sheetName];
    const resultCell = xlsx.utils.encode_cell({ r: rowIndex + 1, c: 6 });
    worksheet[resultCell] = { t: 's', v: result };
    xlsx.writeFile(workbook, workbookPath);
};
