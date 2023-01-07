import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.*;

import javax.swing.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class finalProjectTest {

    WebDriver driver;

    @BeforeTest
    @Parameters("browser")

    public void setup(@Optional String browser) {
        if (browser.equalsIgnoreCase("edge")) {
        WebDriverManager.edgedriver().setup();
        driver = new EdgeDriver();
        driver.manage().window().maximize();
        } else if (browser.equalsIgnoreCase("chrome")) {
            WebDriverManager.chromedriver().setup();
            driver = new ChromeDriver();
            driver.manage().window().maximize();
        }
        else {
            System.out.println("no browsers found");
        }
    }


    @Test

    public void register() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        driver.navigate().to("http://tutorialsninja.com/demo/");
        WebElement myAccount = driver.findElement(By.className("fa-user"));
        myAccount.click();
        WebElement register = driver.findElement(By.xpath("//a[text()='Register']"));
        register.click();
        js.executeScript("window.scrollBy(0,300)");
        WebElement firstName = driver.findElement(By.cssSelector("input[name='firstname']"));
        firstName.sendKeys("test");
        WebElement lastName = driver.findElement(By.id("input-lastname"));
        lastName.sendKeys("test");
        WebElement email = driver.findElement(By.xpath("//input[@placeholder='E-Mail' and @class='form-control']"));
        email.sendKeys("torniketest@gmail.com");
        WebElement telephone = driver.findElement(By.cssSelector("#input-telephone"));
        telephone.sendKeys("test");
        WebElement password = driver.findElement(By.xpath("//*[contains(@name,'pass')]"));
        password.sendKeys("secretpassword");
        WebElement confirmPassword = driver.findElement(By.name("confirm"));
        confirmPassword.sendKeys("secretpassword");
        WebElement subscribe = driver.findElement(By.xpath("//*[@class='radio-inline']/input[@value='1']"));
        js.executeScript("arguments[0].checked=true",subscribe);
        WebElement agree = driver.findElement(By.cssSelector("input[name='agree']"));
        agree.click();
        WebElement continueElement = driver.findElement(By.cssSelector(".btn-primary:empty"));
        continueElement.click();
    }

    @Test

    public void task2() {
        Actions action = new Actions(driver);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.location= 'http://tutorialsninja.com/demo/index.php?route=product/category&path=24' ");
        WebElement phones = driver.findElement(By.cssSelector("a[href$='path=24']"));
        phones.click();
        WebElement telephone = driver.findElement(By.xpath("//img[@title='Palm Treo Pro']"));
        action.moveToElement(telephone).perform();
        String expectedValue = "Palm Treo Pro";
        String actualValue =  telephone.getAttribute("title");
        if(expectedValue.equalsIgnoreCase(actualValue)) {
            System.out.println("test passed.. tooltip is: " + actualValue);
        } else {
            System.out.println("its not same,here is tooltip: " + actualValue);
        }
        WebElement palmTreoPhone = driver.findElement(By.xpath("//img[@alt='Palm Treo Pro']"));
        palmTreoPhone.click();
    }

    @Test

    public void task3() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.location= 'http://tutorialsninja.com/demo/index.php?route=product/product&path=24&product_id=29'");
        WebDriverWait wait = new WebDriverWait(driver,5);
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(".thumbnails li:first-child")));
        WebElement phoneImage = driver.findElement(By.cssSelector(".thumbnails li:first-child"));
        phoneImage.click();
        WebElement text = driver.findElement(By.className("mfp-counter"));
        String expectedText = "3 of 3";
        String actualText = js.executeScript("return document.getElementsByClassName('mfp-counter')[0].innerHTML").toString();
        while(!expectedText.equalsIgnoreCase(actualText)) {
            WebElement image = driver.findElement(By.className("mfp-img"));
            wait.until(ExpectedConditions.elementToBeClickable(image));
            image.click();
            actualText = js.executeScript("return document.getElementsByClassName('mfp-counter')[0].innerHTML").toString();
        }
        WebElement close = driver.findElement(By.className("mfp-close"));
        close.click();
        WebElement review = driver.findElement(By.xpath("//a[starts-with(text(),'Write')]"));
        review.click();
        WebElement name = driver.findElement(By.id("input-name"));
        name.sendKeys("test");
        WebElement Writereview = driver.findElement(By.id("input-review"));
        Writereview.sendKeys("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        WebElement rating = driver.findElement(By.xpath("//input[@name='rating'][@value='3']"));
        rating.click();
//        WebElement form = driver.findElement(By.id("form-review"));
//        form.submit();
        WebElement submit = driver.findElement(By.id("button-review"));
        submit.click();
        WebElement addToCart = driver.findElement(By.id("button-cart"));
        addToCart.click();
        WebElement shoppingCart = driver.findElement(By.xpath("//span[text()='Shopping Cart']"));
        shoppingCart.click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[@class='input-group btn-block']/input")));
        WebElement quantity = driver.findElement(By.xpath("//div[@class='input-group btn-block']/input"));
        String expectedQuantity = quantity.getAttribute("value").toString();
        WebElement total = driver.findElement(By.xpath("//strong[text()='Total']/parent::td/following-sibling::td"));
        String expectedTotal = js.executeScript("return arguments[0].innerHTML",total).toString();
        WebElement item = driver.findElement(By.id("cart-total"));
        String actualTotal = item.getText().substring(12);
        String actualQuantity = item.getText().substring(0,1);
        if(expectedQuantity.equalsIgnoreCase(actualQuantity)) {
            System.out.println("quantity is same");
            if(expectedTotal.equalsIgnoreCase(actualTotal)) {
                System.out.println("total price is also same,product was succesfully added");
            } else {
                System.out.println("quantity is same,but total price is not");
            }
        } else {
            System.out.println("quantity is not same");
        }
        item.click();
        WebElement checkout = driver.findElement(By.xpath("//i[@class='fa fa-share']/parent::strong"));
        checkout.click();
    }

    @Test

    public void task4() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.location= 'http://tutorialsninja.com/demo/index.php?route=checkout/checkout'");
        WebDriverWait wait = new WebDriverWait(driver,5);
        wait.until(ExpectedConditions.elementToBeClickable(By.id("input-email")));
        WebElement email = driver.findElement(By.id("input-email"));
        email.sendKeys("torniketest@gmail.com");
        WebElement password = driver.findElement(By.id("input-password"));
        password.sendKeys("secretpassword");
        WebElement login = driver.findElement(By.id("button-login"));
        login.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("input[value='new']")));
        WebElement newAddress = driver.findElement(By.cssSelector("input[value='new']"));
        newAddress.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.id("button-payment-address")));
        WebElement prolong1 = driver.findElement(By.id("button-payment-address"));
        js.executeScript("arguments[0].scrollIntoView()",prolong1);
        WebElement firstName = driver.findElement(By.name("firstname"));
        firstName.sendKeys("test");
        WebElement lastName = driver.findElement(By.name("lastname"));
        lastName.sendKeys("test");
        WebElement company = driver.findElement(By.name("company"));
        company.sendKeys("test");
        WebElement address1 = driver.findElement(By.name("address_1"));
        address1.sendKeys("test");
        WebElement address2 = driver.findElement(By.name("address_2"));
        address2.sendKeys("test");
        WebElement city = driver.findElement(By.name("city"));
        city.sendKeys("test");
        WebElement postcode = driver.findElement(By.name("postcode"));
        postcode.sendKeys("1234");
        WebElement country = driver.findElement(By.xpath("//select[@name='country_id']/option[@value='80']"));
        country.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//select[@id='input-payment-zone']//option[@value='1244']")));
        WebElement paymentcity = driver.findElement(By.xpath("//select[@id='input-payment-zone']//option[@value='1244']"));
        paymentcity.click();
