package Steps;

import Data.DBInsert;
import Data.GetData;
import Pages.RegisterPage;
import io.qameta.allure.Step;

public class RegisterSteps {

    GetData data = new GetData();
    RegisterPage page = new RegisterPage();
    DBInsert insert = new DBInsert();

    @Step("generate and insert data")
    public RegisterSteps generateData() {
        int random = (int) (Math.random() * 10000);
        String email = String.format("selenide%s@gmail.com",random);
        insert.insertData("pharsman","kind","55234811032","secret",
                "new-york",email,"Georgia","Tbilisi","new-york",10);
        return this;
    }

    @Step("i am gonna fill name input")
    public RegisterSteps fillName() {
        page.firstName.sendKeys(data.name);
        return this;
    }
    @Step("i am gonna fill lastname input")
    public RegisterSteps fillLastName() {
        page.lastName.sendKeys(data.lastName);
        return this;
    }
    @Step("i am gonna fill email input")
    public RegisterSteps fillEmail() {
        page.email.sendKeys(data.email);
        return this;
    }
    @Step("i am gonna fill telephone input")
    public RegisterSteps fillPhone() {
        page.telephone.sendKeys(data.phone);
        return this;
    }
    @Step("i am gonna fill password input")
    public RegisterSteps fillPassword() {
        page.password.sendKeys(data.password);
        return this;
    }

    @Step("i am gonna fill confirm password input")
    public RegisterSteps ConfirmPassword() {
        page.confirmPass.sendKeys(data.password);
        return this;
    }

    @Step("i am gonna accept policy privacy")
    public RegisterSteps acceptPolicy() {
        page.acceptPolicy.click();
        return this;
    }

    @Step("i am gonna submit")
    public RegisterSteps submit() {
        page.continueBtn.click();
        return this;
    }
}
