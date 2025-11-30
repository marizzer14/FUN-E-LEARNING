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
        // Email configuration
        $to = "inquiries.feedback@fun.e.learning.com";
        $email_subject = "Fun-E-Learning Inquiry: " . $subject;
        
        // Email content
        $email_body = "
        New Feedback/Inquiry Received from Fun-E-Learning Website
        
        ===========================================
        CONTACT INFORMATION:
        ===========================================
        Name: $name
        Email: $email
        Subject: $subject
        Date: " . date('F j, Y, g:i a') . "
        
        ===========================================
        MESSAGE:
        ===========================================
        $message
        
        ===========================================
        TECHNICAL DETAILS:
        ===========================================
        IP Address: {$_SERVER['REMOTE_ADDR']}
        User Agent: {$_SERVER['HTTP_USER_AGENT']}
        ";
        
        // Email headers
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Send email
        if (mail($to, $email_subject, $email_body, $headers)) {
            // Success - redirect back with success message
            header('Location: index.html?message=success');
            exit;
        } else {
            // Error - redirect back with error message
            header('Location: index.html?message=error');
            exit;
        }
    } else {
        // Validation errors - redirect back with error message
        header('Location: index.html?message=validation_error');
        exit;
    }
} else {
    // Invalid request method
    header('Location: index.html?message=invalid_request');
    exit;
}
?>