//        wait.until(ExpectedConditions.elementToBeClickable(By.id("button-payment-address")));
//        WebElement prolong1 = driver.findElement(By.id("button-payment-address"));
        prolong1.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.id("button-shipping-address")));
        WebElement prolong2 = driver.findElement(By.id("button-shipping-address"));
        prolong2.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//input[@name='shipping_method']/parent::label")));
        WebElement shipping = driver.findElement(By.xpath("//input[@name='shipping_method']/parent::label"));
        String flatShipping = shipping.getText().substring(21);
        wait.until(ExpectedConditions.elementToBeClickable(By.id("button-shipping-method")));
        WebElement prolong3 = driver.findElement(By.id("button-shipping-method"));
        prolong3.click();
        wait.until(ExpectedConditions.elementToBeClickable(By.name("agree")));
        WebElement terms = driver.findElement(By.name("agree"));
        js.executeScript("arguments[0].checked=true",terms);
        WebElement prolong4 = driver.findElement(By.id("button-payment-method"));
        prolong4.click();
        WebElement cartTotal = driver.findElement(By.id("cart-total"));
        cartTotal.click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//strong[text()='Sub-Total']/parent::td/following-sibling::td")));
        WebElement subTotal1 = driver.findElement(By.xpath("//strong[text()='Sub-Total']/parent::td/following-sibling::td"));
        WebElement total1 = driver.findElement(By.xpath("//strong[text()='Total']/parent::td/following-sibling::td"));
        String FirstsubTotalprice = subTotal1.getText().toString();
        String firsttotalprice = total1.getText().toString();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[text()='Sub-Total:']/parent::td/following-sibling::td")));
        WebElement subTotal2 = driver.findElement(By.xpath("//*[text()='Sub-Total:']/parent::td/following-sibling::td"));
        WebElement total2 = driver.findElement(By.xpath("//*[text()='Total:']/parent::td/following-sibling::td"));
        String LastsubTotalprice = subTotal2.getText().toString();
        String lasttotalprice = total2.getText().toString();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//strong[text()='Flat Shipping Rate:']/parent::td/following-sibling::td")));
        WebElement anotherShipping = driver.findElement(By.xpath("//strong[text()='Flat Shipping Rate:']/parent::td/following-sibling::td"));
        String anotherFlatShipping = anotherShipping.getText().toString();
        if(FirstsubTotalprice.equalsIgnoreCase(LastsubTotalprice)) {
            System.out.println("subtotal is same");
        } else {
            System.out.println("subtotal is not same");
        }
        if(firsttotalprice.equalsIgnoreCase(lasttotalprice)) {
            System.out.println("total is same");
        } else {
            System.out.println("total is not same");
        }
        if(flatShipping.equalsIgnoreCase(anotherFlatShipping)) {
            System.out.println("flat shipping is same");
        } else {
            System.out.println("flat shipping is not same");
        }
        WebElement confirm = driver.findElement(By.cssSelector("input[value='Confirm Order']"));
        confirm.click();
        WebElement account = driver.findElement(By.className("fa-user"));
        account.click();
        WebElement history = driver.findElement(By.cssSelector("a[href$='order']"));
        history.click();
    }

    @Test

    public void  task5() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.location= 'http://tutorialsninja.com/demo/index.php?route=account/order'");
        WebElement status = driver.findElement(By.xpath("//*[text()='Status']/parent::tr/parent::thead/following-sibling::tbody/tr/td[@class='text-left'][2]"));
        String statusText = status.getText().toString();
        String expectedstatusText = "Pending";
        if(expectedstatusText.equalsIgnoreCase(statusText)) {
            System.out.println("its pending condition");
        } else {
            System.out.println("its not pending condition");
        }
        WebElement dateElement = driver.findElement(By.xpath("//*[text()='Status']/parent::tr/parent::thead/following-sibling::tbody/tr/td[@class='text-left'][3]"));
        String dateText = dateElement.getText().toString();
        Date dateObject = new Date();
        SimpleDateFormat ft = new SimpleDateFormat ("dd/MM/yyyy");
        String date = ft.format(dateObject).toString();
        if(dateText.equals(date)) {
            System.out.println("its same date");
        } else {
            System.out.println("its not same date");
        }
        driver.quit();
    }

}
