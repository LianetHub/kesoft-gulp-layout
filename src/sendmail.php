<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "Тема письма";
$file = $_FILES['file'];

$c = true;
// Формирование самого письма
$title = "Заявка с сайта WMS24";
if (!empty($_POST)) {
  foreach ($_POST as $key => $value) {
    if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
      $body .= "
      " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
        <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
      </tr>
      ";
    }
  }

  $body = "<table style='width: 100%;'>$body</table>";

  // Настройки PHPMailer
  $mail = new PHPMailer\PHPMailer\PHPMailer();

  try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;

    // Настройки вашей почты
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'info@wms24.ru'; // Логин на почте
    $mail->Password   = 'Bh4tAvZrvhYn02mtURUf'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;

    $mail->setFrom('info@wms24.ru', 'WMS24-site'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('info@wms24.ru');

    // Прикрипление файлов к письму
    if (!empty($file['name'][0])) {
      for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
      }
    }

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    $mail->send();
  } catch (Exception $e) {
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
  }
}