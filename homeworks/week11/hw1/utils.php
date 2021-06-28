<!-- 放一些常用的 codes -->
<?php
require_once("macro.php");
require_once("conn.php");

// 解析 SESSION['Msg'] 的內容
function getErrMsg()
{
  // 使用 $GLOBALS 拿到 macro.php 的變數
  if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_ENROLLMENT']) {
    $Msg = "註冊成功";
  } else if ($_SESSION['Msg'] === $GLOBALS['EMPTY_INPUT_DATA']) {
    $Msg = "欄位不能為空";
  } else if ($_SESSION['Msg'] === $GLOBALS['USED_USERNAME']) {
    $Msg = "此帳號名稱已被使用";
  } else if ($_SESSION['Msg'] === $GLOBALS['ACCOUNT_NOT_FOUNDED']) {
    $Msg = "帳號輸入有誤，請再試一次";
  } else if ($_SESSION['Msg'] === $GLOBALS['PASSWORD_NOT_FOUNDED']) {
    $Msg = "密碼輸入有誤，請再試一次";
  } else if ($_SESSION['Msg'] === $GLOBALS['EMPTY_COMMENT']) {
    $Msg = "留言還沒填呢";
  } else if ($_SESSION['Msg'] === $GLOBALS['EMPTY_NICKNAME']) {
    $Msg = "新的暱稱還沒填寫";
  } else if ($_SESSION['Msg'] === $GLOBALS['INVALID_OPERATION']) {
    $Msg = "請求的操作無法達成";
  } else if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_EXEC_DELETE']) {
    $Msg = "刪除留言成功";
  } else if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_UPDATE_CONTENT']) {
    $Msg = "更新留言成功";
  } else if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_ADD_COMMENT']) {
    $Msg = "新增留言成功";
  } else if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_UPDATE_NICKNAME']) {
    $Msg = "更新暱稱成功";
  } else if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_UPDATE_USER']) {
    $Msg = "更新用戶資訊成功";
  } else if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_ADD_PERMISSION']) {
    $Msg = "新增身份權限成功";
  } else if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_UPDATE_PERMISSION']) {
    $Msg = "更新身份權限成功";
  } else if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_DELETE_PERMISSION']) {
    $Msg = "刪除身份權限成功";
  }  else if ($_SESSION['Msg'] === $GLOBALS['USED_ROLE']) {
    $Msg = "已有相同身份名稱存在";
  } else if ($_SESSION['Msg'] === $GLOBALS['ROLE_USERS_EXISTED']) {
    $Msg = "仍有其他用戶套用此權限，請將他們移除後再試";
  } else if ($_SESSION['Msg'] === $GLOBALS['ERROR_SERVER_SIDE']) {
    $Msg = "伺服器端發生錯誤，請稍後再試";
  }

  return $Msg;
}

// 清空 SESSION['Msg'] 的內容
function clearErrMsg() {
  $_SESSION['Msg'] = NULL;
}

// 將 html 特殊字元解析成字串，防止被當作程式碼運行 (XSS Attack)
function escape ($str) {
  return htmlspecialchars($str);
}

