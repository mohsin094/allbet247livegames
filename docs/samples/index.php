<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$adminSession = null;
$userId = null;

// login as admin
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://localhost/backgammon/backend/web/user/auth/login',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => ['Content-type: application/json'],
  CURLOPT_POSTFIELDS =>'{
    "username": "admin@admin.com",
    "password": "admin"
}',
));

$res = curl_exec($curl);

curl_close($curl);

$res = json_decode($res);

if($res->result) {
	$adminSession = $res->params->sessionId;
}


// set callback (webhook) url


// create a user
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://localhost/backgammon/backend/web/user/auth/register',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => ['Content-type: application/json'],
  CURLOPT_POSTFIELDS =>'{
    "email": "sample@sample.com",
    "password": "sample",
    "password_repeat": "sample",
    "avatar": "1"
}',
));

$res = curl_exec($curl);

curl_close($curl);

$res = json_decode($res);

//activate user
if($res->result) {
	$userId = $res->params->userId;

	$curl = curl_init();
	curl_setopt_array($curl, array(
	  CURLOPT_URL => 'http://localhost/backgammon/backend/web/user/admin/update?userId='.$userId,
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_FOLLOWLOCATION => true,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => 'POST',
	  CURLOPT_HTTPHEADER => ['Content-type: application/json',"X-SID-TOKEN: $adminSession"],
	  CURLOPT_POSTFIELDS =>'{
	    "status": "active"
	}'
	));

	$res = curl_exec($curl);

	curl_close($curl);

	$res = json_decode($res);
// add balance to user

	$curl = curl_init();
	curl_setopt_array($curl, array(
	  CURLOPT_URL => 'http://localhost/backgammon/backend/web/user/admin/update?userId='.$userId,
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_FOLLOWLOCATION => true,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => 'POST',
	  CURLOPT_HTTPHEADER => ['Content-type: application/json',"X-SID-TOKEN: $adminSession"],
	  CURLOPT_POSTFIELDS =>'{
	    "balance": "1000"
	}'
	));

	$res = curl_exec($curl);

	curl_close($curl);

	print_r($res);
	$res = json_decode($res);

// redirect user to backgammon

}





?>