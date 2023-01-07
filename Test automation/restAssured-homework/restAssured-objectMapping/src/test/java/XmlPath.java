import io.restassured.RestAssured;
import io.restassured.internal.path.xml.NodeChildrenImpl;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.w3c.dom.Node;

public class XmlPath {

    @Test
    public void XmlValidations() {
        NodeChildrenImpl Snames = RestAssured.given().when()
                .get("http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfContinentsByName")
                .then()
                .extract()
                .path("ArrayOftContinent.tContinent.sName");
        String Tcontient = RestAssured.given().when()
                .get("http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfContinentsByName")
                .then()
                .extract()
                .path("ArrayOftContinent.tContinent.find { it -> it.sCode == 'AN'}.sName");
        String lastTcontient = RestAssured.given().when()
                .get("http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfContinentsByName")
                .then()
                .extract()
                .path("ArrayOftContinent.tContinent[-1].sName");
        Assert.assertEquals(Snames.size(),6);
        Assert.assertEquals(Snames.list().toString(),"[Africa, Antarctica, Asia, Europe, Ocenania, The Americas]");
        Assert.assertEquals(Tcontient,"Antarctica");
        Assert.assertEquals(lastTcontient,"The Americas");
    }
}
