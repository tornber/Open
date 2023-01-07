import Data.RegisterData;
import Pages.FormsPage;
import Pages.NavigatorPage;
import Steps.Config;
import Steps.FormsSteps;
import Steps.FormsValidateSteps;
import Steps.NavigatorSteps;
import io.github.bonigarcia.wdm.WebDriverManager;
import io.qameta.allure.*;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import javax.imageio.IIOException;
import java.io.IOException;

@Epic("registration  test")
public class RegisterTest {

//    WebDriver driver;
//
//    public RegisterTest() {
//        Config config = new Config();
//        String url = "https://demoqa.com/";
//        driver = config.setup(url);
//        NavigatorSteps navigatorSteps = new NavigatorSteps(driver);
//    }

    RegisterData data = new RegisterData();
    FormsSteps formsSteps = new FormsSteps();
    Config config = new Config();
    NavigatorSteps navigatorSteps = new NavigatorSteps();
    FormsValidateSteps formValidate = new FormsValidateSteps();

    @Test(description = "register test")
    @Feature("register test unites all files in this project")
    @Description("this test executes register")
    @Severity(SeverityLevel.BLOCKER)
    public void register() {
        // page factory
        navigatorSteps.navigateToForms();
        formsSteps.PractiseFormClick()
                .fillName()
                .fillLastName(data.lastName)
                .fillGender()
                .fillMobile();

//         fluent api
       formValidate.clickSubmit()
                .validateTextAfterSubmit()
                .checkName()
                .checkGender(data.gender)
                .checkMobile();
    }


}
