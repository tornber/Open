//import io.appium.java_client.MobileBy;
//import io.appium.java_client.MobileElement;
//import io.appium.java_client.android.AndroidDriver;
//import org.openqa.selenium.By;
//import org.openqa.selenium.remote.DesiredCapabilities;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.openqa.selenium.support.ui.WebDriverWait;
//import org.testng.Assert;
//import org.testng.annotations.AfterMethod;
//import org.testng.annotations.BeforeMethod;
//import org.testng.annotations.Test;
//
//import java.net.MalformedURLException;
//import java.net.URL;
//
//public class Calculator {
//
//    public AndroidDriver<MobileElement> driver;
//    public WebDriverWait wait;
//
//    By digit5 = By.id("com.google.android.calculator:id/digit_5");
//    By digit10 = By.id("com.google.android.calculator:id/digit_10");
//    By plus        = MobileBy.AndroidUIAutomator("new UiSelector().text("+")");
//    By equals        = MobileBy.AndroidUIAutomator("new UiSelector().text(\"=\")");
//    By result = By.id("com.google.android.calculator:id/output");
//
//    @BeforeMethod
//    public void setup() throws MalformedURLException {
//        DesiredCapabilities caps = new DesiredCapabilities();
//        caps.setCapability("deviceName", "Pixel_3a_API_30");
//        caps.setCapability("udid", "emulator-5554"); //DeviceId from "adb devices" command
//        caps.setCapability("platformName", "Android");
//        caps.setCapability("platformVersion", "11.0");
//        caps.setCapability("appPackage", "com.google.android.calculator");
//        caps.setCapability("appActivity", "com.android.calculator2.Calculator");
//        caps.setCapability("noReset", "false");
//        URL url = new URL("http://127.0.0.1:4723/wd/hub");
//        driver = new AndroidDriver<MobileElement>(url, caps);
//        wait = new WebDriverWait(driver, 7);
//    }
//    @Test
//    public void calculate()  {
//        wait.until(ExpectedConditions.visibilityOfElementLocated(digit5)).click();
//        wait.until(ExpectedConditions.visibilityOfElementLocated(plus)).click();
//        wait.until(ExpectedConditions.visibilityOfElementLocated(digit10)).click();
//        wait.until(ExpectedConditions.visibilityOfElementLocated(equals)).click();
//        String text = wait.until(ExpectedConditions.visibilityOfElementLocated(equals)).getText();
//        Assert.assertEquals(text,"15");
//
//    }
////    @AfterMethod
////    public void teardown() {
////        driver.quit();
////    }
//}
