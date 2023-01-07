function addOrder(customerName,street,city,state) {
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
  textBox.SetText("002");
  groupBox.MasterCard.ClickButton();
  textBox = groupBox.CardNo;
  textBox.Click(26, 9);
  textBox.SetText("112234");
  groupBox.ExpDate.wDate = "2011-08-06";

  orderForm.ButtonOK.ClickButton();
}

module.exports.addOrder = addOrder;