<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: 219
  Date: 4/1/2023
  Time: 5:52 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Delete</title>
</head>
<body>

<%
    int id = Integer.parseInt(request.getParameter("id"));
%>

<c:set var="id" value="<%=id%>" />

<sql:setDataSource var="ug" driver="com.mysql.jdbc.Driver" user="root"
                   password="" url="jdbc:mysql://localhost:3306/movies" />

<sql:query var="movies" dataSource="${ug}">
    select * from movies where id = ?;
    <sql:param value="${id}"/>
</sql:query>

</body>
</html>
