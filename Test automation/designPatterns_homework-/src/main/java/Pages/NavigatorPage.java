package Pages;

import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;

public class NavigatorPage {

//    public SelenideElement forms = $(byText("Forms"));

    private WebDriver driver;

    @FindBy(xpath = "//*[text()='Forms']")
    public WebElement forms;

    public NavigatorPage(WebDriver Adriver) {
        this.driver = Adriver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver,30),this);
    }


//    public By form = By.xpath("//*[text()='Forms']");



}
