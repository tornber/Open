<?php

$conn = mysqli_connect("localhost","week10","123","week10");
mysqli_set_charset($conn,"utf8");

if (!$conn) {
    die();
}

$query = "SELECT * FROM users";
$result = mysqli_query($conn,$query);
if($result->num_rows > 0) {
    $arr = [];
    while($row = mysqli_fetch_assoc($result)) {
        $arr[] = $row ;
    }
}
echo "<pre>";
print_r($arr);
//
////echo "<pre>";
////print_r($arr);
//echo json_encode($arr);
//
//$fname = "shota";
//$lname = "beridze";
//$code = "200469";
//$password = md5("123");
//$nickname = "shotia";
//$queryInsert = "insert into users(fname,lname,code,password,nickname)
//values('".$fname."', '".$lname."', '".$code."', '".$password."','".$nickname."')";
//
////$insertResult = mysqli_query($conn,$queryInsert);
////if($insertResult){
////    echo "chanaweri warmatebiT daemata";
////}else{
////    echo "No infomation";
////}
//$newValue = "შოთექსა";
//$userId = 1;
//$update = "update users set fname = '".$newValue."'
//where userId = '".$userId."'";
//
////$updateResult = mysqli_query($conn,$update);
////if($updateResult){
////    echo "chanaweri warmatebiT daredaqtirda";
////}else{
////    echo "No infomation";
////}
////echo $update;
//
//$delete = "delete from users where userId = '".$userId."'";
//$deleteResult = mysqli_query($conn,$delete);
//if($deleteResult){
//    echo "chanaweri warmatebiT washala";
//}else{
//    echo "No infomation";
//}
//echo $deleteResult;
//
