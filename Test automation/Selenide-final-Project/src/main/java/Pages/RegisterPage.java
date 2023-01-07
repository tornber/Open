package Pages;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selectors.byClassName;
import static com.codeborne.selenide.Selectors.byName;
import static com.codeborne.selenide.Selenide.$;

public class RegisterPage {

    public SelenideElement
            firstName = $("#input-firstname"),
            lastName= $("#input-lastname"),
            email = $("#input-email"),
            telephone = $("#input-telephone"),
            password = $("#input-password"),
            confirmPass = $("#input-confirm"),
            acceptPolicy = $(byName("agree")),
            continueBtn = $(byClassName("btn-primary"));

}
