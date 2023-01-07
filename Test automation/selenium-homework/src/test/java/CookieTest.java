import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import java.util.Date;
import java.util.Iterator;
import java.util.Set;

public class CookieTest {

    WebDriver driver;

    public CookieTest() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test

    public void task1() {
        driver.navigate().to(" http://demo.guru99.com/test/cookie/selenium_aut.php");
        WebElement usernameElement = driver.findElement(By.cssSelector(".form-signin input[name='username']"));
        usernameElement.sendKeys("tornike");
        WebElement passwordElement = driver.findElement(By.cssSelector(".form-signin input[name='password']"));
        passwordElement.sendKeys("1234");
        WebElement buttonElement = driver.findElement(By.cssSelector(".form-signin button[type='submit']"));
        buttonElement.click();
        Set<Cookie> cookies = driver.manage().getCookies();
        for (Cookie ck : cookies) {
            if (ck.getName().equalsIgnoreCase("Selenium")) {
                driver.manage().deleteCookie(ck);
            }else if(ck.getExpiry().equals(null)){
                driver.manage().deleteCookie(ck);
            } else {
                System.out.println("no cookies found");
            }
        }

    }

    @AfterMethod

    public void tearDown() {
        driver.quit();
    }

}
