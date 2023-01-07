import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.testng.annotations.Test;

import java.util.List;
import java.util.concurrent.TimeUnit;

public class WebFormsTest {


    @Test

    public void Homework() {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
//        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);


        driver.navigate().to("http://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html ");
        WebElement dropDownElement = driver.findElement(By.id("dropdowm-menu-1"));
        Select dropDown = new Select(dropDownElement);
        dropDown.selectByValue("c#");
        dropDownElement.isSelected();
        List <WebElement> checkBoxElements = driver.findElements(By.cssSelector("#checkboxes label input"));
        for(int i = 0;i < 4;i++) {
            if(!checkBoxElements.get(i).isSelected()) {
                checkBoxElements.get(i).click();
            }
        }
        WebElement yellowButton = driver.findElement(By.cssSelector("#radio-buttons input[value='yellow']"));
        yellowButton.click();
        WebElement fruitsDropdown = driver.findElement(By.cssSelector("#fruit-selects option[value='orange']"));
        boolean isEnabled = fruitsDropdown.isEnabled();
        if(isEnabled) {
            System.out.println("its enabled");
        } else {
            System.out.println("its disabled");
        }

    }

}
