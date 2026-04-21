<?php
$host = "localhost";
$dbname = "geo_quiz";
$user = "root";
$pass = "";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Conexiunea a eșuat: " . $conn->connect_error);
}

$conn->set_charset("utf8");
?>