package Steps;

import Data.RegisterData;
import Pages.FormsPage;
import com.codeborne.selenide.Condition;
import com.codeborne.selenide.conditions.ExactText;
import io.qameta.allure.Step;
import io.qameta.allure.Story;
import org.checkerframework.checker.units.qual.C;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;

import static com.codeborne.selenide.Condition.*;
import static com.codeborne.selenide.Selenide.executeJavaScript;

public class FormsSteps {

    Config config = new Config();
    public String url = "https://demoqa.com/forms";
    public WebDriver driver = config.setup(url);
    public JavascriptExecutor js = (JavascriptExecutor) driver;
    FormsPage formsPage = new FormsPage(driver);
    RegisterData data = new RegisterData();

    @Step
    public FormsSteps PractiseFormClick() {
        formsPage.practiseForm.click();
        return this;
    }
    @Story("starting register with fill name")
    @Step
    public FormsSteps fillName() {
        formsPage.firstName.sendKeys(data.name);
        return this;
    }

    @Step("fill lastaname {0}")
    public FormsSteps fillLastName(String lastname) {
        formsPage.lastName.sendKeys(lastname);
        return this;
    }

    @Step
    public FormsSteps fillGender() {
        js.executeScript("arguments[0].click()",formsPage.gender);
        return this;
    }

    @Step
    public FormsSteps fillMobile() {
        formsPage.mobile.sendKeys(data.phone);
        return this;
    }


}
