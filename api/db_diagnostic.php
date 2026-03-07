<?php
header("Content-Type: application/json; charset=UTF-8");

// Try multiple common configurations
$configs = [
    ['host' => 'localhost', 'user' => 'spectsx2_admin', 'db' => 'spectsx2_recruitment'],
    ['host' => '127.0.0.1', 'user' => 'spectsx2_admin', 'db' => 'spectsx2_recruitment'],
];

$pass = 'VyGBD7{%[EvSIk,I'; 
$results = [];

foreach ($configs as $config) {
    $dsn = "mysql:host={$config['host']};dbname={$config['db']};charset=utf8mb4";
    try {
        $pdo = new PDO($dsn, $config['user'], $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 2
        ]);
        $results[] = [
            'attempt' => "{$config['user']}@{$config['host']} -> {$config['db']}",
            'status' => 'SUCCESS ✅'
        ];
    } catch (\PDOException $e) {
        $results[] = [
            'attempt' => "{$config['user']}@{$config['host']} -> {$config['db']}",
            'status' => 'FAILED ❌',
            'error' => $e->getMessage()
        ];
    }
}

echo json_encode(['results' => $results, 'advice' => 'If all failed, please go to cPanel -> MySQL Databases -> Current Users and change the password for spectsx2_admin to: VyGBD7{%[EvSIk,I']);
?>
