<!-- 留言板首頁 -->
<!-- 透過 SESSION 拿到登入用戶名稱(username) -->

<?php
require_once("conn.php");
require_once("utils.php");
require_once("macro.php");

// 檢查 SESSION 有無被設定
if (
  !isset($_SESSION['username']) ||
  !isset($_SESSION['Msg'])      ||
  !isset($_SESSION['MsgDetail'])
) {
  session_start();
}

// 透過 SESSION 拿 username
$username = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $sql = sprintf("SELECT * FROM users WHERE username='%s'", $username);
  $res = $conn->query($sql);
  if (!$res) {
    $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
    $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
    echo "<h2 class=error_msg>伺服器端發生錯誤，請稍後再試</h2>";
    die();
  }
  $row_data = $res->fetch_assoc();
  $nickname = $row_data['nickname'];
}

// 撈留言
$sql = sprintf("SELECT * FROM comments ORDER BY created_at DESC");
$res = $conn->query($sql);
if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  echo "<h2 class=error_msg>伺服器端發生錯誤，請稍後再試</h2>";
  die();
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
    <h1 class="board__title">留言板</h1>
    <div class="board__info">
      <?php
      $Msg = "";
      if (empty($username)) {
        $Msg = "訪客您好：需要登入才可以留言喔";
      } else {
        $Msg = "歡迎回來～$nickname";
      }
      ?>
      <h2 class="board__info__msg"><?php echo $Msg; ?></h2>
      <div>
        <?php if (empty($username)) { ?>
          <a href="register.php" class="board__info__button">註冊</a>
          <a href="login.php" class="board__info__button">登入</a>
        <?php } else { ?>
          <a href="logout.php" class="board__info__button">登出</a>
        <?php } ?>
      </div>
    </div>
    <?php
    if (!empty($_SESSION['Msg'])) {
      $Msg = getErrMsg();
      echo "<h3 class='warning'>$Msg</h3>";
      clearErrMsg();
    }
    ?>
    <form class="board__form" method="POST" action="handle_new_comment.php">
      <textarea name="content" rows="8" placeholder="請輸入留言內容"></textarea>
      <?php
      if ($username) {
        echo "<input type='submit' value='送出'>";
      }
      ?>
    </form>
    <div class="board__hr"></div>
    <?php while ($row_data = $res->fetch_assoc()) { ?>
      <div class="comments">
        <div class="comments__avatar"></div>
        <div class="comments__info">
          <div class="comments__info__author">
            <h4 class="comments__info__author__nickname"><?php echo $row_data['nickname'] ?></h4>
            <h4 class="comments__info__author__post-time"><?php echo $row_data['created_at']; ?></h4>
          </div>
          <p class="comments__info__content"><?php echo $row_data['content']; ?></p>
        </div>
      </div>
    <?php } ?>

  </main>

</body>

</html>