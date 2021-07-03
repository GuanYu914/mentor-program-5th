<?php
require_once('../conn.php');

// get add value form POST data
$username = $_POST['username'];
$content = $_POST['comment'];

// add comment to DB
if ($stmt = $conn->prepare("INSERT INTO comments(username, content) VALUE(?, ?)")) {
  $stmt->bind_param('ss', $username, $content);
  $res = $stmt->execute();
}

if (!$res) {
  // send error response json
  $resp = array(
    'isSuccessful' => false
  );
  $resp = json_encode($resp);
  header('Content-Type: application/json; charset=utf-8');
  echo $resp;
  die();
}

// send successful response json
$resp = array(
  'isSuccessful' => true
);
$resp = json_encode($resp);
header('Content-Type: application/json; charset=utf-8');
echo $resp;
die();
