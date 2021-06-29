<!-- 留言板首頁 -->
<!-- 透過 SESSION 拿到登入用戶名稱(username) -->
<!-- 留言區同步更新更改後的暱稱 -->
<!-- 留言可以分頁瀏覽 -->

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
  if ($stmt = $conn->prepare("SELECT * FROM users WHERE username=?")) {
    $stmt->bind_param('s', $username);
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
  $nickname = $row_data['nickname'];
}

// 撈留言 ( 使用 LEFT JOIN 將 comments 與 users 建立關係，方便以後更新 nickname 時，能夠同步更新到留言區 )
// 透過 offset、comments_per_page 實作分頁功能

// 拿到所有留言數量，方便計算總共有多少 pages
$comments_per_page = 5;

if ($stmt = $conn->prepare("
    SELECT U.nickname, U.username, C.content, C.created_at, C.id
    FROM comments as C LEFT JOIN users as U
    ON U.username = C.username
    WHERE C.is_deleted=0
    ORDER BY C.created_at DESC")) {
  $res = $stmt->execute();
}

if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  echo "<h2 class=error_msg>伺服器端發生錯誤，請稍後再試</h2>";
  die();
}

$res = $stmt->get_result();
$row_count = $res->num_rows;
// 拿到全部有多少 page 數量
$total_pages = intval(ceil($row_count / $comments_per_page));

// 預設 queryString 的 page 為 1
$page = 1;
if (!empty($_GET['page'])) { // page = 0 時，return false
  // 檢查 page 範圍是否正確
  if (is_numeric($_GET['page'])) {
    if ($_GET['page'] > $total_pages) {
      $_SESSION['Msg'] = $INVALID_OPERATION;
      header("Location: index.php?page=1");
      die();
    }
    $page = intval($_GET['page']);
  } else {
    $_SESSION['Msg'] = $INVALID_OPERATION;
    header("Location: index.php?page=1");
    die();
  }
} else {
  header("Location: index.php?page=1");
}

// 計算需要跳過多少筆留言
// offset = (page - 1) * comments_per_page
$offset = ($page - 1) *  $comments_per_page;

if ($stmt = $conn->prepare("
    SELECT U.role, U.nickname, U.username, C.content, C.created_at, C.id
    FROM comments as C LEFT JOIN users as U
    ON U.username = C.username
    WHERE C.is_deleted=0
    ORDER BY C.created_at DESC
    LIMIT ? OFFSET ?")) {
  $stmt->bind_param('ii', $comments_per_page, $offset);
  $res = $stmt->execute();
}

if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  echo "<h2 class=error_msg>伺服器端發生錯誤，請稍後再試</h2>";
  die();
}

$res = $stmt->get_result();
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
        $Msg = "歡迎回來～". escape($nickname);
      }
      ?>
      <h2 class="board__info__msg"><?php echo $Msg; ?></h2>
      <div>
        <?php if (empty($username)) { ?>
          <a href="register.php" class="board__info__button">註冊</a>
          <a href="login.php" class="board__info__button">登入</a>
        <?php } else if ($row_data['role'] === '管理員') { ?>
          <button class="board__info__button">編輯暱稱</button>
          <a href="admin.php" class="board__info__button">網站管理</a>
          <a href="logout.php" class="board__info__button">登出</a>
        <?php } else { ?>
          <button class="board__info__button">編輯暱稱</button>
          <a href="logout.php" class="board__info__button">登出</a>
        <?php } ?>
      </div>
    </div>
    <form class="hidden board__form" id="nickname__form" method="POST" action="handle_update_user.php">
      新的暱稱：<input type="text" name="nickname" placeholder="最多可以填寫 20 個字元">
      <input type="hidden" name="user_update_mode" value="1">
      <input type="submit" value="送出">
    </form>
    <?php
    if (!empty($_SESSION['Msg'])) {
      $Msg = getErrMsg();
      echo "<h3 class='warning'>$Msg</h3>";
      clearErrMsg();
    }
    ?>
    <form class="board__form" method="POST" action="handle_new_comment.php">
      <?php if (isset($username)) { ?>
        <?php if (get_permission_add($username)) { ?>
          <textarea name="content" rows="8" placeholder="請輸入留言內容"></textarea>
          <input type='submit' value='送出'>
        <?php } else { ?>
          <textarea name="content" rows="8" readonly>你已被停權，若要恢復留言功能，請洽留言板管理員</textarea>
        <?php } ?>
      <?php } else { ?>
        <textarea name="content" rows="8" placeholder="請輸入留言內容"></textarea>
      <?php } ?>
    </form>
    <div class="board__hr"></div>
    <?php while ($row_data = $res->fetch_assoc()) { ?>
      <div class="comments">
        <div class="comments__avatar"></div>
        <div class="comments__info">
          <div class="comments__info__author">
            <h4 class="comments__info__author__nickname"><?php echo escape($row_data['nickname']) ?> @<?php echo escape($row_data['username']) ?></h4>
            <h4 class="comments__info__author__post-time"><?php echo escape($row_data['created_at']); ?></h4>
          </div>
          <div class="comments__info__operation">
            <?php if (isset($username)) { ?>
              <?php if (get_permission_edit($username, $row_data['username'])) { ?>
                <a href="edit_comments.php?id=<?php echo escape($row_data['id']) ?>" class="comments__operation">編輯留言</a>
              <?php } ?>
              <?php if (get_permission_delete($username, $row_data['username'])) { ?>
                <a href="handle_delete_comment.php?id=<?php echo escape($row_data['id']) ?>" class="comments__operation">刪除留言</a>
              <?php } ?>
            <?php } ?>
          </div>
          <p class="comments__info__content"><?php echo escape($row_data['content']); ?></p>
        </div>
      </div>
    <?php } ?>
    <div class="board__hr"></div>
    <div class="board__paginator">
      <h3>目前位於第 <?php echo $page ?> 頁，總共有 <?php echo $total_pages ?> 頁</h3>
      <div>
        <?php if ($page === 1) { ?>
          <a href="index.php?page=<?php echo $page + 1 ?>" class="board__paginator__button">下一頁</a>
          <a href="index.php?page=<?php echo $total_pages ?>" class="board__paginator__button">最後一頁</a>
        <?php } else if ($page === $total_pages) { ?>
          <a href="index.php?page=1" class="board__paginator__button">第一頁</a>
          <a href="index.php?page=<?php echo $page - 1 ?>" class="board__paginator__button">上一頁</a>
        <?php } else { ?>
          <a href="index.php?page=<?php echo $page - 1 ?>" class="board__paginator__button">上一頁</a>
          <a href="index.php?page=<?php echo $page + 1 ?>" class="board__paginator__button">下一頁</a>
        <?php } ?>
      </div>
    </div>
  </main>
  <script src="index.js"></script>
</body>

</html>