<?php
class SqlConn
{
    private $connection ;
    public function __construct($host,$username,$passwd,$dbName){
        $this->connection = mysqli_connect($host,$username,$passwd,$dbName);
        mysqli_set_charset($this->connection,"utf8");
    }
    public function select($table,$fields,$where=[]){
        $whereCondition="";
        if (count($where)>0){
//            echo "<pre>";
//            print_r($where);
            $whereCondition=" Where ";
        foreach ($where as $key=>$value){
            $whereCondition.=" ".$key." = '".$value."' And ";
        }
    $whereCondition=rtrim($whereCondition,' And ');
        }

        $SqlSelect="Select ".$fields." From ".$table." ".$whereCondition;

        $result = mysqli_query($this->connection,$SqlSelect);
        $arr = [];
        if($result->num_rows > 0) {

            while($row = mysqli_fetch_assoc($result)) {
                $arr[] = $row ;
            }

        }
        return $arr;

    }

    public function  insert($table,$data=[]){
//       print_r($table);
//       echo "<br>";
//       print_r($data);
        $column="";
        $values="";
        foreach ($data as $key => $value ){
            $column.=$key.",";
            $values.="'".$value."',";
        }
        $column=rtrim($column,",");
        $values=rtrim($values,",");
        $command="insert into ".$table." ( ".$column." ) "." values ( ".$values." )";

        return mysqli_query($this->connection,$command);
    }

    public function delete($table,$where=[]){
$conditions = " where ";
        foreach ($where as $key => $value){
     $conditions.=$key." = '".$value."' and ";
        }
        $conditions = rtrim($conditions, " and ");

        $command = "delete from ".$table.$conditions;
       return mysqli_query($this->connection,$command);
    }
    public function update($table, $set=[], $where=[]){
        $setString = " set ";
        $whereString = " where ";
        foreach ($set as $key=>$value){
            $setString.="$key='$value', ";
        }
        $setString = rtrim($setString, ", ");
        foreach ($where as $key=>$value){
            $whereString.="$key = '$value' and ";
        }
        $whereString = rtrim($whereString, " and ");

        $command = "update $table $setString $whereString";

return mysqli_query($this->connection, $command);
    }



}

