<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM applications ORDER BY appliedDate DESC");
    $apps = $stmt->fetchAll();
    echo json_encode($apps);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        $data['id'] = uniqid('app_');
    }
    
    $stmt = $pdo->prepare("INSERT INTO applications (id, jobId, jobTitle, applicantName, email, phone, appliedDate, status, coverLetter, resumeUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    try {
        $stmt->execute([
            $data['id'],
            $data['jobId'],
            $data['jobTitle'],
            $data['applicantName'],
            $data['email'],
            $data['phone'],
            date('Y-m-d H:i:s'),
            'new',
            $data['coverLetter'] ?? '',
            $data['resumeUrl'] ?? ''
        ]);
        echo json_encode(['success' => true, 'id' => $data['id']]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id']) && isset($data['status'])) {
        $stmt = $pdo->prepare("UPDATE applications SET status = ? WHERE id = ?");
        $stmt->execute([$data['status'], $data['id']]);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing id or status']);
    }
}
?>
