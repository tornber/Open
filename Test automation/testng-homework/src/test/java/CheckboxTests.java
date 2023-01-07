import Annotations.RetryFailedTests;
import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.*;
import org.testng.asserts.SoftAssert;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.open;

public class CheckboxTests extends ConfigTests {

    WebDriver driver;

    @BeforeClass
    public void checkBoxes() {
        Configuration.baseUrl = "http://the-internet.herokuapp.com";
        Configuration.holdBrowserOpen = false;
    }
    
        @AfterMethod

    public void tearDown(ITestResult result) {
        if(ITestResult.FAILURE == result.getStatus()) {
            ConfigTests.capture(driver,result.getName());
        }
    }


    @Test(groups = {"FrontEnd"})
    public void uncheck() {
        open("/checkboxes");
        SoftAssert softAssert = new SoftAssert();
        SelenideElement checkbox = $("#checkboxes").lastChild().setSelected(false);
        softAssert.assertTrue(checkbox.isSelected());
        softAssert.assertAll();
    }

    @Test(dependsOnMethods = {"uncheck"} , alwaysRun = true,groups = {"BackEnd"})

    public void check() {
        open("/checkboxes");
        SoftAssert softAssert = new SoftAssert();
        SelenideElement checkbox = $("input[type='checkbox']").setSelected(true);
        softAssert.assertFalse(checkbox.isSelected());
        softAssert.assertAll();

    }

}
