<!-- 放一些常用的 codes -->
<?php
require_once("macro.php");
// 解析 SESSION['Msg'] 的內容
function getErrMsg()
{
  // 使用 $GLOBALS 拿到 macro.php 的變數
  if ($_SESSION['Msg'] === $GLOBALS['SUCESS_ENROLLMENT']) {
    $Msg = "註冊成功";
  } else if ($_SESSION['Msg'] === $GLOBALS['EMPTY_INPUT_DATA']) {
    $Msg = "欄位不能為空";
  } else if ($_SESSION['Msg'] === $GLOBALS['USED_USERNAME']) {
    $Msg = "此帳號名稱已被使用";
  } else if ($_SESSION['Msg'] === $GLOBALS['ACCOUNT_NOT_FOUNDED']) {
    $Msg = "找不到此帳密組合，請再試一次";
  } else if ($_SESSION['Msg'] === $GLOBALS['EMPTY_COMMENT']) {
    $Msg = "留言還沒填呢";
  } else if ($_SESSION['Msg'] === $GLOBALS['ERROR_SERVER_SIDE']) {
    $Msg = "伺服器端發生錯誤，請稍後再試";
  }

  return $Msg;
}

// 清空 SESSION['Msg'] 的內容
function clearErrMsg() {
  $_SESSION['Msg'] = NULL;
}
