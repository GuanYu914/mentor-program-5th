<?php
// 定義錯誤代碼
$SUCCESS_ENROLLMENT         = 1;
$SUCCESS_UPDATE_CONTENT     = 2;
$SUCCESS_ADD_COMMENT        = 3;
$SUCCESS_UPDATE_NICKNAME    = 4;
$SUCCESS_UPDATE_USER        = 5;
$SUCCESS_ADD_PERMISSION     = 6;
$SUCCESS_UPDATE_PERMISSION  = 7;
$SUCCESS_EXEC_DELETE        = 8;
$SUCCESS_DELETE_PERMISSION  = 9;

$EMPTY_INPUT_DATA           = 10;
$EMPTY_COMMENT              = 11;
$EMPTY_NICKNAME             = 12;

$USED_USERNAME              = 13;
$USED_ROLE                  = 14;
$ROLE_USERS_EXISTED         = 15;

$ACCOUNT_NOT_FOUNDED        = 16;
$PASSWORD_NOT_FOUNDED       = 17;

$ERROR_SERVER_SIDE          = 9999;
$INVALID_OPERATION          = 10000;


// 定義身分權限 (適用於 permission table)
// 針對留言新增權限
$ADD_ENABLE             = 100;
$ADD_DISABLE            = 101;
// 針對留言編輯權限
$EDIT_ONLY_SELF         = 102;
$EDIT_FOR_ALL           = 103;
$EDIT_FOR_NONE          = 104;
// 針對留言刪除權限
$DELETE_ONLY_SELF       = 105;
$DELETE_FOR_ALL         = 106;
$DELETE_FOR_NONE        = 107;
?>