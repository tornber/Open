<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: 219
  Date: 4/1/2023
  Time: 5:17 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Change</title>
</head>
<body>

<%
  int id = Integer.parseInt(request.getParameter("id"));
  String title = request.getParameter("title");
  String director = request.getParameter("director");
  String releaseDate = request.getParameter("releaseDate");
  String rating = request.getParameter("rating");
  String description = request.getParameter("description");

%>

<c:set var="id" value="<%=id%>"/>


<sql:setDataSource var="ug" driver="com.mysql.jdbc.Driver" user="root" password="" url="jdbc:mysql://localhost:3306/ug"/>
<sql:update dataSource="${ug}" var="count">
  insert into movies (title,director,releaseDate,rating,description) values(?,?,?,?,?) where id = ?;
  <sql:param value="<%=title%>"/>
  <sql:param value="<%=director%>"/>
  <sql:param value="<%=releaseDate%>"/>
  <sql:param value="<%=rating%>"/>
  <sql:param value="<%=description%>"/>
  <sql:param value="${id}"/>
</sql:update>
  <%
//    response.setHeader("Location","index.jsp");
  %>
</body>
</html>
