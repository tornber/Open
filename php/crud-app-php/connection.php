<?php

$con = mysqli_connect("localhost","root","","crud");

if (!$con) {
    die(mysqli_error($con));
}