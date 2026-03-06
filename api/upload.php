<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

$target_dir = "../uploads/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

if (isset($_FILES["resume"])) {
    $file_extension = pathinfo($_FILES["resume"]["name"], PATHINFO_EXTENSION);
    $new_filename = uniqid('resume_') . '.' . $file_extension;
    $target_file = $target_dir . $new_filename;

    if (move_uploaded_file($_FILES["resume"]["tmp_name"], $target_file)) {
        // Return the full URL or relative path
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
        $host = $_SERVER['HTTP_HOST'];
        $base_url = $protocol . "://" . $host . dirname($_SERVER['PHP_SELF']) . "/../uploads/";
        echo json_encode(["status" => "success", "url" => $base_url . $new_filename, "filename" => $new_filename]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to move uploaded file."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No file uploaded."]);
}
?>
