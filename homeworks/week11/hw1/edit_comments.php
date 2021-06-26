<!-- 編輯留言頁面 -->

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

// 檢查是否有帶 id
if (empty($_GET['id'])) {
  $_SESSION['Msg'] = $EMPTY_COMMENT;
  header("Location: index.php");
  die();
}
$id = $_GET['id'];

// 透過 SESSION 拿 username
$username = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
}

// 透過 id 拿到編輯的留言內容、留言發布者 (防止非作者等人想透過 url 進行非法操作)
if ($stmt = $conn->prepare("SELECT content, username FROM comments WHERE id=?")) {
  $stmt->bind_param('s', $id);
  $res = $stmt->execute();
}

if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  echo "<h2 class=error_msg>伺服器端發生錯誤，請稍後再試</h2>";
  die();
}
$res = $stmt->get_result();
$row_data = $res->fetch_assoc();
$content = $row_data['content'];
$comment_username = $row_data['username'];
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
    <div class="edit_page_header">
      <h1 class="board__title">編輯留言</h1>
      <a href="index.php">回首頁</a>
    </div>
    <?php
    if (!empty($_SESSION['Msg'])) {
      $Msg = getErrMsg();
      echo "<h3 class='warning'>$Msg</h3>";
      clearErrMsg();
    }
    ?>
    <form class="board__form" method="POST" action="handle_update_comment.php">
      <!-- 抓留言內容 -->
      <?php if ($username === $comment_username) { ?>
        <textarea name="content" rows="8"><?php echo $content ?></textarea>
        <input type="hidden" name="id" value="<?php echo $id ?>">
      <?php } else {
        $_SESSION['Msg'] = $INVALID_OPERATION;
        header("Location: index.php");
        die();
      } ?>
      <input type='submit' value='送出'>
    </form>

  </main>
</body>

</html>