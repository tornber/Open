function Test1(customerName,street,state,city,zip,CardNo,DateString)
{
  TestedApps.Orders.Run();
  let orders = Aliases.Orders;
  orders.MainForm.MainMenu.Click("Orders|New order...");
  let orderForm = orders.OrderForm;
  let groupBox = orderForm.Group;
  let comboBox = groupBox.ProductNames;
  comboBox.Click(29, 14);
  comboBox.Click(29, 7);
  let textBox = groupBox.Customer;
  textBox.Click(59, 12);
  textBox.SetText(customerName);
  textBox = groupBox.Street;
  textBox.Click(83, 5);
  textBox.SetText(street);
  textBox = groupBox.State;
  textBox.Click(71, 4);
  textBox.SetText(state);
  textBox = groupBox.City;
  textBox.Click(29, 9);
  textBox.SetText(city);
  textBox = groupBox.Zip;
  textBox.Click(59, 8);
  textBox.SetText(zip);
  groupBox.MasterCard.ClickButton();
  textBox = groupBox.CardNo;
  textBox.Click(26, 9);
  textBox.SetText(CardNo);
  groupBox.ExpDate.wDate = DateString;
  aqObject.CheckProperty(Aliases.Orders.OrderForm.Group.ProductNames, "wItemCount", cmpEqual, 3);
  aqObject.CheckProperty(Aliases.Orders.OrderForm.Group.ProductNames, "wText", cmpEqual, "MyMoney", false);
  aqObject.CheckProperty(Aliases.Orders.OrderForm.Group.MasterCard, "wChecked", cmpEqual, true);
  aqObject.CheckProperty(Aliases.Orders.OrderForm.Group.Customer, "wText", cmpEqual, customerName);
  orderForm.ButtonOK.ClickButton();
  
  aqObject.CheckProperty(Aliases.Orders.MainForm.OrdersView, "wItem(0, 0)", cmpEqual, "tornike", false);
  aqObject.CheckProperty(Aliases.Orders.MainForm.OrdersView, "wItem(0, 1)", cmpEqual, "MyMoney", false);
  aqObject.CheckProperty(Aliases.Orders.MainForm.OrdersView, "wItem(0, 2)", cmpEqual, "1", false);
  aqObject.CheckProperty(Aliases.Orders.MainForm.OrdersView, "wItem(0, 3)", cmpEqual, "06.04.2005");
  aqObject.CheckProperty(Aliases.Orders.MainForm.OrdersView, "wItem(0, 4)", cmpEqual, "13");
  aqObject.CheckProperty(Aliases.Orders.MainForm.OrdersView, "wItem(0, 5)", cmpEqual, "tbilisi");
  aqObject.CheckProperty(Aliases.Orders.MainForm.OrdersView, "wItem(0, 6)", cmpEqual, "2");
  aqObject.CheckProperty(Aliases.Orders.MainForm.OrdersView, "wItem(0, 7)", cmpEqual, "002");
  aqObject.CheckProperty(Aliases.Orders.MainForm.OrdersView, "wItem(0, 8)", cmpEqual, "MasterCard");
  aqObject.CheckProperty(Aliases.Orders.MainForm.OrdersView, "wItem(0, 10)", cmpEqual, "06.08.2011");
  aqObject.CheckProperty(Aliases.Orders.MainForm.OrdersView, "wItemCount", cmpEqual, 1);
  
  
  orders = Aliases.Orders;
  let listView = orders.MainForm.OrdersView;
  listView.ClickItem("tornike", "MyMoney");
  listView.ClickItemR("tornike", "MyMoney");
  listView.PopupMenu.Click("Delete order");
  orders.dlgConfirmation.btnYes.ClickButton();
  
  aqObject.CheckProperty(Aliases.Orders.MainForm.OrdersView, "wItemCount", cmpEqual, 0);
  orders = Aliases.Orders;
}

Test1("tornike","13","2","tbilisi","002","123344","2011-08-06")