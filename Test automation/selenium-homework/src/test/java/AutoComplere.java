import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import java.util.List;

public class AutoComplere {

    WebDriver driver;

    public AutoComplere() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test

    public void task1() {
        driver.navigate().to("https://www.google.com/");
        WebElement element = driver.findElement(By.cssSelector(".gLFyf"));
        element.sendKeys("Automation");
        WebDriverWait wait =  new WebDriverWait(driver,3);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.cssSelector(".G43f7e li")));

        List <WebElement> webElements = driver.findElements(By.cssSelector(".G43f7e li"));
        for(WebElement webElement : webElements) {
            System.out.println(webElement.getText());
        }
        WebElement lastElement = driver.findElement(By.cssSelector(".G43f7e li:last-child"));
        lastElement.click();
    }

    @AfterMethod

    public void tearDown() {
        driver.quit();
    }

}
