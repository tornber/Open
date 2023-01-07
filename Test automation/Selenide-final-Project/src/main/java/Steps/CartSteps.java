package Steps;

import Data.GetData;
import Pages.CartPage;
import Pages.DesktopsPage;
import com.codeborne.selenide.Condition;
import io.qameta.allure.Step;
import org.testng.Assert;

import static com.codeborne.selenide.Selenide.executeJavaScript;

public class CartSteps {

    DesktopsPage desktopsPage = new DesktopsPage();
    CartPage page = new CartPage();
    GetData data = new GetData();
    @Step("go for checkout")
    public CartSteps clickCheckout() {
        desktopsPage.items.click();
        desktopsPage.checkout.click();
        return this;
    }

    @Step("input name")
    public CartSteps fillName() {
        page.firstName.sendKeys(data.name);
        return this;
    }

    @Step("input lastName")
    public CartSteps fillLastName() {
        page.lastName.sendKeys(data.lastName);
        return this;
    }

    @Step("input company")
    public CartSteps fillCompany() {
        page.company.sendKeys("tbc-it-academy");
        return this;
    }

    @Step("input address 1")
    public CartSteps fillAddress1() {
        page.address1.sendKeys(data.address);
        return this;
    }

    @Step("input address 2")
    public CartSteps fillAddress2() {
        page.address2.sendKeys(data.address);
        return this;
    }


    @Step("input city")
    public CartSteps fillCity() {
        page.city.sendKeys(data.city);
        return this;
    }

    @Step("input post code")
    public CartSteps fillPostCode() {
        page.post.sendKeys("995");
        return this;
    }

    @Step("select country georgea")
    public CartSteps selectCountry() {
        page.country.selectOption(data.country);
        return this;
    }

    @Step("Selecting State tbilisi")
    public CartSteps selectState() {
        page.state.selectOption(data.state);
        return this;
    }

    @Step("click continue btn")
    public CartSteps clickContinue() {
        page.continueBtn.click();
        return this;
    }

    @Step("click on delivery details continue btn")
    public CartSteps clickDeliveryDetailsContinue() {
        page.deliveryDetailscontinueBtn.click();
        return this;
    }

    @Step("click on delivery methods continue btn")
    public CartSteps clickDeliveryMethodsContinue() {
        page.deliveryDetailscontinueBtn.should(Condition.visible);
        page.deliveryMethodscontinueBtn.click();
        return this;
    }

    @Step(" payment methods conditions and terms click")
    public CartSteps termsClick() {
        page.terms.shouldBe(Condition.visible);
        page.terms.click();
        return this;
    }

    @Step("click on payment methods continue btn")
    public CartSteps clickPaymentMethodsContinue() {
        page.paymentMethodBtn.click();
        return this;
    }

    @Step("check subtotal is correct")
    public CartSteps checkSubTotal() {
        page.subTotal1.should(Condition.exist);
        String text1  = page.subTotal1.text();
        int Firstind = text1.indexOf("$");
        int Firstind2 = text1.indexOf(",");
        String FirstprevSubTotal;
        if(Firstind2 != -1) {
            String FirstprevSubTotal1 = text1.substring(Firstind + 1,Firstind2);
            String FirstprevSubTotal2 = text1.substring(Firstind2 + 1);
            FirstprevSubTotal = FirstprevSubTotal1 + FirstprevSubTotal2;

        } else {
            FirstprevSubTotal = text1.substring(Firstind + 1);
        }
        double subTotal1 = Double.parseDouble(FirstprevSubTotal);


        String text2  = page.subTotal2.getOwnText();
        int Secondind = text2.indexOf("$");
        int Secondind2 = text2.indexOf(",");
        String SecondprevSubTotal;
        if(Secondind2 != -1) {
            String SecondPrevSubTotal1 = text2.substring(Secondind + 1,Secondind2);
            String SecondprevSubTotal2 = text2.substring(Secondind2 + 1);
            SecondprevSubTotal = SecondPrevSubTotal1 + SecondprevSubTotal2;

        } else {
            SecondprevSubTotal = text2.substring(Secondind + 1);
        }
        double subTotal2 = Double.parseDouble(SecondprevSubTotal);

        Assert.assertEquals(subTotal1,subTotal2);
        return this;
    }

    @Step("check flat shipping rate is correct")
    public CartSteps checkFlatShipping() {
        String text1  = page.flatShipping2.text();
        int Firstind = text1.indexOf("$");
        String FirstprevFlatShipping = text1.substring(Firstind + 1);
        double FlatShipping1 = Double.parseDouble(FirstprevFlatShipping);

        page.deliveryMethods.click();
        page.flatShipping1.shouldBe(Condition.visible);
        String text2  = page.flatShipping1.text();
        int Secondind = text2.indexOf("$");
        String SecondprevFlatShipping = text2.substring(Secondind + 1);
        double FlatShipping2 = Double.parseDouble(SecondprevFlatShipping);

        Assert.assertEquals(FlatShipping1,FlatShipping2);
        return this;
    }

    @Step("check total is correct")
    public CartSteps checkTotal() {
        page.confirmOrder.click();
        page.total1.should(Condition.exist);
        String text1  = page.total1.getOwnText();
        int Firstind = text1.indexOf("$");
        int Firstind2 = text1.indexOf(",");
        String FirstprevTotal;
        if(Firstind2 != -1) {
            String FirstprevTotal1 = text1.substring(Firstind + 1,Firstind2);
            String FirstprevTotal2 = text1.substring(Firstind2 + 1);
            FirstprevTotal = FirstprevTotal1 + FirstprevTotal2;

        } else {
            FirstprevTotal = text1.substring(Firstind + 1);
        }
        double total1 = Double.parseDouble(FirstprevTotal);


        String text2  = page.total2.getOwnText();
        int Secondind = text2.indexOf("$");
        int Secondind2 = text2.indexOf(",");
        String SecondprevTotal;
        if(Secondind2 != -1) {
            String SecondPrevTotal1 = text2.substring(Secondind + 1,Secondind2);
            String SecondprevTotal2 = text2.substring(Secondind2 + 1);
            SecondprevTotal = SecondPrevTotal1 + SecondprevTotal2;

        } else {
            SecondprevTotal = text2.substring(Secondind + 1);
        }
        double total2 = Double.parseDouble(SecondprevTotal);

        Assert.assertEquals(total1,total2);
        return this;
    }


}
