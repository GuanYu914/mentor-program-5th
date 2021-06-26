<!-- 放一些常用的 codes -->
<?php
require_once("macro.php");
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
  } else if ($_SESSION['Msg'] === $GLOBALS['INVALID_OPERATION']){
    $Msg = "請求的操作無法達成";
  } else if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_EXEC_DELETE']) {
    $Msg = "刪除留言成功";
  } else if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_UPDATE_CONTENT']) {
    $Msg = "更新留言成功";
  } else if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_ADD_COMMENT']) {
    $Msg = "新增留言成功";
  } else if ($_SESSION['Msg'] === $GLOBALS['SUCCESS_UPDATE_NICKNAME']) {
    $Msg = "更新暱稱成功";
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