// 根據用戶名稱(username)是否有新增留言權限
// 可以新增留言，return true
// 不可新增留言，return false
function get_permission_add($user)
{
  if ($stmt = $GLOBALS['conn']->prepare("
  SELECT P.add_permission 
  FROM permission as P LEFT JOIN users as U 
  ON U.role = P.role 
  WHERE U.username = ?")) {
    $stmt->bind_param('s', $user);
    $res = $stmt->execute();
  }

  if (!$res) {
    $_SESSION['Msg'] = $GLOBALS['ERROR_SERVER_SIDE'];
    $_SESSION['MsgDetail'] = $GLOBALS['conn']->errno . ": " . $GLOBALS['conn']->error;
    die();
  }

  $res = $stmt->get_result();
  $row_data = $res->fetch_assoc();

  if (intval($row_data['add_permission']) === $GLOBALS['ADD_ENABLE']) {
    return true;
  } else if (intval($row_data['add_permission']) === $GLOBALS['ADD_DISABLE']) {
    return false;
  } else {
    return false;
  }
}

// 根據用戶名稱 ( username ) 跟留言發布者 ( comment_user ) 是否有編輯留言權限
// 可以編輯，return true
// 不可編輯，return false
function get_permission_edit($user, $comment_user)
{
  if ($stmt = $GLOBALS['conn']->prepare("
  SELECT P.edit_permission 
  FROM permission as P LEFT JOIN users as U 
  ON U.role = P.role 
  WHERE U.username = ?")) {
    $stmt->bind_param('s', $user);
    $res = $stmt->execute();
  }

  if (!$res) {
    $_SESSION['Msg'] = $GLOBALS['ERROR_SERVER_SIDE'];
    $_SESSION['MsgDetail'] = $GLOBALS['conn']->errno . ": " . $GLOBALS['conn']->error;
    die();
  }

  $res = $stmt->get_result();
  $row_data = $res->fetch_assoc();

  if (intval($row_data['edit_permission']) === $GLOBALS['EDIT_ONLY_SELF']) {
    if ($user !== $comment_user) {
      return false;
    } else {
      return true;
    }
  } else if (intval($row_data['edit_permission']) === $GLOBALS['EDIT_FOR_ALL']) {
    if ($user !== $comment_user) {
      return true;
    } else {
      return true;
    }
  } else if (intval($row_data['edit_permission']) === $GLOBALS['EDIT_FOR_NONE']) {
    return false;
  }
}

// 根據用戶名稱 ( username ) 跟留言發布者 ( comment_user ) 是否有刪除留言權限
// 可以刪除，return true
// 不可刪除，return false
function get_permission_delete($user, $comment_user)
{
  if ($stmt = $GLOBALS['conn']->prepare("
  SELECT P.delete_permission 
  FROM permission as P LEFT JOIN users as U 
  ON U.role = P.role 
  WHERE U.username = ?")) {
    $stmt->bind_param('s', $user);
    $res = $stmt->execute();
  }

  if (!$res) {
    $_SESSION['Msg'] = $GLOBALS['ERROR_SERVER_SIDE'];
    $_SESSION['MsgDetail'] = $GLOBALS['conn']->errno . ": " . $GLOBALS['conn']->error;
    die();
  }

  $res = $stmt->get_result();
  $row_data = $res->fetch_assoc();

  if (intval($row_data['delete_permission']) === $GLOBALS['DELETE_ONLY_SELF']) {
    if ($user !== $comment_user) {
      return false;
    } else {
      return true;
    }
  } else if (intval($row_data['delete_permission']) === $GLOBALS['DELETE_FOR_ALL']) {
    if ($user !== $comment_user) {
      return true;
    } else {
      return true;
    }
  } else if (intval($row_data['delete_permission']) === $GLOBALS['DELETE_FOR_NONE']) {
    return false;
  }
}

// 將 permission 代碼轉換成人性化語言
function sql_decode_permission($encode_permission) {
  $encode_permission = intval($encode_permission);

  if ($encode_permission === $GLOBALS['ADD_ENABLE']) {
    $decode_permission = "可以新增留言";
  } else if ($encode_permission === $GLOBALS['ADD_DISABLE']) {
    $decode_permission = "不可新增留言";
  } else if ($encode_permission === $GLOBALS['EDIT_ONLY_SELF']) {
    $decode_permission = "只能編輯自身留言";
  } else if ($encode_permission === $GLOBALS['EDIT_FOR_ALL']) {
    $decode_permission = "可以編輯所有用戶留言";
  } else if ($encode_permission === $GLOBALS['EDIT_FOR_NONE']) {
    $decode_permission = "不可編輯所有用戶留言";
  } else if ($encode_permission === $GLOBALS['DELETE_ONLY_SELF']) {
    $decode_permission = "只能刪除自身留言";
  } else if ($encode_permission === $GLOBALS['DELETE_FOR_ALL']) {
    $decode_permission = "可以刪除所有用戶留言";
  } else if ($encode_permission === $GLOBALS['DELETE_FOR_NONE']) {
    $decode_permission = "不可刪除所有用戶留言";
  }
  
  return $decode_permission;
}
?>