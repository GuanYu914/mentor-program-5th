## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
### 兩者之間的差別
#### 加密
- 一般分為兩種，對稱式加密跟非對稱式加密
- 對稱式加密過的資訊可以被還原，當駭客得知你是怎麼加密的，他就有辦法依照加密方式來進行解密
- 非對稱式加密，透過公私鑰來達到加密解密等功能，詳細細節可以參考以下連結
https://blog.techbridge.cc/2017/04/16/simple-cryptography/

#### 雜湊
- 將不限字數的資訊轉換為固定字數的雜湊碼
- 可以允許多對一，多筆不同的資訊有可能會得到相同的雜湊碼，因此一個好的雜湊演算法必須將此可能性降至最低甚至不可能
- 雜湊過後的資訊不能被還原，也就是說沒辦法拿到該雜湊過後的原始資訊
- 駭客會利用龐大的運算能力將所有可能產生的雜湊碼給計算出來，並試圖靠先前所計算出的結果推導可能的原先資訊，但是我們可以透過**加鹽(salting)方式**，讓原先的資訊再加上一串隨機的亂碼，再進行雜湊，這樣駭客就無法得知彼此之間的關聯性了


## `include`、`require`、`include_once`、`require_once` 的差別
#### include 
- 如果 #include_path 只有給出檔案路徑，則會先從指定路徑下尋找，如果找不到才會去該執行此檔案的路徑底下尋找。
- 若找不到檔案只會發出警告（E_WARNING），程式仍然會繼續執行
- 被 include 進來的變數都會是全域變數
- 如果檔案已被 include 進來，則會導致 php 執行錯誤
  
#### include_once
- 和 include 行為幾乎一致
- 相對於 include，如果 #include_path 中的檔案已被 include 進來，則不會導致 php 執行錯誤

#### require
- 和 include 行為幾乎一致
- 相較於 include，若找不到檔案會發生錯誤 ( E_COMPILE_ERROR )，程式會終止

#### require_once
- 和 require 行為幾乎一致
- 相對於 require，如果 #include_path 中的檔案已被 include 進來，則不會導致 php 執行錯誤


## 請說明 SQL Injection 的攻擊原理以及防範方法
### 攻擊原理
透過 Client 端傳送的資料，試圖拼湊出可用的 SQL 語法，導致 Server 端透過這種語法拿到資料庫其他資訊，達到竊取資訊的目的。

### 該如何防範
利用 php 內建的 mysqli 提供的 prepare 方法，可以有效地防止有心人士企圖插入非法的 SQL 語法，此方法僅在 ? 符號出現的地方解析用戶傳遞的資訊，並不會解析當中的語法
```php
// 設定 SQL 模板中填入資訊的地方
$sql = "UPDATE users SET nickname=? WHERE username=?";
// 傳送一個 SQL 模板
$stmt = $conn->prepare($sql);
// 將資訊填入，且儲存在變數中的語法並不會被解析
$stmt->bind_param("ss", $nickname, $username);
// 執行 SQL Query
$res = $stmt->execute();
```

##  請說明 XSS 的攻擊原理以及防範方法
### 攻擊原理
透過用戶傳遞的惡意程式碼，導致 Server 端錯誤地執行導致網頁出現異常現象

### 該如何防範
可以利用 php 內建的 htmlspecialchars 函式，讓原本屬於 html 解析字元變成另一種字元顯示，避免這些字元被解析成程式碼運行
```php
// ENT_QUOTES 代表單、雙引號都會被轉換
htmlspecialchars($str, ENT_QUOTES);
```

## 請說明 CSRF 的攻擊原理以及防範方法
### 攻擊原理
透過在不同網域底下發送與攻擊目標相同 Domain 的 GET 或 POST 要求，讓 Server 端自動地帶上先前用戶已經儲存的 SESSION 資訊 ( Cookie機制 )，偽裝用戶身分來執行一些非法操作

