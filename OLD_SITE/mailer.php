<?php
switch ($_POST['action']) {
	case 'send':
		$post = (!empty($_POST)) ? true : false;
		if($post) {
			// var_dump($post);
			$name = $_POST['name']?$_POST['name']:'';
			$phone = $_POST['phone']?$_POST['phone']:'';
			$email = $_POST['email']?$_POST['email']:'';
			$message = $_POST['comment']?$_POST['comment']:$_POST['comment'];
				
			// $address = "sergey.fedirko@gmail.com";
			// $address = "oleg.shaporenko@markline.com.ua";
			$address = "granola.eat@gmail.com";
			$copy_email = "oleg.shaporenko@markline.com.ua";
			$from_mail = "noreply@granola.kiev.ua";

			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

			// Дополнительные заголовки
			$headers .= 'From: '. $from_mail . "\r\n";
			$headers .= 'Cc: '. $copy_email . "\r\n";
			// Отправляем
			$sub = "GranOLA - заявка с сайта";
			$mes = "Имя: ".$name."\n\nТелефон: ".$phone."\n\nE-mail: ".$email."\n\nСообщение: ".$message."\n\n";
			$send = mail($address,$sub,$mes,$headers);
			if($send) {
				echo 'Success!';
			} else echo 'error';
		}
	break;
	default:
		# code...
	break;
}

?>