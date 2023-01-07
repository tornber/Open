import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.testng.annotations.Test;

import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;

public class WaitsTest {

    @Test

    public void homework() {

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        Wait wait = new FluentWait(driver)
                .withTimeout(15, TimeUnit.SECONDS)
                .pollingEvery(500,TimeUnit.MILLISECONDS)
                .ignoring(NoSuchElementException.class);


        driver.navigate().to("https://demoqa.com/progress-bar");
        WebElement startButtonElement = driver.findElement(By.id("startStopButton"));
        startButtonElement.click();
        WebElement progressBarElement = driver.findElement(By.className("progress-bar"));
        wait.until(ExpectedConditions.attributeContains(progressBarElement,"class","bg-success"));
        System.out.println("100%");
    }
}
