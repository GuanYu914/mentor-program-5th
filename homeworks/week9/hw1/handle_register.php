<!-- 處理 register.php 送過來的資料 -->
<!-- 利用 SESSION 儲存目前錯誤狀態 -->

<?php
require_once("conn.php");
require_once("macro.php");

// 檢查 SESSION 資訊有無被設定
if (
  !isset($_SESSION['Msg']) ||
  !isset($_SESSION['MsgDetail'])
) {
  session_start();
}

$nickname = $_POST['nickname'];
$username = $_POST['username'];
$password = $_POST['password'];

if (
  empty($nickname) ||
  empty($username) ||
  empty($password)
) {
  $_SESSION['Msg'] = $EMPTY_INPUT_DATA;
  $_SESSION['MsgDetail'] = "偵測到空欄位";
  header("Location: register.php");
  die();
}

// 新增 SQL 語法
$sql = sprintf(
  "INSERT INTO users(nickname, username, password) VALUES('%s', '%s', '%s')",
  $nickname,
  $username,
  $password
);
$res = $conn->query($sql);

// 檢查 Query 有沒有成功
if (!$res) {
  // issue: Duplicate entry
  if ($conn->errno === 1062) {
    $_SESSION['Msg'] = $USED_USERNAME;
    $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
    header("Location: register.php");
    die();
  }
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  header("Location: register.php");
  die();
}

$_SESSION['Msg'] = $SUCESS_ENROLLMENT;
$_SESSION['MsgDetail'] = "新增用戶資料成功";
header("Location: register.php");
?>