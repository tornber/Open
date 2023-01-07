//import io.github.bonigarcia.wdm.WebDriverManager;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.testng.annotations.Test;
//import org.openqa.selenium.By;
//import org.openqa.selenium.Keys;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.chrome.ChromeDriver;
//
//import java.util.concurrent.TimeUnit;
//
//
//public class CommandsTest {
//
//    @Test
//
//    public void homework() {
//        WebDriverManager.chromedriver().setup();
//        WebDriver driver = new ChromeDriver();
//        driver.manage().timeouts().implicitlyWait(5,TimeUnit.SECONDS);
//        driver.navigate().to("http://the-internet.herokuapp.com/dynamic_controls");
//        driver.manage().window().maximize();
//        WebElement buttonElement = driver.findElement(By.cssSelector("#input-example button"));
//        buttonElement.click();
//        WebElement inputElement = driver.findElement(By.cssSelector("#input-example input"));
//        System.out.println("is enabled " + inputElement.isEnabled());
//        WebElement messageElement = driver.findElement(By.id("message"));
//        System.out.println("is displayed " + messageElement.isDisplayed());
//        System.out.println("get text:" + buttonElement.getText());
//        inputElement.sendKeys("bootcamp");
//        inputElement.clear();
//
//        driver.navigate().to("http://the-internet.herokuapp.com/drag_and_drop");
//        driver.manage().window().maximize();
//        int columnA = driver.findElement(By.id("column-a")).getLocation().getY();
//        int columnB = driver.findElement(By.id("column-b")).getLocation().getY();
//        System.out.println(columnA + " " + columnB);
//        driver.quit();
//
//
//
//
//
//    }
//}
