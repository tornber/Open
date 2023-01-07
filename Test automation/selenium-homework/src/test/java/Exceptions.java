import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class Exceptions {

    WebDriver driver;

    public Exceptions() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test


    public void task1() {
        driver.navigate().to("https://jqueryui.com/datepicker/");
        try {
            driver.switchTo().frame(0);
        } catch (NoSuchFrameException e) {
            System.out.println("no such frame");
        }
        try {
            WebElement dateButton = driver.findElement(By.id("datepicker"));
            dateButton.click();
        }
        catch (NoSuchElementException e) {
            System.out.println("no such element found");
        }

        WebElement prev = driver.findElement(By.className("ui-icon-circle-triangle-w"));
        prev.click();
        WebElement date = driver.findElement(By.xpath("//tr[last()]/td[last() - 4]"));
        date.click();


        driver.switchTo().defaultContent();
    }

    @Test

    public void task2() {
        driver.navigate().to("https://demoqa.com/alerts");
        WebElement alertButton = driver.findElement(By.id("timerAlertButton"));
        new WebDriverWait(driver, 3).until(ExpectedConditions.elementToBeClickable(alertButton));
        alertButton.click();
//        new WebDriverWait(driver, 3).until(ExpectedConditions.alertIsPresent()); timeout exception invoked here!
        new WebDriverWait(driver, 5).until(ExpectedConditions.alertIsPresent());
        try {
            driver.switchTo().alert().accept();
        } catch (NoAlertPresentException e) {
            System.out.println("no alert here");
        }

        WebElement element = driver.findElement(By.id("confirmButton"));
        element.click();
        try {
            driver.switchTo().alert().accept();
            WebElement anotherElement = driver.findElement(By.id("confirmResult"));
            driver.navigate().refresh();
            anotherElement.click();
        } catch (StaleElementReferenceException e) {
            System.out.println("well");
        }
    }

    @AfterMethod

    public void tearDown() {
        driver.quit();
    }


}