### 如何防範
當中內容摘錄至以下連結
https://blog.techbridge.cc/2017/02/25/csrf-introduction/
- 防止跨領域 domain 存取
  - **檢查 Referer**
  request 的 header 裡面會帶一個欄位叫做 Referer，**代表這個 request 是從哪個地方過來的，可以檢查這個欄位看是不是合法的 domain，不是的話直接 reject 掉即可**<br><br>
  - **加上圖形驗證碼、簡訊驗證碼**
  就跟網路銀行轉帳的時候一樣，都會要你收簡訊驗證碼，多了這一道檢查就可以確保不會被 CSRF 攻擊<br><br>
  - **加上 CSRF token**
  要防止 CSRF 攻擊，我們其實**只要確保有些資訊「只有使用者知道」即可。那該怎麼做呢？**
  我們在 form 裡面加上一個 hidden 的欄位，叫做 csrftoken，這裡面填的值由 Server 隨機產生，並且存在 Server 的 SESSION 中
    ```html
    <form action="https://small-min.blog.com/delete" method="POST">
      <input type="hidden" name="id" value="3"/>
      <input type="hidden" name="csrftoken" value="fj1iro2jro12ijoi1"/>
      <input type="submit" value="刪除文章"/>
    </form>
    ```
    **Server 比對表單中的 csrf token 與自己 session 裡面存的是不是一樣的，是的話就代表這的確是由使用者本人發出的 request。這個 csrf token 由 Server 產生，並且每一段不同的 session 就應該要更換一次**<br><br>
  - **client side 的 Double Submit Cookie**
  這個解法的前半段與剛剛的相似，由 server 產生一組隨機的 token 並且加在 form 上面。但不同的點在於，除了**不用把這個值寫在 session 以外，同時也讓 client side 設定一個名叫 csrftoken 的 cookie，值也是同一組 token。**
    ```html
    Set-Cookie: csrftoken=fj1iro2jro12ijoi1

    <form action="https://small-min.blog.com/delete" method="POST">
      <input type="hidden" name="id" value="3"/>
      <input type="hidden" name="csrftoken" value="fj1iro2jro12ijoi1"/>
      <input type="submit" value="刪除文章"/>
    </form>
    ```
    當使用者按下 submit 的時候，server 比對 cookie 內的 csrftoken 與 form 裡面的 csrftoken，檢查是否有值並且相等，就知道是不是使用者發的了
    為什麼呢？假設現在攻擊者想要攻擊，他可以隨便在 form 裡面寫一個 csrf token，這當然沒問題，可是**因為瀏覽器的限制，他並不能在他的 domain 設定 small-min.blog.com 的 cookie 啊！所以他發上來的 request 的 cookie 裡面就沒有 csrftoken，就會被擋下來**<br><br>
- 瀏覽器本身的預防機制
  - **SameSite cookie**
  SameSite 有兩種模式，Lax跟Strict，默認是後者，你也可以自己指定模式
    ```
    Set-Cookie: session_id=ewfewjf23o1; SameSite=Strict
    Set-Cookie: foo=bar; SameSite=Lax
    ```
    我們先來談談默認的 Strict模式，當你加上 SameSite 這個關鍵字之後，我們上面所講的```<a href=""/>```、```<form>```、```new XMLHttpRequest```，**只要是瀏覽器驗證不是在同一個 site 底下發出的 request，全部都不會帶上這個 cookie。**<br><br>
    可是這樣其實會有個問題，連```<a href="..."/>```都不會帶上 cookie 的話，當我從 Google 搜尋結果或者是朋友貼給我的連結點進某個網站的時候，因為不會帶 cookie 的關係，所以那個網站就會變成是登出狀態。**這樣子的使用者體驗非常不好。**<br><br>
    Lax 模式放寬了一些限制，例如說```<a>```、```<link rel="prerender">```、```<form method="GET">``` 這些都還是會帶上 cookie。但是 POST 方法 的 form，或是**只要是 POST, PUT, DELETE 這些方法，就不會帶上 cookie**<br><br>
    讓使用者從其他網站連進你的網站時還能夠維持登入狀態，一方面也可以防止掉 CSRF 攻擊。**但 Lax 模式之下就沒辦法擋掉 GET 形式的 CSRF，這點要特別注意一下。**
  
