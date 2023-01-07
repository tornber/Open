const getDBDataClass = require('getDataDB')
const addOrderClass = require('addOrder')

function addTwoOrderWithDB() {
  var recordsNumber = 2;
  var fieldNames = ["customerName","street","city","state"];
  var sqlState = `select top ${recordsNumber} customerName,street,city,state from [orders].[dbo].[orders]`;
  var results = getDBDataClass.getDataDB(sqlState,fieldNames)

  for(let j = 0;j < recordsNumber;j++) {
      let ind = fieldNames.length * j; 
      let name = results[ind]
      let street = results[ind + 1]
      let city = results[ind + 2]
      let state = results[ind +3]
    addOrderClass.addOrder(name,street,city,state);
  }
}
  
  function addTwoOrderWithExcell() {
    var recordsNumber = 2;
    var customerNames = getRecordSet("C:/Users/4torn/OneDrive/Desktop/IT_academy/testComplete/Stores/Files/data.xlsx","SELECT * FROM [Sheet1$]","customerName",recordsNumber)
    var streets = getRecordSet("C:/Users/4torn/OneDrive/Desktop/IT_academy/testComplete/Stores/Files/data.xlsx","SELECT * FROM [Sheet1$]","street",recordsNumber)
    var cities = getRecordSet("C:/Users/4torn/OneDrive/Desktop/IT_academy/testComplete/Stores/Files/data.xlsx","SELECT * FROM [Sheet1$]","city",recordsNumber)
    var states = getRecordSet("C:/Users/4torn/OneDrive/Desktop/IT_academy/testComplete/Stores/Files/data.xlsx","SELECT * FROM [Sheet1$]","state",recordsNumber)
    for(let j = 0;j < recordsNumber;j++) {
    addOrderClass.addOrder(customerNames[j],streets[j],cities[j],states[j]);
  }
    
}

  function getRecordSet(excelFileName,excelQuery,FieldName,recordsNumber){
      var result = [];
      var excelConnection = getActiveXObject("ADODB.Connection");
      var str_Connection = "Provider= Microsoft.ACE.OLEDB.12.0;Data Source = " + excelFileName + ";Persist Security Info=False;Extended Properties=Excel 8.0;";
      excelConnection.Open(str_Connection)
      var excel_recordSet = getActiveXObject("ADODB.Recordset");
      excel_recordSet.Open(excelQuery, excelConnection);   
      excel_recordSet.MoveFirst()
      for(let i = 0;i < recordsNumber;i++) {
        result.push(excel_recordSet.Fields.Item(`${FieldName}`).Value)
        excel_recordSet.MoveNext();
      }
      return result;
}

