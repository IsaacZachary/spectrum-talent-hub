<?php
require_once 'config.php';
header('Content-Type: text/html; charset=utf-8');

echo "<!DOCTYPE html><html><head><style>body{font-family:sans-serif;max-width:700px;margin:40px auto;padding:20px;} .ok{color:green;} .warn{color:orange;} .err{color:red;}</style></head><body>";
echo "<h2>🌱 Spectrum Network – Job Seeder</h2>";

// Step 1: Create tables if needed
$sql = "
CREATE TABLE IF NOT EXISTS jobs (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    location VARCHAR(100),
    type ENUM('Full-time', 'Part-time', 'Contract', 'Temporary') DEFAULT 'Full-time',
    salary VARCHAR(100),
    description TEXT,
    requirements TEXT,
    responsibilities TEXT DEFAULT '[]',
    benefits TEXT DEFAULT '[]',
    status ENUM('open', 'closed') DEFAULT 'open',
    postedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    closingDate DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS applications (
    id VARCHAR(50) PRIMARY KEY,
    jobId VARCHAR(50),
    jobTitle VARCHAR(255),
    applicantName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    cvPath VARCHAR(255),
    resumeUrl VARCHAR(255),
    coverLetter TEXT,
    status ENUM('new', 'reviewing', 'shortlisted', 'interview', 'offered', 'hired', 'rejected') DEFAULT 'new',
    appliedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (jobId) REFERENCES jobs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
";

try {
    $pdo->exec($sql);
    echo "<p class='ok'>✅ Tables ready.</p>";
} catch (PDOException $e) {
    echo "<p class='err'>❌ Table error: " . $e->getMessage() . "</p>";
    exit;
}

// Step 2: Force clear dummy/test jobs if ?force=1
$force = isset($_GET['force']) && $_GET['force'] === '1';
if ($force) {
    $pdo->exec("DELETE FROM jobs WHERE 
        title = 'test' OR 
        department = 'res' OR 
        LENGTH(title) < 5 OR
        description IS NULL OR description = '' OR description = 'eedsaf'
    ");
    echo "<p class='warn'>⚠️ Dummy jobs cleared.</p>";
}

// Step 3: Define real jobs
$jobs = [
    [
        'id'              => 'snp_job_junior_inv_2026',
        'title'           => 'Junior Investigator',
        'department'      => 'Investigations',
        'location'        => 'Nairobi, Kenya',
        'type'            => 'Full-time',
        'salary'          => 'Competitive + Benefits',
        'description'     => 'Spectrum Network International is now hiring a smart, detail-oriented Junior Investigator to join our investigations team. If you have a background in criminology or related fields and strong investigative skills, this is your opportunity to build a meaningful career in intelligence and risk management.',
        'requirements'    => json_encode([
            'Diploma or Bachelor\'s Degree in Criminology, Security Studies, Criminal Justice, or a related field',
            '1–2 years experience in a reputable investigation firm (fresh graduates with strong internship experience considered)',
            'Strong knowledge of surveillance operations and handling high-risk cases',
            'Professional certification in Cybersecurity or related fields (added advantage)',
            'Excellent command of English (both written and verbal)',
            'Highly computer literate',
            'Proven track record of conducting reliable and professional investigations',
        ]),
        'responsibilities' => json_encode([
            'Conducting employee background checks and corporate vetting',
            'Assisting senior investigators in fraud and intelligence cases',
            'Performing surveillance and field operations',
            'Writing accurate and timely investigation reports',
            'Maintaining confidentiality and evidence integrity',
            'Liaising with law enforcement agencies where required',
        ]),
        'benefits'        => json_encode([
            'Competitive salary with performance bonuses',
            'Professional training and development',
            'Exposure to complex, high-profile investigations',
            'Career growth in Africa\'s leading PI firm',
            'Medical cover',
        ]),
        'status'          => 'open',
        'closingDate'     => date('Y-m-d', strtotime('+45 days')),
    ],
    [
        'id'              => 'snp_job_debt_collector_2026',
        'title'           => 'Virtual Debt Collector',
        'department'      => 'Debt Recovery',
        'location'        => 'Remote (Kenya)',
        'type'            => 'Contract',
        'salary'          => 'Commission-Based + Retainer',
        'description'     => 'Spectrum Network International is seeking driven and persuasive Virtual Debt Collectors to join our Debt Recovery division. This is a remote-first opportunity ideal for individuals who are available immediately and have a working laptop.',
        'requirements'    => json_encode([
            'Diploma holder or higher (any field)',
            'Must have a working laptop with stable internet access',
            'Available to start immediately',
            'Experience in debt collection or credit recovery is an added advantage',
            'Strong communication and negotiation skills',
            'Ability to handle high call volumes and manage follow-ups',
        ]),
        'responsibilities' => json_encode([
            'Contacting debtors via phone, email, and messaging platforms',
            'Negotiating repayment plans in line with company policy',
            'Maintaining accurate records of all collection activities',
            'Reporting daily collection progress to line manager',
            'Escalating unresolved cases to senior recovery agents',
        ]),
        'benefits'        => json_encode([
            'Work from anywhere (fully remote)',
            'Attractive commission structure',
            'Flexible work hours',
            'Fast onboarding – start within days',
            'Growth potential into permanent roles',
        ]),
        'status'          => 'open',
        'closingDate'     => date('Y-m-d', strtotime('+30 days')),
    ],
];

// Step 4: Insert jobs using INSERT IGNORE (safe, won't duplicate)
$stmt = $pdo->prepare("
    INSERT IGNORE INTO jobs 
        (id, title, department, location, type, salary, description, requirements, responsibilities, benefits, status, closingDate) 
    VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$inserted = 0;
$skipped  = 0;
foreach ($jobs as $job) {
    try {
        $result = $stmt->execute([
            $job['id'],
            $job['title'],
            $job['department'],
            $job['location'],
            $job['type'],
            $job['salary'],
            $job['description'],
            $job['requirements'],
            $job['responsibilities'],
            $job['benefits'],
            $job['status'],
            $job['closingDate'],
        ]);
        if ($stmt->rowCount() > 0) {
            echo "<p class='ok'>✅ Job Added: <strong>{$job['title']}</strong> ({$job['department']})</p>";
            $inserted++;
        } else {
            echo "<p class='warn'>⏭️ Already exists, skipped: <strong>{$job['title']}</strong> — use <a href='?force=1'>?force=1</a> then reload to re-seed.</p>";
            $skipped++;
        }
    } catch (PDOException $e) {
        echo "<p class='err'>❌ Failed to add {$job['title']}: " . $e->getMessage() . "</p>";
    }
}

// Step 5: Show summary
$countStmt = $pdo->query("SELECT COUNT(*) FROM jobs WHERE status = 'open'");
$total = $countStmt->fetchColumn();

echo "<hr>";
echo "<p><strong>Summary:</strong> {$inserted} job(s) inserted, {$skipped} skipped. Total open jobs in DB: <strong>{$total}</strong></p>";
echo "<p><a href='/recruitment/' style='font-size:18px;color:#E43A3A;font-weight:bold'>→ Visit Recruitment Portal</a></p>";
echo "</body></html>";
?>
