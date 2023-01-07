package Steps;

import Pages.DesktopsPage;
import Pages.HomePage;
import com.codeborne.selenide.Condition;
import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.SelenideDriver;
import io.qameta.allure.Step;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import javax.swing.*;

public class DesktopSteps {

    HomePage homePage = new HomePage();
    DesktopsPage page = new DesktopsPage();

    @Step("go to desktops section")
    public DesktopSteps clickDesktops() {
        homePage.desktop.hover();
        homePage.showDesktops.shouldBe(Condition.visible);
        homePage.showDesktops.click();
        return this;
    }

    @Step("move to ipod shuffle")
    public DesktopSteps moveToMac() {
        page.mac.scrollIntoView(true);
        String actualToolTip = page.mac.getAttribute("title");
        String expectedToolTip = "MacBook Air";
        Assert.assertEquals(expectedToolTip,actualToolTip);
        return this;
    }

    @Step("click on ipod link")
    public DesktopSteps clickMac() {
        page.macLink.click();
        return this;
    }

    @Step("add to cart")
    public DesktopSteps addCart() {
        page.cart.click();
        return this;
    }

    @Step("check by count item was added ")

    public DesktopSteps checkAddedBycount() {
        page.items.shouldBe(Condition.text("1"));
        String countText = page.items.getText().substring(0,1);
        int count = Integer.parseInt(countText);
        if(count > 0) {
            Assert.assertTrue(true);
        } else {
            Assert.assertTrue(false,"item does not added");
        }
        return this;
    }

    @Step("check by price item was added")

    public DesktopSteps checkAddedByPrice() {
        String priceText = page.items.getText();
        int ind = priceText.indexOf("$");
        int ind2 = priceText.indexOf(",");
        String prevPrice;
        if(ind2 != -1) {
            String prevPrice1 = priceText.substring(ind + 1,ind2);
            String prevPrice2 = priceText.substring(ind2 + 1);
            prevPrice = prevPrice1 + prevPrice2;

        } else {
            prevPrice = priceText.substring(ind + 1);
        }
        double price = Double.parseDouble(prevPrice);
        if(price > 0) {
            Assert.assertTrue(true);
        } else {
            Assert.assertTrue(false,"item does not added");
        }
        return this;
    }
}
