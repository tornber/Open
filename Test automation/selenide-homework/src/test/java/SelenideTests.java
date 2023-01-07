import com.codeborne.selenide.*;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.Test;
import static com.codeborne.selenide.CollectionCondition.texts;
import static com.codeborne.selenide.Condition.*;
import static com.codeborne.selenide.Configuration.*;
import static com.codeborne.selenide.Selectors.*;
import static com.codeborne.selenide.Selenide.*;

public class SelenideTests {

    public SelenideTests() {
        baseUrl = "http://the-internet.herokuapp.com";
        ChromeOptions options = new ChromeOptions();
        options.addArguments("start-maximized");
        Configuration.browserCapabilities = options;
        Configuration.browserSize = null;
    }

    @Test

    public void checkboxes() {
        open("/checkboxes");
        $("#checkboxes input:first-child").setSelected(true);
        $("#checkboxes input:last-child").setSelected(false);
        $("#checkboxes input:first-child").shouldHave(type("checkbox"));
        $("#checkboxes input:last-child").shouldHave(type("checkbox"));
    }

    @Test

    public void dropdown() {
        open("/dropdown");
        $("#dropdown").getSelectedOption().shouldHave(text("Please select an option"));
        $("#dropdown").selectOption("Option 2");
        $("#dropdown").getSelectedOption().shouldHave(value("2"),text("Option 2"));
    }

    @Test

    public void textBoxes() {
        baseUrl = "https://demoqa.com";
        open("/text-box");
        $(by("id","userName")).setValue("tornike");
        $(byXpath("//input[@type='email']")).setValue("tornike@gmail.com");
        $(byCssSelector("textarea#currentAddress")).setValue("new-york");
        $("textarea#permanentAddress").setValue("tbilisi");
        $(byText("Submit")).click();
        ElementsCollection collection = $$("#output .border p");
        collection.shouldHave(texts("tornike","tornike@gmail.com","new-york","tbilisi"));
    }


}
