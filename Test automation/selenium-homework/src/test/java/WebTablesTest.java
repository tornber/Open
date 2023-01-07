import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

public class WebTablesTest {

    WebDriver driver;

    public WebTablesTest() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test

    public void task3() {
        driver.navigate().to("http://techcanvass.com/Examples/webtable.html");
        System.out.println(driver.findElement(By.xpath("//*[@id='t01']/tbody/tr[last()]/td[last()]")).getText());
    }


    @AfterMethod

    public void tearDown() {
        driver.quit();
    }

}
