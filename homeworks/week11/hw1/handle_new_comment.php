<!-- 處理 index.php 傳過來的留言內容 -->

<?php
require_once("conn.php");
require_once("macro.php");

// 檢查 SESSION 有無被設定
if (
  !isset($_SESSION['Msg'])      ||
  !isset($_SESSION['username']) ||
  !isset($_SESSION['MsgDetail'])
) {
  session_start();
}

if (empty($_POST['content'])) {
  $_SESSION['Msg'] = $EMPTY_COMMENT;
  header("Location: index.php?page=1");
  die();
}
$username = $_SESSION['username'];
$content = $_POST['content'];

// 將 username, content 寫入資料庫
if ($stmt = $conn->prepare("INSERT INTO comments(username, content) VALUE(?, ?)")) {
  $stmt->bind_param('ss', $username, $content);
  $res = $stmt->execute();
}

if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  die();
}
$_SESSION['Msg'] = $SUCCESS_ADD_COMMENT;
header("Location: index.php?page=1");
?>