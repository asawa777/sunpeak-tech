<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON input
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $to = "sunpeaktech.th@gmail.com";
    $subject = "New Consultation Request: " . ($data['topic'] ?? 'General Inquiry');
    
    $name = $data['name'] ?? 'Unknown';
    $email = $data['email'] ?? 'Unknown'; // Sender email
    $details = $data['details'] ?? 'No details provided';
    
    $message = "
    New consultation request received via website.
    
    Name: $name
    Email: $email
    Topic: " . ($data['topic'] ?? 'Not specified') . "
    
    Project Details:
    $details
    ";
    
    $headers = "From: no-reply@sunpeaktech.com" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if(mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to send email"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
?>
