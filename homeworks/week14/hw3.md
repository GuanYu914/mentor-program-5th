## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
為什麼需要 DNS 呢？是因為如果今天大家透過實體 IP 位址存取網站服務時，很容易忘記位址是甚麼，所以 DNS 就可以把人們可以讀取的網址名稱轉換成相對應的實體 IP

對於用戶來說，使用 Google 提供的免費 DNS Server 不僅可以改善瀏覽速度也可以改善使用者的瀏覽體驗

對於 Google 來說，可以收集 DNS 上查詢的數據

## 什麼是資料庫的 lock？為什麼我們需要 lock？
可以限制資料不可以被同時存取修改，導致資料還沒修改完後就又被修改，導致最終結果與預期不一致，舉例來說，購票網站訂購票券時，一定會有很多人同時訂購同一份票券，Server 接收這麼多的 request 時，一定是平行化處理，先來的先處理，那如果剛好收到同時抵達的 request，就有可能同時修改到同一份資料，產生 race condition
```php
// 透過 lock 禁止其他 request 同時存取相同資料
<?php
// establish connection
$host = 'localhost';
$user = "emory";
$password = "emory";
$database = "emory";

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
  die($conn->connect_error);
}

// set utf8 encoding
$conn->query("SET NAMES 'utf8'");
if ($conn->error) {
  die($conn->error);
}

try {
  // Disable autocommit
  $conn->autocommit(FALSE);

  // First of all, let's begin a transaction
  $conn->begin_Transaction();

  // fetch current ticket number
  // 使用 lock 禁止其他人存取此資料，直到目前 query 完成 (執行 $conn->commit())
  $result = $conn->query('SELECT tickets FROM ticket WHERE id=1 for update');
  $row = $result->fetch_assoc();
  $ticket_num = $row['tickets'];
  
  // A set of queries; if one fails, an exception should be thrown
  if ($ticket_num > 0) {
    $ticket_num = $ticket_num - 1;
    $conn->query(sprintf('UPDATE ticket SET tickets=%d WHERE id=1' , $ticket_num));
    // $conn->query("UPDATE ticket SET tickets=" . $ticket_num-1 ." WHERE id=1 for update");
    echo "剩餘票數: " . $ticket_num;
    echo '<br>購買成功';  
  } else {
    echo "<br>無法購買，票數不足";
  }

  // If we arrive here, it means that no exception was thrown
  // i.e. no query has failed, and we can commit the transaction
  $conn->commit();
  $conn->close();
} catch (mysqli_sql_exception $exception) {
  // An exception has been thrown
  // We must rollback the transaction
  $conn->rollback();
  throw $exception; // but the error must be handled anyway
}
?>
```
## NoSQL 跟 SQL 的差別在哪裡？
- 沒有 Schema，想像成存 JSON 資料進資料庫
- 用 Key - Value 形式儲存
- 無法用 JOIN
- 通常存放結構不穩定的東西  (EX. Log)

## 資料庫的 ACID 是什麼？
為了確保 Transaction 的正確性，須符合 ACID 原則
- atomicity   原子性：要嘛全部成功，要嘛全部失敗
- consistency 一致性：維持資料的一致性
- isolation   隔離性：多筆交易不會互相影響 (不能同時修改同一個數值)
- durability  持久性：交易成功後，寫入的資料不會不見
```php
// 透過 php 新增三筆資料到 comments table
<?php
// establish connection
$host = 'localhost';
$user = "youruser";
$password = "yourpassword";
$database = "yourdb";

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
  die($conn->connect_error);
}

// set utf8 encoding
$conn->query("SET NAMES 'utf8'");
if ($conn->error) {
  die($conn->error);
}

try {
  // Disable autocommit
  $conn->autocommit(FALSE);

  // First of all, let's begin a transaction
  $conn->begin_Transaction();
  
  // A set of queries; if one fails, an exception should be thrown
  $conn->query('INSERT INTO comments(username, content) VALUES("emory", "午安")');
  $conn->query('INSERT INTO comments(username, content) VALUES("emory", "晚安")');
  $conn->query('INSERT INTO comments(username, content) VALUES("emory", "消夜安")');
  
  // If we arrive here, it means that no exception was thrown
  // i.e. no query has failed, and we can commit the transaction
  $conn->commit();
} catch (\Throwable $e) {
  // An exception has been thrown
  // We must rollback the transaction
  $conn->rollback();
  throw $e; // but the error must be handled anyway
}

echo 'done'
?>
```
php 參考文獻
https://www.php.net/manual/zh/mysqli.begin-transaction