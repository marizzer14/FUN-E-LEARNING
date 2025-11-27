<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    // Validation
    $errors = [];
    
    if (empty($name)) $errors[] = "Name is required";
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required";
    if (empty($subject)) $errors[] = "Subject is required";
    if (empty($message) || strlen($message) < 10) $errors[] = "Message must be at least 10 characters";
    
    if (empty($errors)) {
        // Email headers
        $to = "inquiries.feedback@fun.e.learning.com";
        $email_subject = "Fun-E-Learning Inquiry: " . $subject;
        $email_body = "
        Name: $name
        Email: $email
        Subject: $subject
        
        Message:
        $message
        
        Sent: " . date('Y-m-d H:i:s');
        
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        // Send email
        if (mail($to, $email_subject, $email_body, $headers)) {
            echo json_encode(["success" => true, "message" => "Thank you! Your message has been sent."]);
        } else {
            echo json_encode(["success" => false, "message" => "Sorry, there was an error sending your message."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => implode(" ", $errors)]);
    }
}
?>
