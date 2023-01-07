import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import java.util.concurrent.TimeUnit;

public class CrossBrowserTest {

    WebDriver driver;

    @BeforeTest
    @Parameters("browser")

    public void setup(@Optional String browser) {
    if (browser.equalsIgnoreCase("firefox")) {
        System.setProperty("webdriver.chrome.driver","src/main/resources/chromedriver.exe");
        WebDriverManager.edgedriver().setup();
        driver = new EdgeDriver();
    } else if (browser.equalsIgnoreCase("chrome")) {
        System.setProperty("webdriver.edge.driver","src/main/resources/MicrosoftWebDriver.exe");
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }
        else {
        System.out.println("no browsers found");
    }
        driver.manage().timeouts().implicitlyWait(10,TimeUnit.SECONDS);
    }

    @Test

    public void task1() {
        driver.navigate().to("https://classroom.google.com/u/0/c/NDQxMDQyNjczODcy/a/NDUwMDY4NDcxNjYw/details");
        driver.quit();
    }

}
