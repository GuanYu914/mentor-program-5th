<!-- 網站管理員頁面 -->
<!-- 調整身份權限 -->

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

// 撈出所有權限資訊
if ($stmt = $conn->prepare("SELECT * FROM permission ORDER BY id ASC")) {
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
      <h2 class="board__info__msg">您可以自定義身份以及其相關權限</h2>
      <div>
        <a href="admin.php" class="board__info__button">編輯用戶資訊</a>
        <a href="index.php?page=1" class="board__info__button">回首頁</a>
      </div>
    </div>
    <div class="board__permission">
      <?php
      if (!empty($_SESSION['Msg'])) {
        $Msg = getErrMsg();
        echo "<h3 class='warning'>$Msg</h3>";
        clearErrMsg();
      }
      ?>
      <div class="board__permission__add">
        <h2>新增身份資訊</h2>
        <form class="add_form" action="handle_update_permission.php" method="POST">
          <div class="role_name">
            <label for="role_name">身分名稱：</label>
            <input type="text" name="role_name" placeholder="最多可以填寫 12 個字" maxlength="12">
          </div>
          <div class="role_add">
            <label for="role_add">新增權限：</label>
            <select name="role_add">
              <option value="ADD_ENABLE">可以新增留言</option>
              <option value="ADD_DISABLE">不可新增留言</option>
            </select>
          </div>
          <div class="role_edit">
            <label for="role_edit">編輯權限：</label>
            <select name="role_edit">
              <option value="EDIT_ONLY_SELF">只能編輯自身留言</option>
              <option value="EDIT_FOR_ALL">可以編輯所有用戶留言</option>
              <option value="EDIT_FOR_NONE">不能編輯任何留言</option>
            </select>
          </div>
          <div class="role_delete">
            <label for="role_delete">刪除權限：</label>
            <select name="role_delete">
              <option value="DELETE_ONLY_SELF">只能刪除自身留言</option>
              <option value="DELETE_FOR_ALL">可以刪除所有用戶留言</option>
              <option value="DELETE_FOR_NONE">不能刪除任何留言</option>
            </select>
          </div>
          <input type="submit" name="permission_update_mode" value="新增">
        </form>
      </div>

      <div class="board__permission__roles">
        <h2>列出目前每個身份的權限</h2>
        <!-- 預設身份樣式 -->
        <?php while ($row_data = $res->fetch_assoc()) { ?>
          <?php if ($row_data['role'] === "管理員" || $row_data['role'] === "一般用戶") { ?>
            <div class="role_not_modified">
              <h3><?php echo escape($row_data['role']) . " ( 不可修改 )" ?></h3>
              <div class="role_name">
                <label for="role_name">身份名稱：</label>
                <span><?php echo escape($row_data['role']) ?></span>
              </div>
              <div class="role_add">
                <label for="role_add">新增權限：</label>
                <span><?php echo sql_decode_permission($row_data['add_permission']) ?></span>
              </div>
              <div class="role_edit">
                <label for="role_edit">編輯權限：</label>
                <span><?php echo sql_decode_permission($row_data['edit_permission']) ?></span>
              </div>
              <div class="role_delete">
                <label for="role_delete">刪除權限：</label>
                <span><?php echo sql_decode_permission($row_data['delete_permission']) ?></span>
              </div>
            </div>
          <?php } else { ?>
            <!-- 非預設身份樣式 -->
            <form class="role_modified" action="handle_update_permission.php" method="POST"">
              <h3><?php echo escape($row_data['role']) ?></h3>
              <div class="role_name">
                <label for="role_name">身份名稱：</label>
                <input type="text" name="role_name" maxlength="12" value="<?php echo escape($row_data['role']) ?>">
              </div>
              <div class="role_add">
                <label for="role_add">新增權限：</label>
                <select name="role_add">
                  <option value="ADD_ENABLE" <?php echo intval($row_data['add_permission']) === $ADD_ENABLE ? 'selected' : '' ?>>可以新增留言</option>
                  <option value="ADD_DISABLE" <?php echo intval($row_data['add_permission']) === $ADD_DISABLE ? 'selected' : '' ?>>不可新增留言</option>
                </select>
              </div>
              <div class="role_edit">
                <label for="role_edit">編輯權限：</label>
                <select name="role_edit">
                  <option value="EDIT_ONLY_SELF" <?php echo intval($row_data['edit_permission']) === $EDIT_ONLY_SELF ? 'selected' : '' ?>>只能編輯自身留言</option>
                  <option value="EDIT_FOR_ALL" <?php echo intval($row_data['edit_permission']) === $EDIT_FOR_ALL ? 'selected' : '' ?>>可以編輯所有用戶留言</option>
                  <option value="EDIT_FOR_NONE" <?php echo intval($row_data['edit_permission']) === $EDIT_FOR_NONE ? 'selected' : '' ?>>不能編輯任何留言</option>
                </select>
              </div>
              <div class="role_delete">
                <label for="role_delete">刪除權限：</label>
                <select name="role_delete">
                  <option value="DELETE_ONLY_SELF" <?php echo intval($row_data['delete_permission']) === $DELETE_ONLY_SELF ? 'selected' : '' ?>>只能刪除自身留言</option>
                  <option value="DELETE_FOR_ALL" <?php echo intval($row_data['delete_permission']) === $DELETE_FOR_ALL ? 'selected' : '' ?>>可以刪除所有用戶留言</option>
                  <option value="DELETE_FOR_NONE" <?php echo intval($row_data['delete_permission']) === $DELETE_FOR_NONE ? 'selected' : '' ?>>不能刪除任何留言</option>
                </select>
              </div>
              <input type="hidden" name="role_id" value="<?php echo escape($row_data['id']) ?>">
              <input type="submit" name="permission_update_mode" value="更新">
              <input type="submit" name="permission_update_mode" value="刪除">
            </form>
          <?php } ?>
        <?php } ?>
      </div>
    </div>
  </main>
</body>

</html>