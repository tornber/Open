import java.io.FileInputStream;
import java.io.IOException;
import java.sql.*;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.SelenideElement;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.*;
import org.testng.asserts.SoftAssert;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.open;

public class ddf {

    WebDriver driver;
    int randomId = (int) (Math.random() * 1000);

//    public ddf() {
//        WebDriverManager.chromedriver().setup();
//        driver = new ChromeDriver();
//        driver.manage().window().maximize();
//    }

//    @Test
//    public void Register() throws SQLException {
//        String query = "select * from [students].[dbo].[students]";
//        try (Connection conn = dbConnect.getConnection();
//        Statement statement = conn.createStatement();
//        ResultSet rs = statement.executeQuery(query)) {
//            while (rs.next()) {
//                String name = rs.getString("firstName");
//                String lastName = rs.getString("lastName");
//                String mobile = rs.getString("phone");
//                JavascriptExecutor js = (JavascriptExecutor) driver;
//                driver.get("https://demoqa.com/automation-practice-form");
//                WebElement Name = driver.findElement(By.id("firstName"));
//                Name.sendKeys(name);
//                WebElement LastName = driver.findElement(By.id("lastName"));
//                LastName.sendKeys(lastName);
//                WebElement Gender = driver.findElement(By.name("gender"));
//                String GenderText = Gender.getText();
//                if (Gender.getCssValue("value").equalsIgnoreCase(GenderText)) {
//                    js.executeScript("arguments[0].click()", Gender);
//                }
//                js.executeScript("arguments[0].click()", Gender);
//                WebElement Mobile = driver.findElement(By.id("userNumber"));
//                Mobile.sendKeys(mobile);
//                WebElement submit = driver.findElement(By.id("submit"));
//                js.executeScript("arguments[0].click()", submit);
//                WebElement studentName = driver.findElement(By.xpath("//td[text()='Student Name']/following-sibling::td"));
//                String nameAndLastName= String.format("%1$s %2$s",name,lastName);
//                SoftAssert softAssert = new SoftAssert();
//                softAssert.assertEquals(studentName.getText(), nameAndLastName);
//                softAssert.assertAll();
//            }
//        } catch (SQLException e) {
//            System.out.println(e.getMessage());
//        }
//    }


    @Test

    public void insertAndValidate() throws SQLException {
        int id = dbInsert.insertData(randomId,"giorgi","sulakauri","55158185185",false);
        String sqlCheckExist = String.format("select * from [students].[dbo].[students] where id=%s",id);
        checkingData.checkData(id,"","id",sqlCheckExist);

    }


    @Test

    public void validateAndUpdate() throws SQLException {
        int nextId = dbInsert.insertData(randomId,"george","sulakauri","55158185185",true);
        String validatesql = String.format("select * from [students].[dbo].[students] where id=%s",nextId);
        checkingData.checkData(nextId,"","id",validatesql);
        String name = "george";
        checkingData.checkData(0,name,"firstName",validatesql);
        String lastName = "sulakauri";
        checkingData.checkData(0,lastName,"lastName",validatesql);
        String phone = "55158185185";
        checkingData.checkData(0,phone,"phone",validatesql);

        String sqlQuery = String.format("update [students].[dbo].[students] set firstName=? where id=%s",nextId);
        String updatedName = "hipokrate";
        updateDB.update(0,updatedName,sqlQuery);
//        String validateLastRecord = "select ident_current('students')";
        checkingData.checkData(0,updatedName,"firstName",validatesql);
    }

//    @AfterMethod
//    public void tearDown() {
//        driver.quit();
//    }





}
