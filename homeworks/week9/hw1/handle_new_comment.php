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
  header("Location: index.php");
  die();
}
$username = $_SESSION['username'];
$content = $_POST['content'];

// 根據 username 拿到 nickname
$sql = sprintf("SELECT * FROM users WHERE username='%s'", $username);
$res = $conn->query($sql);
if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  die();
}
$row_data = $res->fetch_assoc();
$nickname = $row_data['nickname'];

// 將 nickname, content 寫入資料庫
$sql = sprintf("INSERT INTO comments(nickname, content) VALUE('%s', '%s')", $nickname, $content, $username);
$res = $conn->query($sql);
if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  die();
}

header("Location: index.php");
?>