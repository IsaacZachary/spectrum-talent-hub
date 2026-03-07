<?php
require_once 'config.php';

// Table Creation SQL
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
    echo "<h1>Database Setup Successful</h1>";
} catch (PDOException $e) {
    die("<h1>Database Setup Failed</h1> <p>" . $e->getMessage() . "</p>");
}

// Allow force reseed via ?force=1
$force = isset($_GET['force']) && $_GET['force'] === '1';

if ($force) {
    // Remove test/dummy data only
    $pdo->exec("DELETE FROM jobs WHERE title = 'test' OR description = 'eedsaf' OR department = 'res'");
    echo "<h3>Dummy jobs cleared.</h3>";
}

// Check if job already exists
$stmt = $pdo->prepare("SELECT COUNT(*) FROM jobs WHERE id = 'seed_job_001'");
$stmt->execute();
$count = $stmt->fetchColumn();

if ($count == 0) {
    $jobTitle = "Junior Private Investigator";
    $jobDept = "Investigations";
    $jobLocation = "Nairobi CBD";
    $jobDescription = "Spectrum Network International is seeking a junior investigator to join our corporate fraud and vetting team. This entry-level role involves fieldwork, document verification, and support for primary investigators.";
    
    $requirements = [
        "Certificate/Diploma in Criminology or related field",
        "Clean record with certificate of good conduct",
        "Excellent communication skills",
        "Valid driving/motorbike license is an added advantage"
    ];
    
    $responsibilities = [
        "Conducting document verification for employee vetting",
        "Assisting in corporate fraud investigations",
        "Writing daily activity reports",
        "Maintaining case records and evidence files"
    ];
    
    $benefits = [
        "Professional growth and training",
        "Competitive stipend",
        "Performance bonuses",
        "Exposure to complex corporate cases"
    ];

    $stmt = $pdo->prepare("INSERT INTO jobs (id, title, department, location, type, salary, description, requirements, responsibilities, benefits, status, closingDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    $jobId = "seed_job_001";
    $stmt->execute([
        $jobId,
        $jobTitle,
        $jobDept,
        $jobLocation,
        "Full-time",
        "Competitive",
        $jobDescription,
        json_encode($requirements),
        json_encode($responsibilities),
        json_encode($benefits),
        "open",
        date('Y-m-d', strtotime('+30 days'))
    ]);
    
    echo "<h2 style='color:green'>✅ Seed Job Created: " . $jobTitle . "</h2>";
} else {
    echo "<h2>Seed job already exists. Use <a href='?force=1'>?force=1</a> to clean dummy data.</h2>";
}

echo "<br><a href='/recruitment/' style='font-size:18px'>→ Visit Recruitment Portal</a>";
?>
