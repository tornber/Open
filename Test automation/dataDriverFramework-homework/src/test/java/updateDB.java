import org.testng.Assert;

import java.sql.*;

public class updateDB {

    public static int update(int intValue,String stringValue,String sql) {

        ResultSet rs = null;
        int key = 0;

        try(Connection conn = dbConnect.getConnection();
            PreparedStatement pstm = conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS)) {
                if(intValue != 0) {
                    pstm.setInt(1,intValue);
                } else if(stringValue != "") {
                    pstm.setString(1,stringValue);
                } else {
                    System.out.println("params error occured");
                }
                int rowAffected = pstm.executeUpdate();
                Assert.assertEquals(rowAffected,1);
                rs = pstm.getGeneratedKeys();
                if(rs.next()) {
                    key = rs.getInt(1);
                }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                if(rs != null) rs.close();
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }

        }
        return key;
    }
}
