package Steps;

import Models.Request.Serilization.Users;
import Models.Response.Deserilization.UsersDe;
import io.qameta.allure.Step;
import io.qameta.allure.restassured.AllureRestAssured;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.testng.Assert;

public class AuthorizationSteps {

    public Response response;
    public Users users;


    @Step("get response from reqres.in")
    public void getResponse() {
        users = new Users("morpheus", "leader");
        RequestSpecification request = RestAssured.given();
        request.filter(new AllureRestAssured());
        request.baseUri("https://reqres.in");
        request.contentType("application/json");
        request.body(users);
        response = request.post("/api/users");
    }

    @Step("validate responsebody all parameters by aserts")
    public void validateResponse() {
        UsersDe usersDe = response.getBody().as(UsersDe.class);
        Assert.assertEquals(usersDe.name(), users.name());
        Assert.assertEquals(usersDe.job(), users.job());
        int id = response.getBody().jsonPath().getInt("id");
        String createdAt = response.getBody().jsonPath().getString("createdAt");
        Assert.assertEquals(usersDe.id(), id);
        Assert.assertEquals(usersDe.createdAt(), createdAt);
    }
}
