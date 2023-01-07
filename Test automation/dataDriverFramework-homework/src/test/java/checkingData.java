import org.testng.Assert;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class checkingData {

    public static void checkData(int intValue,String stringValue,String valueName,String sql) {

        try (Connection conn = dbConnect.getConnection();
             Statement stm = conn.createStatement();
             ResultSet rs = stm.executeQuery(sql)) {
            rs.next();
            if(intValue != 0) {
                Assert.assertEquals(intValue, rs.getInt(valueName), "row is not in table");
            } else if(stringValue != ""){
                Assert.assertEquals(stringValue, rs.getString(valueName), "row is not in table");
            } else {
                System.out.println("no enought params");
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}
