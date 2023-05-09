<?php

session_start();
function check_login($con) {
    if (isset($_SESSION['userId'])) {
        $userId = $_SESSION['userId'];
        $query = "select * from users where userid = '$userId' limit 1";
        $result = mysqli_query($query);
        if ($result && mysqli_num_rows($result) > 1) {
            $userData = mysqli_fetch_assoc($result);
            return $userData;
        }
    }
        header("Location: login.php");
}

