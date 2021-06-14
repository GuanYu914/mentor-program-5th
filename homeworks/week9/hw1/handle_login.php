<!-- 處理 login.php 送過來的資料 -->
<!-- 利用 SESSION 儲存目前錯誤狀態 -->

<?php
require_once("conn.php");
require_once("macro.php");

// 檢查 SESSION 資訊有無被設定
if (!isset($_SESSION['Msg']) ||
    !isset($_SESSION['MsgDetail'])) {
  session_start();
}

$username = $_POST['username'];
$password = $_POST['password'];

if (
  empty($username) ||
  empty($password)
) {
  $_SESSION['Msg'] = $EMPTY_INPUT_DATA;
  $_SESSION['MsgDetail'] = "偵測到空欄位";
  header("Location: login.php");
  die();
}

// 搜尋 SQL 語法
$sql = sprintf(
  "SELECT * From users WHERE username='%s' and password='%s'",
  $username,
  $password
);
$res = $conn->query($sql);

// 檢查 Query 有沒有成功
if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  header("Location: login.php");
  die();
}

// 拿到發送 SQL Query 的結果 ( 通常是列數 )
if ($res->num_rows === 0) {
  $_SESSION['Msg'] = $ACCOUNT_NOT_FOUNDED;
  $_SESSION['MsgDetail'] = "未抓到任何符合資訊";
  header("Location: login.php");
  die();
}

// 透過 SESSION 儲存 username，藉此記住登入狀態
$_SESSION['username'] = $username;
header("Location: index.php");
?>