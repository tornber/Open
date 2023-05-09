package com.example.demo12;
import java.sql.*;
import java.util.ArrayList;

public class DB {

    private static Connection getConnection() {
        Connection con = null;
        try {
            String url = "jdbc:mysql://localhost:3306/study";
            String user = "root";
            String password = "";

            con = DriverManager.getConnection(url, user, password);

        } catch(SQLException ex) {
            ex.printStackTrace();
        }
        return con;
    }

    public static void insertPersons(String name,String surname,int gender) {
        Connection con = getConnection();
        try {
            String sql = "insert into persons(name,surname,gender) values (?,?,?)";
            PreparedStatement preparedStatement = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1,name);
            preparedStatement.setString(2,surname);
            preparedStatement.setInt(3,gender);
            int rowAffected = preparedStatement.executeUpdate();
            if (rowAffected == 1) {
                System.out.println("successfully added row");
            } else {
                System.out.println("data not inserted");
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }

    }

    public static ArrayList<PersonsModel> getPersonsData() {
        ArrayList<PersonsModel> models = new ArrayList<PersonsModel>();
        Connection con = getConnection();
        ResultSet rs = null;
        String sql = "select name,surname,gender from persons";
        try {
            Statement statement = con.createStatement();
            rs = (ResultSet) statement.executeQuery(sql);
            int i = 0;
            while(rs.next()) {
                PersonsModel model = new PersonsModel();
                model.setFirsName(rs.getString("name"));
                model.setLastName(rs.getString("surname"));
                model.setGender(rs.getInt("gender"));
                models.add(model);
                i++;
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return models;

    }
}
