package Steps;

import Data.RegisterData;
import Pages.FormPageValidate;
import io.qameta.allure.*;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;

public class FormsValidateSteps {

    RegisterData data = new RegisterData();
    Config config = new Config();
    String url = "https://demoqa.com/automation-practice-form";
    FormsSteps formsSteps = new FormsSteps();
    public WebDriver driver = config.setup(url);
    public JavascriptExecutor js = (JavascriptExecutor) driver;
    FormPageValidate formPageValidate = new FormPageValidate(driver);

    @Story("submit form")
    @Step
    public FormsValidateSteps clickSubmit() {
        driver.findElement(formPageValidate.submitBtn);
        js.executeScript("arguments[0].click()",driver.findElement(formPageValidate.submitBtn));
        return this;
    }
    @Step
    public FormsValidateSteps validateTextAfterSubmit() {
//        formsPage.textAfterSubmit.shouldHave(Condition.text(data.textAfterSubmit));
        Assert.assertEquals(driver.findElement(formPageValidate.textAfterSubmit).getText(),data.textAfterSubmit);
        return this;
    }

    @Step
    public FormsValidateSteps checkName() {
        String name = String.format("%s %s",data.name,data.lastName);
//        formsPage.studentName.shouldHave(text(name));
        Assert.assertEquals(driver.findElement(formPageValidate.studentName),name);
        return this;
    }

    @Step("check if gender is {0}")
    public FormsValidateSteps checkGender(String gender) {
//        formsPage.studentGender.shouldHave(text(data.gender));
        Assert.assertEquals(driver.findElement(formPageValidate.studentGender).getText(),gender);
        return this;
    }

    @Step
    public FormsValidateSteps checkMobile() {
//        formsPage.studentMobile.shouldHave(text(data.phone));
        Assert.assertEquals(driver.findElement(formPageValidate.studentMobile).getText(),data.phone);
        config.tearDown(driver);
        return this;
    }
}
