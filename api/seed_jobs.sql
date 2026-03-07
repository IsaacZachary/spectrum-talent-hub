-- ============================================================
-- REQUIRED FIX: Your existing table is missing the new columns!
-- Let's drop the old tables and recreate them from scratch.
-- WARNING: This will wipe out the old dummy structure.
-- ============================================================

DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS jobs;

CREATE TABLE jobs (
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

CREATE TABLE applications (
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

-- ============================================================
-- Step 2: Insert Junior Investigator
-- ============================================================
INSERT INTO jobs (
    id, title, department, location, type, salary, description, requirements, responsibilities, benefits, status, postedDate, closingDate
) VALUES (
  'snp_job_junior_inv_2026',
  'Junior Investigator',
  'Investigations',
  'Nairobi, Kenya',
  'Full-time',
  'Competitive + Benefits',
  'Spectrum Network International is now hiring a smart, detail-oriented Junior Investigator. If you have a background in criminology or related fields and strong investigative skills, this is your opportunity to build a meaningful career in intelligence and risk management.',
  '["Diploma or Bachelor degree in Criminology, Security Studies or related field","1-2 years experience in a reputable investigation firm","Strong knowledge of surveillance operations","Professional certification in Cybersecurity (added advantage)","Excellent English communication skills","Highly computer literate"]',
  '["Conducting employee background checks and corporate vetting","Assisting senior investigators in fraud cases","Performing surveillance and field operations","Writing accurate investigation reports","Maintaining confidentiality and evidence integrity"]',
  '["Competitive salary with performance bonuses","Professional training and development","Exposure to high-profile investigations","Medical cover"]',
  'open', NOW(), DATE_ADD(CURDATE(), INTERVAL 45 DAY)
);

-- ============================================================
-- Step 3: Insert Virtual Debt Collector
-- ============================================================
INSERT INTO jobs (
    id, title, department, location, type, salary, description, requirements, responsibilities, benefits, status, postedDate, closingDate
) VALUES (
  'snp_job_debt_collector_2026',
  'Virtual Debt Collector',
  'Debt Recovery',
  'Remote (Kenya)',
  'Contract',
  'Commission-Based + Retainer',
  'Spectrum Network International is seeking driven Virtual Debt Collectors to join our Debt Recovery division. This is a remote-first opportunity ideal for individuals available immediately with a working laptop.',
  '["Diploma holder or higher","Must have a working laptop with stable internet","Available to start immediately","Experience in debt collection is an added advantage","Strong communication and negotiation skills"]',
  '["Contacting debtors via phone, email and messaging","Negotiating repayment plans per company policy","Maintaining accurate records of collection activities","Reporting daily progress to line manager"]',
  '["Fully remote - work from anywhere","Attractive commission structure","Flexible work hours","Fast onboarding"]',
  'open', NOW(), DATE_ADD(CURDATE(), INTERVAL 30 DAY)
);

-- ============================================================
-- Step 4: Verify
-- ============================================================
SELECT id, title, department, status, closingDate FROM jobs;
