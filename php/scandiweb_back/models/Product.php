<?php 

error_reporting(E_ALL);
ini_set("display_error",1);

class Product {

    public $sku;
    public $name;
    public $price;
    public $size;

    private $connection;
    private $table = "`products`";

    public function __construct($db) {
        $this->connection = $db;
    }

    public function readProducts() {
        $query = "SELECT * from ".$this->table.";";
        $products = $this->connection->prepare($query);
        $products->execute();
        return $products;
    }

    public function createProduct($params) {
        try {
            $this->sku = $params['sku'];
            $this->name = $params['name'];
            $this->price = $params['price'];
            $this->size = $params['size'];

            $query = "INSERT INTO".$this->table
                ."SET 
                    sku=:sku,
                    name=:name,
                    price=:price,
                    size=:size;";
            $product = $this->connection->prepare($query);
            $product->bindValue('sku',$this->sku,PDO::PARAM_STR);
            $product->bindValue('name',$this->name,PDO::PARAM_STR);
            $product->bindValue('price',$this->price,PDO::PARAM_INT);
            $product->bindValue('size',$this->size,PDO::PARAM_STR);
            $productExecuted = $product->execute();


            if($productExecuted) {
                return true;
            };
            return false;
        } catch(PDOException $ex) {
            return $ex->getMessage();
        }
    }

    public function deleteProducts($params) {
        $skus = "";
        foreach($params as $key=>$param) {
            if ($key == 0 ) {
                $skus = "'";
                $skus = $skus.$param;
                $skus = $skus."'";
            } else {
                $skus = $skus.",'".$param;
                $skus = $skus."'";
            }
        }

        try {
            $query = "DELETE FROM".$this->table
                ."WHERE sku IN (".$skus.");";
            $product = $this->connection->prepare($query);
            if($product->execute()) {
                return true;
            } else {
                return false;
            }
        } catch(PDOException $ex) {
            return $ex->getMessage();
        }
    }

}