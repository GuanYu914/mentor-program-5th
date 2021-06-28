<!-- 網站管理員頁面 -->
<!-- 看到所有留言板的所有使用者 -->
<!-- 調整個別使用者的身分 -->

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
$username = $_SESSION['username'];

if ($stmt = $conn->prepare("SELECT nickname, role FROM users WHERE username=?")) {
  $stmt->bind_param("s", $username);
  $res = $stmt->execute();
}

if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  header("Location: index.php?page=1");
  die();
}

$res = $stmt->get_result();
$row_data = $res->fetch_assoc();

// 檢查是否有人透過非法 URL 進入此頁面
if ($row_data['role'] !== "管理員") {
  $_SESSION['Msg'] = $INVALID_OPERATION;
  header("Location: index.php?page=1");
  die();
}
$nickname = $row_data['nickname'];

// 撈出所有用戶資訊
if ($stmt = $conn->prepare("SELECT nickname, username, role FROM users WHERE role NOT IN('管理員') ORDER BY created_at DESC")) {
  $res = $stmt->execute();
}

if (!$res) {
  $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
  $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
  header("Location: index.php?page=1");
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
    <h1 class="board__title">網站管理</h1>
    <div class="board__info">
      <h2 class="board__info__msg">您可以變更所有非管理員用戶的資訊</h2>
      <div>
        <a href="permission.php" class="board__info__button">編輯身分權限</a>
        <a href="index.php?page=1" class="board__info__button">回首頁</a>
      </div>
    </div>
    <div class="board__users">
      <?php
      if (!empty($_SESSION['Msg'])) {
        $Msg = getErrMsg();
        echo "<h3 class='warning'>$Msg</h3>";
        clearErrMsg();
      }
      ?>
      <?php while ($row_data = $res->fetch_assoc()) { ?>
        <form class="board__users__detail" method="POST" action="handle_update_user.php">
          <div class="board__users__username">
            <label for="username">帳號名稱：</label>
            <p><?php echo escape($row_data['username']) ?></p>
          </div>
          <div class="board__users__nickname">
            <label for="nickname">帳號暱稱：</label>
            <input type="text" name="nickname" value="<?php echo escape($row_data['nickname']) ?>">
          </div>
          <div class="board__users__role">
            <label for="role">用戶身分：</label>
            <select name="role" for="role">
              <?php
              if ($stmt = $conn->prepare("SELECT role FROM permission WHERE 1")) {
                $res_role = $stmt->execute();
              }

              if (!$res_role) {
                $_SESSION['Msg'] = $ERROR_SERVER_SIDE;
                $_SESSION['MsgDetail'] = $conn->errno . ": " . $conn->error;
                die();
              }

              $res_role = $stmt->get_result();

              while ($row_role = $res_role->fetch_assoc()) { ?>
                <option value="<?php echo escape($row_role['role']) ?>" <?php echo escape($row_data['role']) === escape($row_role['role']) ? 'selected' : '' ?>><?php echo escape($row_role['role']) ?></option>
              <?php } ?>
            </select>
          </div>
          <input type="hidden" name="username" value="<?php echo escape($row_data['username']) ?>">
          <input type="hidden" name="user_update_mode" value="2">
          <input type="submit" value="變更">
        </form>
      <?php } ?>
    </div>
  </main>
</body>

</html>