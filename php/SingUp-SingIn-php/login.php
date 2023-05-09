<?php

session_start();
include ("connection.php");
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (empty($_POST['username'] || empty($_POST['password']))) {
        echo "all fields are required";
    } else {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $query = "select * from users where username = '$username' limit 1";
        $result = mysqli_query($con,$query);
        if ($result && mysqli_num_rows($result) > 0) {
            $data = mysqli_fetch_assoc($result);
            if ($data['password'] == $password) {
                $userId = random_num(20);
                $_SESSION['userId'] = $data['userId'];
                header("Location: index.php");
                die;
            } else {
                echo "Invalid password or username";
            }
        }
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

<form action="login.php" method="post">
    <h1 style="margin-left: 120px">Login</h1>
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
    <a style="margin-left: 120px" href="signup.php">Sign Up</a>
</form>
