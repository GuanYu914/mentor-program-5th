<!-- 會員登出操作 -->
<!-- 負責清除 SESSION -->
<?php 
  if (!isset($_SESSION)) {
    session_start();
  }
  $_SESSION = array();
  header("Location: index.php");
  session_destroy();
?>