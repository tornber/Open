import Models.Request.Serilization.Users;
import Models.Response.Deserilization.UsersDe;
import Steps.AuthorizationSteps;
import io.qameta.allure.*;
import io.restassured.RestAssured;
import io.restassured.mapper.ObjectMapper;
import io.restassured.response.Response;
import io.restassured.response.ResponseBody;
import io.restassured.specification.RequestSpecification;
import org.testng.Assert;
import org.testng.annotations.Test;

@Epic("Rest assured testsall")
public class SerialaizeTest {

//    @Test
//
//    public void test1() {
//        Authentication auth = new Authentication();
//        auth.setEmail("eve.holt@reqres.in");
//        auth.setPassword("pistol");
//        RequestSpecification request = RestAssured.given();
//        request.contentType("application/json");
//        request.body(auth);
//        Response response = request.post("https://reqres.in/api/register");
//        ResponseBody ResponseBody = response.getBody();
//
//        if(response.statusCode() == 200) {
//            Successful body = ResponseBody.as(Successful.class);
//            System.out.println(body.getToken());
//            Assert.assertEquals(body.getId(),"4");
//            Assert.assertEquals(body.getToken(),"QpwL5tke4Pnpja7X4");
//
//        }
//
//    }
//
//    @Test
//    public void test2() {
//        Authentication auth = new Authentication();
//        auth.setEmail("sydney@fife");
//        RequestSpecification request = RestAssured.given();
//        request.baseUri("https://reqres.in");
//        request.contentType("application/json");
//        request.body(auth);
//        Response response = request.post("/api/register");
//        ResponseBody ResponseBody = response.getBody();
//        if(response.statusCode() == 400) {
//            Unsuccessful body = ResponseBody.as(Unsuccessful.class);
//            System.out.println(body.getError());
//            Assert.assertEquals(body.getError(),"Missing password");
//        }
//    }
//
//    @Test
//    public void test3() {
//        Post post = new Post();
//        post.setName("morpheus");
//        post.setJob("leader");
//        RequestSpecification request = RestAssured.given();
//        request.baseUri("https://reqres.in");
//        request.contentType("application/json");
//        request.body(post);
//        Response response = request.post("/api/users");
//        ResponseBody ResponseBody = response.getBody();
//        System.out.println(ResponseBody.asString());
//        Post body = ResponseBody.as(Post.class);
//    }

    AuthorizationSteps steps = new AuthorizationSteps();

    @Test
    @Severity(SeverityLevel.NORMAL)
    @Story("post request")
    @Description("to reqres in and valiudate responses")
    public void UsersPost() {
        steps.getResponse();
        steps.validateResponse();

    }
}