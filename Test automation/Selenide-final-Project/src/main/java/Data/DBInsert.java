package Data;

import java.sql.*;

public class DBInsert {

    static DBConnect connect = new DBConnect();

    public static int insertData(String name,String lastName,String phone,
                                 String password,String address,String email,String country,String state,String city,int zip ) {

        ResultSet result = null;
        PreparedStatement pstm = null;
        int rowId = Integer.MIN_VALUE;


        try(Connection conn = connect.getConnection()) {
            String sql = "INSERT INTO [users].[dbo].[users](firstName,lastName,phone,password,address,email,country,state,city,zip)" +
                    "VALUES(?,?,?,?,?,?,?,?,?,?)";
            pstm = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            pstm.setString(1,name);
            pstm.setString(2,lastName);
            pstm.setString(3,phone);
            pstm.setString(4,password);
            pstm.setString(5,address);
            pstm.setString(6,email);
            pstm.setString(7,country);
            pstm.setString(8,state);
            pstm.setString(9,city);
            pstm.setInt(10,zip);

            int effectedRows = pstm.executeUpdate();
            if(effectedRows > 0) {
                System.out.println("row has been inserted");
            }
            result = pstm.getGeneratedKeys();
            if(result.next()) {
                rowId = result.getInt(1);
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

        return rowId;
    }
}
