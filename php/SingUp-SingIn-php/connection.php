<?php

$dbhost = "localhost";
$dbuser = "localhost";
$dbpass = "localhost";
$dbname = "users";

if (!$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)) {
    die("Connection failed");
}
