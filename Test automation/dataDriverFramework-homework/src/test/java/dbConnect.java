import javax.xml.crypto.Data;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class dbConnect {

    public static Connection getConnection() throws SQLException {

        Connection conn = null;

        try {
            String url = "jdbc:sqlserver://DESKTOP-J8RPU6N:1433;databaseName=STUDENTS";
            String user = "myLogin";
            String password = "Testautomation123";

            conn = DriverManager.getConnection(url,user,password);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return conn;
    }
}
