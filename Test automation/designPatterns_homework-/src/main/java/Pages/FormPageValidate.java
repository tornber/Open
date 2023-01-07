package Pages;

import Steps.Config;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

public class FormPageValidate {

    public WebDriver driver;

//    @FindBy(id = "submit")
//    public WebElement submitBtn;
    public By submitBtn = By.id("submit");

//    @FindBy(id = "example-modal-sizes-title-lg")
//    public WebElement textAfterSubmit;
    public By textAfterSubmit = By.xpath("//div[text()='Thanks for submitting the form']");

//    @FindBy(xpath = "//td[text()='Student Name']//following-sibling::td")
//    public WebElement studentName;
    public By studentName = By.xpath("//td[text()='Student Name']//following-sibling::td");

//    @FindBy(xpath = "//td[text()='Gender']//following-sibling::td")
//    public WebElement studentGender;
    public By studentGender = By.xpath("//td[text()='Gender']//following-sibling::td");

//    @FindBy(xpath = "//td[text()='Mobile']//following-sibling::td")
//    public WebElement studentMobile;
    public By studentMobile = By.xpath("//td[text()='Mobile']//following-sibling::td");

    public FormPageValidate(WebDriver Adriver) {
        this.driver = Adriver;
    }
}
