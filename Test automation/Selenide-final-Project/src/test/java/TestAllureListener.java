import com.codeborne.selenide.Screenshots;
import com.codeborne.selenide.WebDriverRunner;
import com.codeborne.selenide.commands.TakeScreenshot;
import com.google.common.io.Files;
import io.qameta.allure.Attachment;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import java.io.File;
import java.io.IOException;

import static com.codeborne.selenide.WebDriverRunner.getSelenideProxy;
import static com.codeborne.selenide.WebDriverRunner.getWebDriver;

public class TestAllureListener implements ITestListener {


    @Attachment(value = "Page Screenshot",type = "image/png")
    public static byte[] getScreenshot(byte[] screenShot) throws IOException {
        return screenShot;
    }

    @Override
    public void onTestStart(ITestResult result) {
        // TODO Auto-generated method stub

    }
    @Override
    public void onTestSuccess(ITestResult result) {
        // TODO Auto-generated method stub

    }
    @Override
    public void onTestFailure(ITestResult result) {
        try {
            File lastScreenShot = Screenshots.getLastScreenshot();
            byte[] screenShot = Files.toByteArray(lastScreenShot);
            getScreenshot(screenShot);
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("listeners works properly");
    }
    @Override
    public void onTestSkipped(ITestResult result) {
        // TODO Auto-generated method stub

    }
    @Override
    public void onTestFailedButWithinSuccessPercentage(ITestResult result) {
        // TODO Auto-generated method stub

    }
    @Override
    public void onStart(ITestContext context) {
        // TODO Auto-generated method stub

    }
    @Override
    public void onFinish(ITestContext context) {
        // TODO Auto-generated method stub
    }

}
