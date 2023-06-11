<?php 

class Database {

    private $host = "localhost";
    private $dbname = "scandiweb";
    private $username = "tornike";
    private $pwd = "1234";
    private $connection = null;

    public function connect() {
        try {
            $this->connection = new PDO("mysql:host=".$this->host.";dbname=".$this->dbname,$this->username,$this->pwd);
        } catch(PDOException $ex) {
            echo $ex->getMessage();
        }
        return $this->connection;
    }
}