<!-- 放一些常用的 codes -->
<?php

// 解析 SESSION['Msg'] 的內容
function getErrMsg()
{
  require_once("macro.php");

  if ($_SESSION['Msg'] === $SUCESS_ENROLLMENT) {
    $Msg = "註冊成功";
  } else if ($_SESSION['Msg'] === $EMPTY_INPUT_DATA) {
    $Msg = "欄位不能為空";
  } else if ($_SESSION['Msg'] === $USED_USERNAME) {
    $Msg = "此帳號名稱已被使用";
  } else if ($_SESSION['Msg'] === $ACCOUNT_NOT_FOUNDED) {
    $Msg = "找不到此帳密組合，請再試一次";
  } else if ($_SESSION['Msg'] === $EMPTY_COMMENT) {
    $Msg = "留言還沒填呢";
  } else if ($_SESSION['Msg'] === $ERROR_SERVER_SIDE) {
    $Msg = "伺服器端發生錯誤，請稍後再試";
  }

  return $Msg;
}

// 清空 SESSION['Msg'] 的內容
function clearErrMsg() {
  $_SESSION['Msg'] = NULL;
}
