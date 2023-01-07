import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import javax.swing.*;

public class JSexecutor {

    WebDriver driver;

    public JSexecutor() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
//        driver = new HtmlUnitDriver(BrowserVersion.CHROME,true);
//        driver.manage().window().maximize();
    }

    @Test

    public void hover() {
        driver.navigate().to("http://webdriveruniversity.com/To-Do-List/index.html");
        WebElement textElement = driver.findElement(By.xpath("//ul/li[contains(text(),'Practice magic')]"));
        Actions action = new Actions (driver);
        action.moveToElement(textElement);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        WebElement deleteElement = driver.findElement(By.className("fa-trash"));
        js.executeScript("arguments[0].click()",deleteElement);

    }

    @Test

    public void scroll() {

        driver.navigate().to("http://webdriveruniversity.com/Scrolling/index.html ");
        WebElement entryElement = driver.findElement(By.cssSelector(".col-lg-12 .thumbnail"));
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView()",entryElement);
        WebElement textElement = driver.findElement(By.id("zone2-entries"));
        System.out.println(js.executeScript("arguments[0].innerText",textElement));
//        System.out.println(js.executeScript("document.getElementById('zone2-entries').innerText"));

    }

//    @AfterMethod
//
//    public void tearDown() {
//        driver.quit();
//    }
}
