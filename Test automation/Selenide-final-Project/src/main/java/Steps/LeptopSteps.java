package Steps;

import Pages.HomePage;
import Pages.LaptopsPage;
import com.codeborne.selenide.Condition;
import com.codeborne.selenide.ElementsCollection;
import io.qameta.allure.Step;
import org.openqa.selenium.support.ui.Wait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.lang.reflect.Array;

public class LeptopSteps {

    HomePage homePage = new HomePage();
    LaptopsPage page = new LaptopsPage();

    @Step("i am gonna click on laptops section")
    public LeptopSteps laptopsClick() {
        homePage.laptops.hover();
        homePage.showLeptops.shouldBe(Condition.visible);
        homePage.showLeptops.click();
        return this;
    }

    @Step("sorting by hight > low here")
    public LeptopSteps sorting() {
        page.sortByPrice.click();
        return this;
    }

    @Step("check sorting hight > low here")
    public LeptopSteps checkSort() {
        for (int i = 0; i < page.prices.size() - 1; i++) {
            String firstText = page.prices.get(i).getText();
            int firstInd = firstText.indexOf("$");
            int firstInd2 = firstText.indexOf(",");
            int firstInd3 = firstText.indexOf("E");
            String firstPrevNum;
            if (firstInd2 != -1) {
                String prevNum1 = firstText.substring(firstInd + 1, firstInd2);
                String prevNum2 = firstText.substring(firstInd2 + 1,firstInd3);
                firstPrevNum = prevNum1 + prevNum2;

            } else {
                firstPrevNum = firstText.substring(firstInd + 1,firstInd3);
            }
            double firstNum = Double.parseDouble(firstPrevNum);
            String secondText = page.prices.get(i + 1).getText();
            int secondInd = secondText.indexOf("$");
            int secondInd2 = secondText.indexOf(",");
            int secondInd3 = secondText.indexOf("E");
            String secondPrevNum;
            if (secondInd2 != -1) {
                String prevNum1 = secondText.substring(secondInd + 1, secondInd2);
                String prevNum2 = secondText.substring(secondInd2 + 1,secondInd3);
                secondPrevNum = prevNum1 + prevNum2;

            } else {
                secondPrevNum = secondText.substring(secondInd + 1,secondInd3);
            }
            double secondNum = Double.parseDouble(secondPrevNum);

            if(firstNum >= secondNum) {
                Assert.assertTrue(true);
            } else {
                Assert.assertTrue(false,"not good sorted");
            }

        }
        return this;
    }

}


