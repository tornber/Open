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

$product = new Product($db);
$products = $product->readProducts();

if ($products->rowCount()) {
    $data = [];
    $id = 0;
    while($row = $products->fetch(PDO::FETCH_OBJ)) {
        $data[$id] = [
            "sku" => $row->sku,
            "name" => $row->name,
            "price" => $row->price,
            "size" => $row->size
        ];
        $id += 1;
    }
    echo json_encode($data);

} else {
    echo json_encode(['message' => 'no products found']);
}
