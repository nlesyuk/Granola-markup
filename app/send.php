<?php
$Result = array(
	"status" => "ERROR",
	"error" => "Data is empty",
	"data" => "",
);
$MailList = array('pronaza@gmail.com');
$FromName = "GRANOLA Kitchen";
$subject = $FromName." ".time();
$From = "order-zodiac@markline.agency";

$Charset = "utf-8";
$ContentType = "text/html";

$HTMLHeaders = "MIME-Version: 1.0\r\nContent-type: ".$ContentType."; charset=".$Charset."\r\n";
$HTMLHeaders .= "From: ". $FromName ." <". $From .">\r\n";

$mail_to = "";
$i = 0;
foreach($MailList AS $Email){
	$Separator = $i == 0 ? "" : ", ";
	$mail_to .= $Separator . "<" . $Email . ">";
	$i++;
}

$Name = isset($_POST['name']) && !empty($_POST['name']) ? trim($_POST['name']) : "-";
$Phone = isset($_POST['phone']) && !empty($_POST['phone']) ? trim($_POST['phone']) : "-";
$Package = isset($_POST['package']) && !empty($_POST['package']) ? trim($_POST['package']) : "-";
$Message = isset($_POST['message']) && !empty($_POST['message']) ? trim($_POST['message']) : "-";
$Days = isset($_POST['days']) && !empty($_POST['days']) ? trim($_POST['days']) : "не вибрано";
$Price_old = isset($_POST['price_old']) && !empty($_POST['price_old']) ? trim($_POST['price_old']) : "-";
$Price_current = isset($_POST['price_current']) && !empty($_POST['price_current']) ? trim($_POST['price_current']) : "-";

$text = "";

$text .= '<div>'
		. '<h2>Поступив новий заказ </h2>'
		. '<div>Від: '.$Name.'</div>'
		. '<div>Телефон: '.$Phone.'</div>'
		. '<div>Пакет: '.$Package.'</div>'
		. '<div>Кількість днів: '.$Days.'</div>'
		. '<div>Ціна без скидки: '.$Price_old.'</div>'
		. '<div>Ціна зі скидкою: '.$Price_current.'</div>'
		. '<div>Повідомлення від клієнта: '.$Message.'</div>'
		. '</div>';

if(isset($_POST) && !empty($_POST)){
	if(mail($mail_to, $subject, $text, $HTMLHeaders)){
		$Result['status'] = "OK";
		$Result['error'] = "The message has been sent successfully";
	}
}

echo json_encode($Result);
// Header('Location: success.html'); 