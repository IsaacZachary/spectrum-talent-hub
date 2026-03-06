<?php
require_once 'config.php';

$jobs = [
    [
        'id' => 'job_1',
        'title' => 'Security Analyst',
        'department' => 'Risk Management',
        'location' => 'Nairobi, Kenya',
        'type' => 'Full-time',
        'salary' => 'KES 120k - 180k',
        'description' => 'We are looking for a Security Analyst to join our risk management team...',
        'requirements' => json_encode(['Degree in CS/Security', '3+ years experience', 'CISSP preferred']),
        'postedDate' => date('Y-m-d H:i:s'),
        'closingDate' => date('Y-m-d H:i:s', strtotime('+30 days')),
        'status' => 'open'
    ],
    [
        'id' => 'job_2',
        'title' => 'Private Investigator',
        'department' => 'Investigations',
        'location' => 'Mombasa, Kenya',
        'type' => 'Contract',
        'salary' => 'Competitive',
        'description' => 'Conducting field investigations and gathering intelligence...',
        'requirements' => json_encode(['Previous law enforcement experience preferred', 'Valid driving license', 'Discreet and professional']),
        'postedDate' => date('Y-m-d H:i:s'),
        'closingDate' => date('Y-m-d H:i:s', strtotime('+15 days')),
        'status' => 'open'
    ],
    [
        'id' => 'job_3',
        'title' => 'Junior Investigator',
        'department' => 'Investigations',
        'location' => 'Nairobi, Kenya',
        'type' => 'Full-time',
        'salary' => 'Competitive',
        'description' => 'Spectrum Network International is looking for a Junior Investigator to join our professional investigations team. The ideal candidate will have a strong foundation in security studies and a proven track record of professional conduct.',
        'requirements' => json_encode([
            "Diploma or Bachelor's Degree in Criminology, Security Studies, Criminal Justice, or a related field",
            "1-2 years experience in a reputable investigation firm",
            "Strong knowledge of surveillance operations and handling high-risk cases",
            "Professional certification in Cybersecurity or related fields (added advantage)",
            "Excellent command of English (both written and verbal)",
            "Highly computer literate",
            "Proven track record of conducting reliable and professional investigations"
        ]),
        'postedDate' => date('Y-m-d H:i:s'),
        'closingDate' => date('Y-m-d H:i:s', strtotime('+45 days')),
        'status' => 'open'
    ]
];

foreach ($jobs as $job) {
    $stmt = $pdo->prepare("INSERT INTO jobs (id, title, department, location, type, salary, description, requirements, postedDate, closingDate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title)");
    $stmt->execute(array_values($job));
}

echo json_encode(['success' => true, 'message' => 'Seeded ' . count($jobs) . ' jobs']);
?>
