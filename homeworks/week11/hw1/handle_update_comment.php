<!-- 處理 edit_comment.php 傳過來的留言內容 -->

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
$content = $_POST['content'];
$id = $_POST['id'];

// 將 username, content 寫入資料庫
if ($stmt = $conn->prepare("UPDATE comments SET content=? WHERE id=?")) {
  $stmt->bind_param('si', $content, $id);
  $res = $stmt->execute();
}

if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  die();
}
$_SESSION['Msg'] = $SUCCESS_UPDATE_CONTENT;
header("Location: index.php?page=1");
?>