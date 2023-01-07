import com.codeborne.selenide.Condition;
import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.SelenideElement;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.ITestResult;
import org.testng.annotations.*;
import org.testng.asserts.SoftAssert;

import java.time.Duration;

import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Configuration.timeout;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.open;

public class RadioButtonTests {

    WebDriver driver;

    @BeforeClass
    public void radioButtons() {
        Configuration.baseUrl = "https://demoqa.com";
        Configuration.holdBrowserOpen = false;
        timeout = 3;
    }

    @BeforeMethod
    public void browser() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }

    @Test(groups = {"FrontEnd"})
    public void selectYes() {
        open("/radio-button");
//duration of seconds არ მუშაობს
//        $("#yesRadio").shouldHave(visible,Duration.ofSeconds(4));
        SelenideElement yes = $("#yesRadio").setSelected(true);
        SoftAssert softAssert = new SoftAssert();
        softAssert.assertEquals(yes.isSelected(),false,"error message");
        softAssert.assertAll();
    }

    @Test(groups = {"BackEnd"})

    public void selectNo() {
        open("/radio-button");
        SelenideElement no = $("#noRadio");
        SoftAssert softAssert = new SoftAssert();
        softAssert.assertEquals(no.isEnabled(),true);
        softAssert.assertAll();
    }

    @AfterMethod

    public void tearDown(ITestResult result) {
        if(ITestResult.FAILURE == result.getStatus()) {
            ConfigTests.capture2(driver,result.getName());
        }
    }


}
