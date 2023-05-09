<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%--
  Created by IntelliJ IDEA.
  User: 219
  Date: 4/1/2023
  Time: 5:06 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Update</title>
</head>
<body>
<sql:setDataSource var="ug" driver="com.mysql.jdbc.Driver" user="root" password="" url="jdbc:mysql://localhost:3306/ug"/>

<% int id = request.getParameter("id")%>
<sql:query var="movie" dataSource="${ug}">
  select * from movies where id = ?
  <sql:param value="<%=id%>"/>
</sql:query>

      <form action="change.jsp" method="post">
        Enter ID: <input type="text" name="id" value="<%=id%>" hidden/>
        Title: <input type="text" name="title" value="<c:out value="${movie}"/>"/>
        Director: <input type="text" name="director"  value="<c:out value="${movie}"/>"/>
        Release Date: <input type="Date" name="releaseDate"  value="<c:out value="${movie}"/>"/>
        Rating: <input type="text" name="rating"  value="<c:out value="${movie}"/>"/>
        Description: <input type="text" name="description" value="<c:out value="${movie}"/>"/>
      </form>
</body>
</html>
