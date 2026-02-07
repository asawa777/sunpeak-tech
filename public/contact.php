<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get raw POST data
    $input = json_decode(file_get_contents("php://input"), true);

    $name = strip_tags(trim($input["name"] ?? ""));
    $email = filter_var(trim($input["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($input["subject"] ?? "New Inquiry"));
    $message = strip_tags(trim($input["message"] ?? ""));

    // Basic Validation
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid input data."]);
        exit;
    }

    // Email Configuration
    $to = "info@sunpeak.tech"; // REPLACE WITH ACTUAL EMAIL
    $email_subject = "Website Contact: $subject";
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send Email
    if (mail($to, $email_subject, $email_content, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Message sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to send message."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
}
?>