import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import java.util.concurrent.TimeUnit;

public class FileUploadTest {

    WebDriver driver;
    public FileUploadTest() {

        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
//        driver = new HtmlUnitDriver(BrowserVersion.CHROME,true);
//        driver.manage().window().maximize();
    }

    @Test

    public void uploadFile() {
        driver.navigate().to("http://the-internet.herokuapp.com/upload ");
        WebElement uploadElement = driver.findElement(By.id("file-upload"));
        String path = System.getProperty("user.dir");
        uploadElement.sendKeys( path + "/images.png");
        WebElement submitElement = driver.findElement(By.id("file-submit"));
        submitElement.click();

        try {
            uploadElement.click();
        } catch (StaleElementReferenceException e) {
            System.out.println("stale element");
        }

    }



    @AfterMethod

    public void tearDown() {
        driver.quit();
    }
}
