<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

    include "connection.php";
    $id = 0;
    if(isset($_GET['id'])) {
        $id = $_GET['id'];
    }

if(isset($_POST['submit'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    mysqli_select_db($con,"crud");
    $result = mysqli_query($con,"UPDATE `crud` SET `name` = '$name', `email` = '$email',
                  `phone` = 'phone', `password` = '$password' WHERE id = $id");

    if(!$result) {
        echo "something went wrong";
    } else {
     header("Location: display.php");
    }
}

$result = mysqli_query($con,"select * from crud where id = $id");
$row = mysqli_fetch_assoc($result);


echo "<form method='post' action='update.php'>
    <label for='name'>Name: </label>
    <br>
    <input type='text'  name='name' value='".$row['name']."' /> 
    <br>
    <label for='email'>Email: </label>
    <br>
    <input name='email' type='email' value='".$row['email']."' >
    <br>
    <label for='phone'>Phone: </label>
    <br>
    <input type='tel' name='phone' value='".$row['phone']."'>
    <br>
    <label for='password'>Password: </label>
    <br>
    <input type='password' name='password' value='".$row['password']."'>
    <br>
    <br>
    <input type='text' name='id' value='".$row['id']."' hidden />
    <input type='submit' name='submit' value='submit'>
</form>"

?>
