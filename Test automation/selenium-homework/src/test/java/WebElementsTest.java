import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;



public class WebElementsTest {

    @Test

    public void homework() {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.navigate().to("http://the-internet.herokuapp.com/add_remove_elements/");
        WebElement addButton = driver.findElement(By.cssSelector(".example button"));
        for(int i = 0;i < 3;i++) {
            addButton.click();
        }
        System.out.println("last element is: " + driver.findElement(By.cssSelector("#elements:last-child")));
        System.out.println("last element: " + driver.findElement(By.cssSelector(".added-manually:last-child")));
        System.out.println("last: " + driver.findElement(By.xpath("//button[contains(@class,'manually') and text() = 'Delete']")));
        driver.navigate().to("http://the-internet.herokuapp.com/challenging_dom");
        System.out.println("value is: " + driver.findElement(By.xpath("//td[text() = 'Apeirian9']//preceding-sibling::td")).getText());
        System.out.println("value is: " + driver.findElement(By.xpath("//td[text() = 'Apeirian9']//following-sibling::td")).getText());
        driver.quit();

    }
}
