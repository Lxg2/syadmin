/**
 *  导出的Mixin方法等...
 */
import XLSX from "xlsx";
const getImportExcelData = (file)=> {
			return new Promise(resolve => {
				// 判断格式
				const type = file.name.substring(file.name.lastIndexOf(".") + 1);
				if(type !== 'xlsx' && type !== 'xls') {
					resolve(null);
				}
 
				const fileReader = new FileReader();
				fileReader.onload = event => {
					try {
						const data = event.target.result;
						const workbook = XLSX.read(data, { type: "binary" });
						// 取第一张表
						const xlsxData = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
						// 把解析出来的Excel数据返回
						resolve(xlsxData);
					} catch (e) {
						resolve(null);
					}
				}
				fileReader.readAsArrayBuffer(file);
			});
		}
export default getImportExcelData;