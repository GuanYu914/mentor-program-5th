<!-- 刪除 index.php 的留言內容 -->
<!-- 採用 soft delete 方式 -->

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

if (empty($_GET['id'])) {
  $_SESSION['Msg'] = $INVALID_OPERATION;
  header("Location: index.php");
  die();
}
$id = $_GET['id'];

// 拿到該留言的用戶
if ($stmt = $conn->prepare("SELECT username FROM comments WHERE id=?")) {
  $stmt->bind_param('i', $id);
  $res = $stmt->execute();
}

if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  die();
}
$res = $stmt->get_result();
$comment_username = $res->fetch_assoc()['username'];

// 為非本人刪除，發送 error 錯誤訊息
if ($comment_username !== $_SESSION['username']) {
  $_SESSION['Msg'] = $INVALID_OPERATION;
  header("Location: index.php?page=1");
} else {
  // Soft delete
  if ($stmt = $conn->prepare("UPDATE comments SET is_deleted=1 WHERE id=?")) {
    $stmt->bind_param('i', $id);
    $res = $stmt->execute();
  }

  if (!$res) {
    $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
    $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
    die();
  }
  $_SESSION['Msg'] = $SUCCESS_EXEC_DELETE;
  header("Location: index.php?page=1");
}
?>