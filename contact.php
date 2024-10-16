<?php 
require_once "vendor/autoload.php";

$FulleName   = isset( $_GET['name'] ) ? $_GET['name'] : '';
$EmailAddr   = isset( $_GET['address'] ) ? $_GET['address'] : '';
$Phone_no    = isset( $_GET['phone_no'] ) ? $_GET['phone_no'] : '';
$BestTime    = isset( $_GET['bst_time'] ) ? $_GET['bst_time'] : '';
$BestDate    = isset( $_GET['bst_date'] ) ? $_GET['bst_date'] : '';
$offer_price = isset( $_GET['ofr_price'] ) ? $_GET['ofr_price'] : '';
$emailfrnd   = isset( $_GET['frnd_eml'] ) ? $_GET['frnd_eml'] : '';
$MgsContent  = isset( $_GET['mgs_cntnt'] ) ? $_GET['mgs_cntnt'] : '';
$FormName    = isset( $_GET['FormName'] ) ? $_GET['FormName'] : '';
$nls_email   = isset( $_GET['nls_email'] ) ? $_GET['nls_email'] : '';

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

//Server settings
$mail->SMTPDebug = 3;                      //Enable verbose debug output
$mail->From      = $EmailAddr;
$mail->FromName  = 'Carforyou Html';

if ( $FormName == 'EmailtoFrnd' ) {
    $mail->addAddress( $emailfrnd, 'User' );     // Add a recipient
} else {
    $mail->addAddress('info@webmasterdriver.net', 'User');
}

$mail->addReplyTo('info@example.com', 'Information');
$mail->isHTML(true);                                  // Set email format to HTML

if ( $FormName == 'ScheduleForm' ) {
    $mail->Subject = 'You have a new schedule request';
    $mail->Body    = '<h4>You have received a new schedule request</h4><p>Name:- '.$FulleName.'</p><p>Email:- '.$EmailAddr.'</p><p>Phone:- '.$Phone_no.'</p><p>Best time:- '.$BestTime.'</p><p>Best date:- '.$BestDate.'</p><p>Message:- '.$MgsContent.'</p>';
} elseif ( $FormName == 'MakeAnOffer' ) {
    $mail->Subject = 'You have a new offer request';
    $mail->Body    = '<h4>You have received a new offer</h4><p>Name:- '.$FulleName.'</p><p>Email:- '.$EmailAddr.'</p><p>Phone:- '.$Phone_no.'</p><p>Offer price:- '.$offer_price.'</p><p>Message:- '.$MgsContent.'</p>';
} elseif ( $FormName == 'EmailtoFrnd' ) {
    $mail->Subject = 'You have received a recommendation';
    $mail->Body    = '<h4>You have received a new recommendation request</h4><p>Name:- '.$FulleName.'</p><p>Email:- '.$EmailAddr.'</p><p>Freind Email:- '.$emailfrnd.'</p><p>Message:- '.$MgsContent.'</p>';
} elseif ( $FormName == 'subscribe' ) {
    $mail->Subject = 'New subscriber';
    $mail->Body    = '<h4>You have received a new subscriber</h4><p>Email:- '.$nls_email.'</p>';
} else {
    $mail->Subject = 'You have a new query';
    $mail->Body    = '<h4>You have received a new enquiry</h4><p>Name:- '.$FulleName.'</p><p>Email:- '.$EmailAddr.'</p><p>Phone:- '.$Phone_no.'</p><p>Message:- '.$MgsContent.'</p>';
}


if(!$mail->send()) {
    echo json_encode( array( 'status' => 'error', 'mgs' => 'Message could not be sent' ) );
} else {
    echo json_encode( array( 'status' => 'success', 'mgs' => 'Message sent successfully' ) );
}