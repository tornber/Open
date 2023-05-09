<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>
    <from method="get" action="helloServlet">
        <label>Name:</label>
        <input type="text" name="name" />
        <br>
        <label>Surname:</label>
        <input type="text" name="lastname" />
        <br>
        <label>Gender:</label>
        <select>
            <option value="1">Male</option>
            <option value="0">Female</option>
        </select>
        <input type="submit" value="submit" />
    </from>
</body>
</html>