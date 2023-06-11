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

if(strlen(file_get_contents("php://input"))) {
    $params = json_decode(file_get_contents("php://input"), true);
    $productDeleted = $product->deleteProducts($params);
    if (is_string($productDeleted)) {
        echo json_encode(["message" => "internal server error".$productDeleted]);
        die();
    }
    if ($productDeleted) {
        echo json_encode(["message" => "Product Deleted successfully"]);
    } else {
        echo json_encode(["message" => "something went wrong"]);
    }
    
} else {
    echo json_encode(["message" => "No data provided"]);
}



