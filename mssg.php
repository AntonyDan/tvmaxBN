<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<?
if(empty($_POST["TOKEN"]) && !empty($_POST["NAME"]) && !empty($_POST["PHONE"]) && !empty($_POST["MESSAGE"])) {
	$title = "Заполнена форма на tvmax.by";
	$emailTo = "verenik@bn.by";
	$params = array(
	    "LOGIN" => "importlead",
	    "PASSWORD" => "import123lead",
	    "TITLE" => $title,
	    "ASSIGNED_BY_ID" => 132,//Наталья Вереник
	    "STATUS_ID" => "ASSIGNED",
	    "NAME" => htmlspecialchars($_POST["NAME"]),
	    "PHONE_HOME"  => htmlspecialchars($_POST["PHONE"]),
	    "ADDRESS" => htmlspecialchars($_POST["ADDRESS"]),
	    "COMMENTS" => htmlspecialchars($_POST["MESSAGE"])
  	);
  
	$postdata = "";
	foreach ( $params as $key => $value )
    	$postdata .= "&".rawurlencode($key)."=".rawurlencode($value);
	$postdata = substr( $postdata, 1 );
  
  	$curl = curl_init("https://bitrix.bn.by/crm/configs/import/lead.php");         
  	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  	curl_setopt($curl, CURLOPT_TIMEOUT, 100); 
  	curl_setopt($curl, CURLOPT_POST, true);
  	curl_setopt($curl, CURLOPT_POSTFIELDS, $postdata);
  	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  	$result = curl_exec($curl);
  	if(!curl_errno($curl)) {
    	echo "er: ".$result;
  	}
  	else {
    	echo curl_error($curl);
  	}
  	curl_close($curl); 
  
	//отправка почты
  	$message = 	"Ф.И.О.: ".$params["NAME"]."<br>".
  				"Адрес: ".$params["ADDRESS"]."<br>".
  				"Контактный телефон: ".$params["PHONE_HOME"]."<br>".
  				"Сообщение: ".$params["COMMENTS"];
  	$headers= "MIME-Version: 1.0\r\n";
  	$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
  	$headers .= "From: Info Tvmax <info@tvmax.by>\r\n";
  	mail($emailTo, $title, $message, $headers);
}
?>