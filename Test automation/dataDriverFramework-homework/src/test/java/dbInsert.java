import org.testng.Assert;
import org.testng.annotations.Test;

import java.sql.*;

public class dbInsert {


    public static int insertData(int id,String name,String lastName,String phone,boolean save) {

        ResultSet result = null;
        PreparedStatement pstm = null;
        int rowId = Integer.MIN_VALUE;


        try( Connection conn = dbConnect.getConnection()) {
            conn.setAutoCommit(false);
            String sql = "INSERT INTO [STUDENTS].[dbo].[students](id,firstName,lastName,phone)" +
                    "VALUES(?,?,?,?)";
            pstm = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            pstm.setInt(1,id);
            pstm.setString(2,name);
            pstm.setString(3,lastName);
            pstm.setString(4,phone);

            int effectedRows = pstm.executeUpdate();
            Assert.assertEquals(effectedRows,1);
            if(effectedRows != 1) {
                conn.rollback();
            }
            result = pstm.getGeneratedKeys();
            if(result.next()) {
                rowId = result.getInt(1);
            }
            if(save) {
                conn.commit();
            }

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            try {
                if(result != null)  result.close();
                if(pstm != null) pstm.close();
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }

        return id;
    }

}
