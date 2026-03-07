<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM jobs WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $job = $stmt->fetch();
        if ($job) {
            echo json_encode($job);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Job not found']);
        }
    } else {
        $stmt = $pdo->query("SELECT * FROM jobs ORDER BY postedDate DESC");
        $jobs = $stmt->fetchAll();
        echo json_encode($jobs);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        $data['id'] = uniqid('job_');
    }
    
    $stmt = $pdo->prepare("INSERT INTO jobs (id, title, department, location, type, salary, description, requirements, responsibilities, benefits, postedDate, closingDate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    try {
        $stmt->execute([
            $data['id'],
            $data['title'],
            $data['department'],
            $data['location'],
            $data['type'],
            $data['salary'],
            $data['description'],
            isset($data['requirements']) ? (is_string($data['requirements']) ? $data['requirements'] : json_encode($data['requirements'])) : '[]',
            isset($data['responsibilities']) ? (is_string($data['responsibilities']) ? $data['responsibilities'] : json_encode($data['responsibilities'])) : '[]',
            isset($data['benefits']) ? (is_string($data['benefits']) ? $data['benefits'] : json_encode($data['benefits'])) : '[]',
            date('Y-m-d H:i:s'),
            $data['closingDate'],
            $data['status'] ?? 'open'
        ]);
        echo json_encode(['success' => true, 'id' => $data['id']]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
