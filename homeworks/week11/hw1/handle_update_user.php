<!-- 處理 index.php 傳過來的暱稱內容 -->
<!-- 處理 admin.php 傳過來的用戶資訊-->

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

// 首頁更新暱稱操作
if ($_POST['user_update_mode'] === '1') {

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
    header("Location: index.php?page=1");
    die();
  }

  $_SESSION['Msg'] = $SUCCESS_UPDATE_NICKNAME;
  header("Location: index.php?page=1");
}
// 網站管理頁面更新操作
else if ($_POST['user_update_mode'] === '2') {
  if (empty($_POST['nickname'])) {
    $_SESSION['Msg'] = $EMPTY_NICKNAME;
    header("Location: admin.php");
    die();
  }
  $nickname = $_POST['nickname'];

  // 防止非管理員透過 user_update_mode=2 存取
  if (empty($_POST['username']) || empty($_POST['role'])) {
    $_SESSION['Msg'] = $INVALID_OPERATION;
    header("Location: index.php?page=1");
  }
  $username = $_POST['username'];
  $role = $_POST['role'];

  // 根據 username 更新 nickname 跟 role
  if ($stmt = $conn->prepare("UPDATE users SET nickname=?, role=? WHERE username=?")) {
    $stmt->bind_param("sss", $nickname, $role, $username);
    $res = $stmt->execute();
  }

  if (!$res) {
    $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
    $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
    header("Location: admin.php");
    die();
  }

  $_SESSION['Msg'] = $SUCCESS_UPDATE_USER;
  header("Location: admin.php");
}
// user_update_mode 超出範圍回報錯誤
else {
  $_SESSION['Msg'] = $INVALID_OPERATION;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  header("Location: index.php?page=1");
  die();
}

?>