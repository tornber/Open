package Steps;

import Pages.NavigatorPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import io.qameta.allure.Severity;
import io.qameta.allure.SeverityLevel;
import io.qameta.allure.Step;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.annotations.*;

import static com.codeborne.selenide.Selenide.*;

public class NavigatorSteps {

//    private WebDriver driver;
//    public NavigatorSteps(WebDriver Adriver) {
//        this.driver = Adriver;
//        PageFactory.initElements(new AjaxElementLocatorFactory(driver,30),this);
//    }

    Config config = new Config();
    public String url = "https://demoqa.com/";
    private WebDriver driver = config.setup(url);
    NavigatorPage navigatorPage = new NavigatorPage(driver);

    @Step
    public NavigatorSteps navigateToForms() {
        navigatorPage.forms.click();
        config.tearDown(driver);
        return this;
    }
}
