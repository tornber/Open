<?php

    session_start();
    include ("connection.php");
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        if (empty($_POST['username'] || empty($_POST['password']))) {
            echo "all fields are required";
        } else {
            $userId = random_num(20);
            $username = $_POST['username'];
            $password = $_POST['password'];
            $query = "insert into users (userId,username,password,) values ('$userId','$username','$password')";
            mysqli_query($con,$query);
            $_SESSION['userId',$userId];
            header("Location: index.php");
            die;
        }
    }

    function random_num($length) {
        $text = "";
        if ($length < 5) {
            $length = 5;
        }
        $len = rand(4,$length);
        for ($i = 0;$i < $len; $i++) {
            $text .= rand(0,9);
        }
        return $text;
    }

?>

<form action="signup.php" method="post">
    <h1 style="margin-left: 120px">Sign up</h1>
    <label for="username">Username: </label>
    <input type="text" name="username">
    <br>
    <br>
    <label for="password">Password: </label>
    <input type="text" name="password">
    <br>
    <br>
    <button style="margin-left: 120px" type="submit">Submit</button>
    <br>
    <br>
    <a style="margin-left: 120px" href="login.php">Click to Login</a>
</form>
