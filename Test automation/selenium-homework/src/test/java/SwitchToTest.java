import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

public class SwitchToTest {

    WebDriver driver;

    public SwitchToTest() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    }

    @Test

    public void writeAndClickIframe() {
        driver.navigate().to("http://the-internet.herokuapp.com/iframe");
        driver.switchTo().frame(0);
        WebElement Input = driver.findElement(By.cssSelector("#tinymce p"));
        Input.sendKeys("Here Goes");
        System.out.println(Input.getText());
        driver.switchTo().defaultContent();
        WebElement button = driver.findElement(By.cssSelector(".tox-tbtn:nth-child(2)"));
        button.click();
    }

    @Test

    public void acceptAlert() {
        driver.navigate().to(" https://demoqa.com/alerts");
        WebElement alertButton = driver.findElement(By.id("alertButton"));
        alertButton.click();
        driver.switchTo().alert().accept();
    }

    @AfterMethod

    public void tearDown() {
        driver.quit();
    }
}
