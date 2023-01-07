package Pages;

import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import static com.codeborne.selenide.Selectors.byXpath;
import static com.codeborne.selenide.Selenide.$;

public class FormsPage {

//    public SelenideElement
//                practiseForm = $(byXpath("//span[text()='Practice Form']")),
//                firstName = $("#firstName"),
//                lastName = $("#lastName"),
//                gender = $(byXpath("//input[@value='Male']")),
//                mobile = $("#userNumber"),
//                submitBtn = $("#submit"),
//                textAfterSubmit = $("#example-modal-sizes-title-lg"),
//                studentName = $(byXpath("//td[text()='Student Name']//following-sibling::td")),
//                studentGender = $(byXpath("//td[text()='Gender']//following-sibling::td")),
//                studentMobile = $(byXpath("//td[text()='Mobile']//following-sibling::td"));

    private WebDriver driver;

    @FindBy(how= How.XPATH,using = "//span[text()='Practice Form']")
    public WebElement practiseForm;

    @FindBy(id = "firstName")
    public WebElement firstName;

    @FindBy(id = "lastName")
    public WebElement lastName;

    @FindBy(xpath = "//input[@value='Male']")
    public WebElement gender;

    @FindBy(id = "userNumber")
    public WebElement mobile;

    public FormsPage(WebDriver ADriver) {
        this.driver = ADriver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver,30),this);
    }


}
