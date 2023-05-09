<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Crud App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
</head>
<body>
<div class="container">
    <div class="container">
        <a  href="user.php" class="btn btn-primary my-5 text-light">Add User</a>
        <table class="table">
            <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Password</th>
                <th>Operations</th>
            </thead>
            <tbody>
<?php
    include "connection.php";
    $result = mysqli_query($con,"select * from `crud`");
    if ($result) {
        while($row = mysqli_fetch_assoc($result)) {
            $id = $row['id'];
            $name = $row['name'];
            $email = $row['email'];
            $mobile = $row['phone'];
            $password = $row['password'];
            echo "<tr>
                <th>$id</th>
                <td>$name</td>
                <td>$email</td>
                <td>$mobile</td>
                <td>$password</td>
                <td>
                    <button class='btn btn-primary '><a href='update.php?id=$id' class='text-light'>Update</a> </button>
                    <button class='btn btn-danger '><a href='delete.php?id=$id' class='text-light' >Delete</a> </button>
                </td>
</tr>";
        }
    }

    ?>
            </tbody>
        </table>
    </div>
</div>
</body>
</html>
