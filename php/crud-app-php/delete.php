<?php

include "connection.php";


$id = $_GET['id'];

$result = mysqli_query($con,"DELETE  FROM `crud` WHERE id = $id");
if(!$result) {
    echo "something went wrong";
    header("Location: display.php");
}

header("Location: display.php");