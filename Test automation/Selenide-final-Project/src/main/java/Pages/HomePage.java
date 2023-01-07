package Pages;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;

public class HomePage {

    public SelenideElement
            myAccount = $(".fa.fa-user"),
            register = $(byText("Register")),
            laptops = $(byText("Laptops & Notebooks")),
            showLeptops = $(byText("Show All Laptops & Notebooks")),
            desktop = $(byText("Desktops")),
            showDesktops = $(byText("Show All Desktops"));


}
