<!-- 會員註冊頁面 -->
<!-- 透過 SESSION 拿到錯誤狀態 -->

<?php
require_once("conn.php");
require_once("utils.php");

// 檢查 SESSION 有無被設定
if (!isset($_SESSION['Msg']) ||
    !isset($_SESSION['MsgDetail'])
) {
  session_start();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>作業：留言板</title>
</head>

<body>
  <header>
    <h3 class="warning"><strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</strong></h3>
  </header>

  <main class="board">
    <h1 class="board__title">會員註冊</h1>
    <div class="board__info">
      <?php
      $Msg = "";
      if (!empty($_SESSION['Msg'])) {
        echo sprintf("<h2 class='board__info__msg, warning'>%s</h2>", getErrMsg());
        clearErrMsg();
      } else {
        $Msg = "請輸入以下註冊所需資訊";
        echo sprintf("<h2 class='board__info__msg'>%s</h2>", $Msg);
      }
      ?>
      <div>
        <a href="index.php" class="board__info__button">回首頁</a>
        <a href="login.php" class="board__info__button">登入</a>
      </div>
    </div>
    <form class="board__form" method="POST" action="handle_register.php">
      <div>暱稱：<input name="nickname" type="text" placeholder="最多可以填 20 個字元" maxlength="20"></div>
      <div>帳號：<input name="username" type="text" placeholder="最多可以填 12 個字元" maxlength="12"></div>
      <div>密碼：<input name="password" type="password" placeholder="最多可以填 12 個字元" maxlength="12"></div>
      <input type="submit" value="註冊">
    </form>
  </main>

</body>

</html>