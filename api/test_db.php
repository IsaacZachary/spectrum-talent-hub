<?php
header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost';
$db   = 'spectsx2_recruitment';
$user = 'spectsx2_admin';
$pass = 'VyGBD7{%[EvSIk,I';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
     echo json_encode([
         'status' => 'success',
         'message' => 'Database connection established successfully!',
         'database' => $db,
         'user' => $user
     ]);
} catch (\PDOException $e) {
     echo json_encode([
         'status' => 'error',
         'error_code' => $e->getCode(),
         'message' => $e->getMessage()
     ]);
}
?>
