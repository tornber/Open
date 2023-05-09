<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>

<sql:setDataSource var="ug" driver="com.mysql.jdbc.Driver" user="root"
                   password="" url="jdbc:mysql://localhost:3306/movies" />

<sql:query var="movies" dataSource="${ug}">
    select * from movies;
</sql:query>

    <table border="1px">
        <thead>
        <th>Movie Id</th>
        <th>Title</th>
        <th>Director</th>
        <th>Release Date</th>
        <th>Rating</th>
        <th>Description</th>
        </thead>
        <tbody>
            <c:forEach var="movie" items="${movies}">
                <tr>
                    <td><c:out value="${movie.id}"/> </td>
                    <td><c:out value="${movie.title}"/> </td>
                    <td><c:out value="${movie.director}"/> </td>
                    <td><c:out value="${movie.releaseDate}"/> </td>
                    <td><c:out value="${movie.rating}"/> </td>
                    <td><c:out value="${movie.description}"/> </td>
                    <a href="update.jsp?id=${movie.id}">Update</a>
                    <a href="delete.jsp?id=${movie.id}">Delete</a>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</body>
</html>