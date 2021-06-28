<!-- 處理 permission.php 傳過來的權限 -->

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

// 確認 input 欄位是否為空
if (empty($_POST['role_name'])) {
  $_SESSION['Msg'] = $EMPTY_INPUT_DATA;
  header("Location: permission.php");
  die();
}
$role_name = $_POST['role_name'];

// 拿到 add permission
if ($_POST['role_add'] === 'ADD_ENABLE') {
  $role_add = $ADD_ENABLE;
} else if ($_POST['role_add'] === 'ADD_DISABLE') {
  $role_add = $ADD_DISABLE;
} else { // 代表有被人竄改過
  $_SESSION['Msg'] = $INVALID_OPERATION;
  header("Location: permission.php");
}

// 拿到 edit permission
if ($_POST['role_edit'] === 'EDIT_ONLY_SELF') {
  $role_edit = $EDIT_ONLY_SELF;
} else if ($_POST['role_edit'] === 'EDIT_FOR_ALL') {
  $role_edit = $EDIT_FOR_ALL;
} else if ($_POST['role_edit'] === 'EDIT_FOR_NONE') {
  $role_edit = $EDIT_FOR_NONE;
} else { // 代表有被人竄改過
  $_SESSION['Msg'] = $INVALID_OPERATION;
  header("Location: permission.php");
}

// 拿到 delete permission
if ($_POST['role_delete'] === 'DELETE_ONLY_SELF') {
  $role_delete = $DELETE_ONLY_SELF;
} else if ($_POST['role_delete'] === 'DELETE_FOR_ALL') {
  $role_delete = $DELETE_FOR_ALL;
} else if ($_POST['role_delete'] === 'DELETE_FOR_NONE') {
  $role_delete = $DELETE_FOR_NONE;
} else { // 代表有被人竄改過
  $_SESSION['Msg'] = $INVALID_OPERATION;
  header("Location: permission.php");
}

// 新增非預設身份
if ($_POST['permission_update_mode'] === '新增') {
  if ($stmt = $conn->prepare("INSERT INTO permission (role, add_permission, edit_permission, delete_permission) VALUE (?, ?, ?, ?)")) {
    $stmt->bind_param('ssss', $role_name, $role_add, $role_edit, $role_delete);
    $res = $stmt->execute();
  }

  if (!$res) {
    // 找到相同的身份名稱
    if ($conn->errno === 1062) {
      $_SESSION['Msg'] = $USED_ROLE;
      $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
      header("Location: permission.php");
      die();
    }

    $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
    $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
    header("Location: permission.php");
    die();
  }

  $_SESSION['Msg'] = $SUCCESS_ADD_PERMISSION;
  header("Location: permission.php");
}
// 更新目前身份權限 
else if ($_POST['permission_update_mode'] === '更新') {
  // 6.27 目前沒有對 id 做資安處理，可以從前端改 POST 資訊
  $role_id = intval($_POST['role_id']);

  //  根據 id 到 permission table，拿到原先身分權限
  if ($stmt = $conn->prepare("SELECT role FROM permission WHERE id=?")) {
    $stmt->bind_param('i', $role_id);
    $res = $stmt->execute();
  }

  if (!$res) {
    $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
    $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
    header("Location: permission.php");
    die();
  }
  $res = $stmt->get_result();
  $sql_res_role = $res->fetch_assoc()['role'];

  // 在 permission table 中，將原先的身分權限改成後來更新的
  if ($stmt = $conn->prepare("UPDATE permission SET role=?, add_permission=?, edit_permission=?, delete_permission=? WHERE id=?")) {
    $stmt->bind_param("ssssi", $role_name, $role_add, $role_edit, $role_delete, $role_id);
    $res = $stmt->execute();
  }

  if (!$res) {
    // 找到相同的身份名稱
    if ($conn->errno === 1062) {
      $_SESSION['Msg'] = $USED_ROLE;
      $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
      header("Location: permission.php");
      die();
    }

    $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
    $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
    header("Location: permission.php");
    die();
  } 
  // 若沒有找到相關重複的身分名稱，則同步更新到 users
  else {
    // 更新 users 既有的 id 的原先身分權限 
    if ($stmt = $conn->prepare("UPDATE users SET role=? WHERE users.role=?")) {
      $stmt->bind_param('ss', $role_name, $sql_res_role);
      $res = $stmt->execute();
    }
    if (!$res) {
      $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
      $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
      header("Location: permission.php");
      die();
    }
  }

  $_SESSION['Msg'] = $SUCCESS_UPDATE_PERMISSION;
  header("Location: permission.php");
}
// 刪除目前身份權限 
else if ($_POST['permission_update_mode'] === '刪除') {
  // 6.27 目前沒有對 id 做資安處理，可以從前端改 POST 資訊
  $role_id = $_POST['role_id'];

  // 先搜尋所有用戶當中是否有相對應權限，如果有提示管理員需把該用戶身份權限撤銷
  if ($stmt = $conn->prepare("SELECT username FROM users  LEFT JOIN permission ON users.role = permission.role WHERE permission.id=?")) {
    $stmt->bind_param('i', $role_id);
    $res = $stmt->execute();
  }

  if (!$res) {
    $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
    $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
    header("Location: permission.php");
    die();
  }

  $res = $stmt->get_result();
  // 代表仍有該權限套用的用戶存在
  if ($res->num_rows > 0) {
    $_SESSION['Msg'] = $ROLE_USERS_EXISTED;
    header("Location: permission.php");
    die();
  }

  // hard delete
  if ($stmt = $conn->prepare("DELETE FROM permission WHERE id=?")) {
    $stmt->bind_param("i", $role_id);
    $res = $stmt->execute();
  }

  if (!$res) {
    $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
    $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
    header("Location: permission.php");
    die();
  }

  $_SESSION['Msg'] = $SUCCESS_DELETE_PERMISSION;
  header("Location: permission.php");
}
?>