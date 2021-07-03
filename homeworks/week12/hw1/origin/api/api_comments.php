<?php
require_once('../conn.php');

$data = array();
$resp = array();

// convert $_POST variables to integer type
$limit = intval($_POST['limit']);
$offset = intval($_POST['offset']);

if ($stmt = $conn->prepare(
  "SELECT U.username as username, U.nickname as nickname, C.content as content, C.created_at as created_at
      FROM users as U
      LEFT JOIN comments as C ON U.username = C.username
      WHERE C.is_deleted = 0
      ORDER BY C.created_at DESC
      LIMIT ? OFFSET ?"
)) {
  $stmt->bind_param("ii", $limit, $offset);
  $res = $stmt->execute();
}

if (!$res) {
  $resp['isSuccessful'] = false;
  die();
}

// generate an array named data
$res = $stmt->get_result();
while ($row = $res->fetch_assoc()) {
  array_push($data, array(
    'username'  => $row['username'],
    'nickname'  => $row['nickname'],
    'content'   => $row['content'],
    'created_at' => $row['created_at']
  ));
}

// get all comments number
if ($stmt = $conn->prepare("SELECT COUNT(*) as count FROM comments WHERE is_deleted=0")) {
  $res = $stmt->execute();
}

if (!$res) {
  $resp['isSuccessful'] = false;
  die();
}

$res = $stmt->get_result();
$row = $res->fetch_assoc();

// pack all information into response json
$resp['totals'] = $row['count'];
$resp['comments'] = $data;
$resp = json_encode($resp);

header('Content-Type: application/json; charset=utf-8');
echo $resp;
