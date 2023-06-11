<?php 

error_reporting(E_ALL);
ini_set("display_error",1);

Header("Access-Control-Allow-Origin: *");
Header("Content-Type: application/json");
Header("Access-Control-Allow-Method: POST");

include_once("../../config/Database.php");
include_once("../../models/Product.php");

$database = new Database;
$db = $database->connect();

if(!$db) {
    echo json_encode(["message" => "Internal server error"]);
    die();
}

$product = new Product($db);

if(count($_POST)) {
    $params = [
        'sku' => $_POST['sku'],
        'name' => $_POST['name'],
        'price' => $_POST['price'],
        'size' => $_POST['size'],
    ];
    $productCreated = false;
    $productCreated = $product->createProduct($params);
    if (is_string($productCreated)) {
        echo json_encode(["message" => "internal server error".$productCreated]);
        die();
    }
    if ($productCreated) {
        echo json_encode(["message" => "Product added successfully"]);
    } else {
        echo json_encode(["message" => "something went wrong"]);
    }
    
} else {
    echo json_encode(["message" => "No data provided"]);
}



