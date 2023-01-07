function getDataDB(queryString,fieldNames) {
  
  Delay(2000)
  
  var qr;
  var results = []
  
  qr = ADO.CreateADOQuery();
  
  qr.ConnectionString = "Provider=SQLOLEDB.1;Server=localhost;" +
                        "Database=orders;Uid=myLogin;Pwd=TestAutomation123;"
                        
  qr.SQL = queryString;
  
  qr.Open()
  
  qr.First()
  
  while(!qr.EOF) {
    for(let i = 0;i < fieldNames.length;i++) {
      results.push(qr.FieldByName(fieldNames[i]).Value)
    }
    qr.Next()
  }
  
  qr.Close()
  
  return results;
                            
}

module.exports.getDataDB= getDataDB