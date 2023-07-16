<?php
include "SqlConn.php";
$sqlObj=new SqlConn("localhost","week10","123","week10");
$result= $sqlObj->select("users","*",["userId"=>2,"code"=>200123]);

//$insertResult=$sqlObj->insert("users",["fname"=>"goga","lname"=>"kukuridze","code"=>12345,"password"=>"adsasdsadasd213223"]);
//print_r($insertResult);
$deleteResult=$sqlObj->delete("users", ["fname" =>"goga"]);

$updateResult=$sqlObj->update("users", ["fname"=>"newDavit", "password"=>"newPassword"], ["userId"=>"2"]);
echo "<pre>";
//print_r($result);