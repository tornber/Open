import io.appium.java_client.*;
import io.appium.java_client.android.Activity;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;
import io.appium.java_client.remote.MobileCapabilityType;
import io.appium.java_client.touch.LongPressOptions;
import io.appium.java_client.touch.WaitOptions;
import io.appium.java_client.touch.offset.PointOption;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.concurrent.locks.Condition;

public class TouchActionsTest {

    public AndroidDriver<MobileElement> driver;
//    public AppiumDriver<MobileElement> driver;
    public WebDriverWait wait;

    public By swipeBy = MobileBy.AndroidUIAutomator("new UiSelector().description(\"Swipe\")");
    public By verticalSwipe = MobileBy.AndroidUIAutomator("new UiSelector().text(\"SWIPEABLE (VERTICAL)\")");
    public By theroToA = MobileBy.AndroidUIAutomator("new UiSelector().text(\"0 - A\")");
    public By fiveToF = MobileBy.AndroidUIAutomator("new UiSelector().text(\"5 - F\")");
    public By longPressBy = MobileBy.AndroidUIAutomator("new UiSelector().text(\"SWIPE ON LONG PRESS\")");

    @BeforeMethod

    public void setDriver() throws MalformedURLException {

        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("deviceName", "Pixel_3a_API_30");
        caps.setCapability("udid", "emulator-5554"); //DeviceId from "adb devices" command
        caps.setCapability("platformName", "Android");
        caps.setCapability("platformVersion", "11.0");
//        caps.setCapability("appPackage", "com.h6ah4i.android.example.advrecyclerview");
//        caps.setCapability("appActivity", "com.h6ah4i.android.example.advrecyclerview.launcher.MainActivity");
        caps.setCapability("noReset", "false");
        URL url = new URL("http://127.0.0.1:4723/wd/hub");
        driver = new AndroidDriver<MobileElement>(url,caps);
//        driver = new AppiumDriver<MobileElement>(url,caps);
        wait = new WebDriverWait(driver,7);
    }

//    @AfterMethod
//
//    public void tearDown() {
//        driver.quit();
//    }

    @Test

    public void swipeTest() {
        try {
            Activity activity = new Activity("com.h6ah4i.android.example.advrecyclerview","com.h6ah4i.android.example.advrecyclerview.launcher.MainActivity");
            driver.startActivity(activity);
            wait.until(ExpectedConditions.visibilityOfElementLocated(swipeBy)).click();
            AndroidElement A = (AndroidElement) driver.findElement(theroToA);
            AndroidElement F = (AndroidElement) driver.findElement(fiveToF);

            int middleY = A.getLocation().y + (A.getSize().height / 2);
            int aX = A.getLocation().x;
            int fX = F.getLocation().x;

            TouchAction action1 = new TouchAction(driver)
                    .press(PointOption.point(aX,middleY))
                    .waitAction(WaitOptions.waitOptions(Duration.ofSeconds(1)))
                    .moveTo(PointOption.point(fX,middleY))
                    .release();
            action1.perform();
            driver.pressKey(new KeyEvent(AndroidKey.BACK));

            AndroidElement longPress = (AndroidElement) driver.findElement(longPressBy);
            int longPressX = longPress.getLocation().x + (longPress.getSize().width / 2);
            int longPressY = longPress.getLocation().y + (longPress.getSize().height / 2);

            TouchAction action2 = new TouchAction(driver)
                    .longPress(PointOption.point(longPressX,longPressY))
                    .waitAction(WaitOptions.waitOptions(Duration.ofSeconds(3)))
                    .release();
            action2.perform();

            Dimension dimension1 = driver.manage().window().getSize();

            int startX1 = (int) (dimension1.width * 0.5);
            int startY1 = (int) (dimension1.height * 0.2);

            int endX1 = (int) (dimension1.width * 0.5);
            int endY1 = (int) (dimension1.height * 0.9);

            TouchAction swipeDown = new TouchAction(driver)
                    .press(PointOption.point(startX1,startY1))
                    .waitAction(WaitOptions.waitOptions(Duration.ofSeconds(1)))
                    .moveTo(PointOption.point(endX1,endY1))
                    .release();


            Dimension dimension2 = driver.manage().window().getSize();

            int startX2 = (int) (dimension1.width * 0.5);
            int startY2 = (int) (dimension1.height * 0.2);

            int endX2 = (int) (dimension1.width * 0.5);
            int endY2 = (int) (dimension1.height * 0.9);

            TouchAction swipeUp = new TouchAction(driver)
                    .press(PointOption.point(startX1,startY1))
                    .waitAction(WaitOptions.waitOptions(Duration.ofSeconds(1)))
                    .moveTo(PointOption.point(endX1,endY1))
                    .release();

            MultiTouchAction multiTouchAction = new MultiTouchAction(driver).add(swipeDown).add(swipeUp);
            multiTouchAction.perform();


        } catch (Exception e) {
            System.out.println(e.getCause());
            System.out.println(e.getMessage());
        }

}
}