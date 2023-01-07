package Pages;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selectors.*;
import static com.codeborne.selenide.Selenide.$;

public class CartPage {

    public SelenideElement
                firstName = $("#input-payment-firstname"),
                lastName = $("#input-payment-lastname"),
                company = $("#input-payment-company"),
                address1 = $("#input-payment-address-1"),
                address2 = $("#input-payment-address-2"),
                city = $("#input-payment-city"),
                post = $("#input-payment-postcode"),
                country = $("#input-payment-country"),
                state = $("#input-payment-zone"),
                continueBtn = $("#button-payment-address"),
                deliveryDetailscontinueBtn = $("#button-shipping-address"),
                deliveryMethodscontinueBtn = $("#button-shipping-method"),
                flatShipping1 = $(byXpath("//input[@name='shipping_method']/parent::label")),
                terms = $(byName("agree")),
                paymentMethodBtn = $("#button-payment-method"),
                subTotal1 = $(byXpath("//strong[text()='Sub-Total:']")).parent().sibling(0),
                subTotal2 = $(byText("Sub-Total")).parent().sibling(0),
                flatShipping2 = $(byXpath("//*[text()='Flat Shipping Rate:']")).parent().sibling(0),
                deliveryMethods = $(byXpath("//a[text()='Step 4: Delivery Method ']")),
                confirmOrder = $(byXpath("//a[text()='Step 6: Confirm Order ']")),
                total1 = $(byXpath("//strong[text()='Total:']")).parent().sibling(0),
                total2= $(byXpath("//strong[text()='Total']")).parent().sibling(0);
}
