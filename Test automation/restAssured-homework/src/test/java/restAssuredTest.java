import com.google.gson.JsonObject;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.apache.groovy.json.internal.Dates;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.datetime.DateFormatter;
import org.testng.annotations.Test;

import java.text.SimpleDateFormat;
import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

public class restAssuredTest {

    @Test

    public void test1()  {
        Date prevDate = new Date();
        Date date = new Date(prevDate.getTime() + (1000 * 60 * 60 * 24));
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String currentTime = ft.format(date);
        given().
                when().
                get("https://chercher.tech/sample/api/product/read").
                then().
                assertThat()
                .body("records[-1].name",equalTo("cherchertech"))
                .body("records.created", everyItem(lessThan(currentTime)));
    }

    public void test2() {

//        String objectAlternative = "{\n" +
//                "    \"firstname\" : \"Jim\",\n" +
//                "    \"lastname\" : \"Brown\",\n" +
//                "    \"totalprice\" : 111,\n" +
//                "    \"depositpaid\" : true,\n" +
//                "    \"bookingdates\" : {\n" +
//                "        \"checkin\" : \"2018-01-01\",\n" +
//                "        \"checkout\" : \"2019-01-01\"\n" +
//                "    },\n" +
//                "    \"additionalneeds\" : \"Breakfast\"\n" +
//                "}";

        JsonObject jsonObject = new JsonObject();

        jsonObject.addProperty("firstname","James");
        jsonObject.addProperty("lastName","Brown");
        jsonObject.addProperty("totalPrice",111);
        jsonObject.addProperty("depositpaid","true");

        JsonObject bookingDates = new JsonObject();
        bookingDates.addProperty("checkin","2018-01-01");
        bookingDates.addProperty("checkout","2019-01-01");

        jsonObject.add("bookingdates",bookingDates);
        jsonObject.addProperty("additionalneeds","Breakfast");


        given()
                .baseUri("https://reqres.in/api/users ")
                .contentType(ContentType.JSON)
                .body(jsonObject)
                .when()
                .put()
                .then()
                .log()
                .ifStatusCodeIsEqualTo(201);
    }

}
