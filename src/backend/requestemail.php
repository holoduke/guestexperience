<?php

error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");
// requestemail.php
header('Content-Type: application/json; charset=UTF-8');

// Retrieve POST data
$guestName = $_POST['guestName'] ?? 'Guest';
$hotel = $_POST['hotel'] ?? 'our hotel';
$reservationNumber = $_POST['reservationNumber'] ?? '';
$checkIn = $_POST['checkIn'] ?? '';
$checkOut = $_POST['checkOut'] ?? '';
$guestEmail = $_POST['email'] ?? null; // expecting a guestEmail field

//print_r($_POST);
if (!$guestEmail) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Guest email address is required."]);
    exit;
}

// Recipient
$to = filter_var($guestEmail, FILTER_VALIDATE_EMAIL);
if (!$to) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid email address."]);
    exit;
}

// Subject
$subject = "Your Reservation Confirmation - $hotel";

// Build HTML message body
$message  = "<html><body>";
$message .= "<h2>Dear " . htmlspecialchars($guestEmail, ENT_QUOTES) . ",</h2>";
$message .= "<p>Thank you for choosing <strong>" . htmlspecialchars($hotel, ENT_QUOTES) . "</strong> for your stay.</p>";
$message .= "<p><strong>Reservation Details:</strong><br>";
$message .= "Reservation Number: " . htmlspecialchars($reservationNumber, ENT_QUOTES) . "<br>";
$message .= "Check-in Date: " . htmlspecialchars($checkIn, ENT_QUOTES) . "<br>";
$message .= "Check-out Date: " . htmlspecialchars($checkOut, ENT_QUOTES) . "</p>";
$message .= "<p>You can manage your reservation and access your digital concierge via our app:</p>";
$message .= "<p><a href=\"https://guestexperiencenow.com?reservationid=".$reservationNumber."\">Open Guest Experience App</a></p>";
$message .= "<p>We look forward to welcoming you soon!</p>";
$message .= "<p>Best regards,<br>The " . htmlspecialchars($hotel, ENT_QUOTES) . " Team</p>";
$message .= "</body></html>";

// Headers for HTML email
$headers  = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: no-reply@" . preg_replace('/[^a-z0-9\-\.]/i', '', parse_url($_SERVER['HTTP_HOST'], PHP_URL_HOST) ?: 'guestexperiencenow.com') . "\r\n";

// Send the email
$success = mail($to, $subject, $message, $headers);

//echo $to."\n";
//echo $subject."\n";
//echo $message."\n";
//echo $headers."\n";
//print_r($success);

if ($success) {
    echo json_encode(["status" => "success", "message" => "Email sent successfully."]);
} else {
    http_response_code(500);
    error_log("Mail send failed: to=$to, subject=$subject");
    echo json_encode(["status" => "error", "message" => "Failed to send email. Please try again later."]);
}
