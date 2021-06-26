<!-- 處理 index.php 傳過來的暱稱內容 -->

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

if (empty($_POST['nickname'])) {
  $_SESSION['Msg'] = $EMPTY_NICKNAME;
  header("Location: index.php?page=1");
  die();
}
$username = $_SESSION['username'];
$nickname = $_POST['nickname'];

// 根據 username 更新 nickname
if ($stmt = $conn->prepare("UPDATE users SET nickname=? WHERE username=?")) {
  $stmt->bind_param('ss', $nickname, $username);
  $res = $stmt->execute();
}

if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  die();
}
$_SESSION['Msg'] = $SUCCESS_UPDATE_NICKNAME;
header("Location: index.php?page=1");
?>