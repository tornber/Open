package Data;

import java.sql.*;

public class GetData {

    DBConnect connect = new DBConnect();

    public int getIntData(String name) {
        String query = "SELECT TOP 1 * FROM users ORDER BY ID DESC";
        int data = 0;
        try(Connection conn = connect.getConnection()) {
            Statement statement = conn.createStatement();
            ResultSet result = statement.executeQuery(query);
            if(result.next()) {
                data = result.getInt(name);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return data;
    }

    public String getStringData(String name) {
        ResultSet result = null;
        Statement statement= null;
        String query = "SELECT TOP 1 * FROM users ORDER BY ID DESC";
        String data = "";
        try (Connection conn = connect.getConnection()) {
            statement = conn.createStatement();
            result = statement.executeQuery(query);
            if(result.next()) {
                data = result.getString(name);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                if(result != null)  result.close();
                if(statement != null) statement.close();
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
        return data;
    }

    public String name = getStringData("firstName"),
            lastName = getStringData("lastName"),
            phone = getStringData("phone"),
            password = getStringData("password"),
            address = getStringData("address"),
            email = getStringData("email"),
            country = getStringData("country"),
            state = getStringData("state"),
            city = getStringData("city");
}
