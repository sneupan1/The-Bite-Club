<?php 
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $mailFrom = $_POST['username'];
    $message = $_POST['message'];
    $mailTo = "ptfreel@go.olemiss.edu";
    $headers = "From: ".$mailFrom;
    $txt = "You have received an e-mail from ".$name.".\n\n".$message;
    if (mail($mailTo, $subject, $txt, $headers)){
    	echo "Mail Sent Successfully. Redirecting to contact us page...";
    }else{
    	echo "Mail Not Sent. Redirecting to contact us page...";
    }
    header("refresh:3;url=contactUs.html");
}
?>