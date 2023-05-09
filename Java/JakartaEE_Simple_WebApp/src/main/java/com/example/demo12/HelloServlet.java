package com.example.demo12;

import java.io.*;
import java.util.ArrayList;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");

        String name = request.getParameter("name");
        String surname = request.getParameter("surname");
        int gender = Integer.parseInt(request.getParameter("gender"));
        System.out.println(gender);
        DB.insertPersons(name,surname,gender);

        PrintWriter out = response.getWriter();
        out.println("<html><body><table>");
        out.println("<thead>");
        String[] headers = {"name","surname","gender"};
        for (int i = 0; i < 3; i++) {
            out.println("<th>" + headers[i] + "</th>");
        }
        out.println("</thead>");
        out.println("<tbody>");
        ArrayList<PersonsModel> persons = DB.getPersonsData();
        for (int i = 0; i < persons.size(); i++) {
            String gender1 = "";
            if (persons.get(i).getGender() == 0) {
                gender1 = "Female";
            } else {
                gender1 = "Male";
            }
            out.println("<tr");
            out.println("<td>" + persons.get(i).getFirsName() + "</td>");
            out.println("<td>" + persons.get(i).getLastName() + "</td>");
            out.println("<td>" + gender1 + "</td>");
            out.println("</tr");
        }
        out.println("</tbody>");
        out.println("</html></body></table>");


    }

    public void destroy() {
    }
}