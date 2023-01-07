import com.codeborne.selenide.AssertionMode;
import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.SelenideElement;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.ITestResult;
import org.testng.annotations.*;
import org.testng.asserts.SoftAssert;

import java.io.File;
import java.util.Random;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.open;

public class ConfigTests {

    WebDriver driver;

    @BeforeTest

    public void tests() {
        Configuration.assertionMode = AssertionMode.SOFT;
        ChromeOptions options = new ChromeOptions();
        options.addArguments("start-maximized");
        Configuration.browserCapabilities = options;
        Configuration.browserSize = null;
//         Configuration.holdBrowserOpen = true;
        Configuration.savePageSource = false;
    }

    @BeforeMethod
    public void browser() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }

    @AfterMethod

    public void tearDown() {
        driver.quit();
    }

    public static void capture(WebDriver driver,String screenshotName) {
        try {
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);
            FileUtils.copyFile(source,new File("CheckboxFailedTests/" + screenshotName + ".png"));

        } catch (Exception e) {
            System.out.println("exception occured" + e.getMessage());
        }
    }

    public static void capture2(WebDriver driver,String screenshotName) {
        try {
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);
            FileUtils.copyFile(source,new File("RadioButtonFailedTests/" + screenshotName + ".png"));

        } catch (Exception e) {
            System.out.println("exception occured" + e.getMessage());
        }
    }

}
