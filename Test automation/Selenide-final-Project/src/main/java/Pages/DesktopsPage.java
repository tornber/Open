package Pages;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selectors.*;
import static com.codeborne.selenide.Selenide.$;

public class DesktopsPage {

    public SelenideElement
            mac = $(byTitle("MacBook Air")),
            macLink = $(byXpath("//a[text()='MacBook Air']")),
            cart = $("#button-cart"),
            items = $("#cart-total"),
            checkout = $("strong .fa-share");


}
