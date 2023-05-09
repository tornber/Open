<?php
    include("connection.php");
    include("functions.php");

    $userData = check_login($con);

?>

<h1>This is index page</h1>
<p>hello username</p>

<br>
<a href="logut.php">Logout</a>

