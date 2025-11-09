<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $phone   = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    // ====== Email Setup ======
    $to = "darsshan@gmail.com"; // Your email
    $mail_subject = "New Contact Form Submission: " . $subject;
    $body = "
    <h3>New Message from Digital Marblex Contact Form</h3>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Phone:</strong> $phone</p>
    <p><strong>Message:</strong> $message</p>
    ";

    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: <$email>" . "\r\n";

    $mailSent = mail($to, $mail_subject, $body, $headers);

    // ====== WhatsApp Notification ======
    $whatsappNumber = "918886450629"; // include country code (91 for India)
    $whatsappMessage = "Hello Darshan, new form submitted by: $name (%20$email%20$phone). Message: $message";
    $whatsappURL = "https://api.whatsapp.com/send?phone=$whatsappNumber&text=" . urlencode($whatsappMessage);

    if ($mailSent) {
        echo "<script>
            alert('Message sent successfully! Opening WhatsApp notification...');
            window.location.href='$whatsappURL';
        </script>";
    } else {
        echo "<script>
            alert('Failed to send message. Try again later.');
            window.history.back();
        </script>";
    }
}
?>
