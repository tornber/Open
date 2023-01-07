import Steps.*;
import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.logevents.SelenideLogger;
import io.qameta.allure.Description;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import io.qameta.allure.selenide.AllureSelenide;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.Assert;
import org.testng.annotations.*;

import static com.codeborne.selenide.Configuration.savePageSource;
import static com.codeborne.selenide.Selenide.*;

@Listeners({TestAllureListener.class})

@Epic("testing technical items shop")
@Feature("check sort and ordering")
public class TestMethods {
    HomeSteps homeSteps = new HomeSteps();
    RegisterSteps registerSteps = new RegisterSteps();
    LeptopSteps leptopSteps = new LeptopSteps();
    DesktopSteps desktopSteps = new DesktopSteps();
    CartSteps cartSteps = new CartSteps();


    @BeforeMethod
    @Story("init things")
    public void setUp() {
        SelenideLogger.addListener("AllureSelenide",new AllureSelenide().screenshots(true).savePageSource(false));
        Configuration.timeout = 7000;
        ChromeOptions options = new ChromeOptions();
        options.addArguments("start-maximized");
        Configuration.browserCapabilities = options;
        Configuration.browserSize = null;
        Configuration.holdBrowserOpen = true;
        open("http://tutorialsninja.com/demo/");
    }

    @Test(description = "register on page")
    @Description("i will register with driven data from database")
    @Story("register method")
    public void register() {
        homeSteps.accountClick()
                .registerClick();
        registerSteps.generateData()
                .fillName()
                .fillLastName()
                .fillEmail()
                .fillPhone()
                .fillPassword()
                .ConfirmPassword()
                .acceptPolicy()
                .submit();
    }

    @Test(description = "checking laptops page sorted",groups = {"Regression1"})
    @Description("i will go to laptops section and check sort hight > low")
    @Story("checking sort")
    public void checkLaptopsSort() {
        leptopSteps.laptopsClick()
                .sorting()
                .checkSort();
    }

    @Test(description = "i will buy one item here",dependsOnMethods = {"register"},groups = {"Regression2"})
    @Description("i will check cart system,i will add to cart and next if it will be added by its count and price ")
    @Story("buying an item")
    public void buyItem() {
        desktopSteps.clickDesktops()
                .moveToMac()
                .clickMac()
                .addCart()
                .checkAddedBycount()
                .checkAddedByPrice();
    }

    @Test(description = "checkout order",retryAnalyzer = Retry.class,dependsOnMethods = {"register","buyItem"},groups = {"Regression2"})
    @Description("i will check billing details,payment method,delivery here")
    @Story("check ordering")
    public void checkBilling() {
        cartSteps.clickCheckout()
                .fillName()
                .fillLastName()
                .fillCompany()
                .fillAddress1()
                .fillAddress2()
                .fillCity()
                .fillPostCode()
                .selectCountry()
                .selectState()
                .clickContinue()
                .clickDeliveryDetailsContinue()
                .clickDeliveryMethodsContinue()
                .termsClick()
                .clickPaymentMethodsContinue()
                .checkSubTotal()
                .checkFlatShipping()
                .checkTotal();
        Assert.fail();
    }

}
