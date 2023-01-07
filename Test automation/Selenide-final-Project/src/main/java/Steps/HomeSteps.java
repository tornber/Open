package Steps;

import Pages.HomePage;
import io.qameta.allure.Step;

public class HomeSteps {

    HomePage homePage = new HomePage();

    @Step("click on my account")
    public HomeSteps accountClick() {
        homePage.myAccount.click();
        return this;
    }
    @Step("cick on register")
    public HomeSteps registerClick() {
        homePage.register.click();
        return this;
    }
}
