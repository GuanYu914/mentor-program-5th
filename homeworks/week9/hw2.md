## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
### TEXT
- 固定長度為 65535 個字串，不能限制大小
- 在字串前面會附加 2 byte 來記錄字串長度
- 並不能完全被索引，需要選擇特定的 prefix
  
### VARCHAR
- 可變長度，長度為 1 - 65535 個字串
- 可以被完全索引
  
## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
### Cookie 是甚麼？
用來存取 server 端需要放在 client 端的資訊，讓 client 與 server 之間可以交換資訊

### HTTP 層級如何設定？
首先在 server 端會發送一個名稱為 Set-Cookie 的 header，裡面會放 cookie 的資訊，如果瀏覽器收到此 response 之後，若 client 再發送 request 時，會自動將先前的 cookie 資訊放在 request header 裡面傳送給 server 端

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
在進度章節最後，老師帶著我做出使用 PHP 內建 SESSION 的會員系統，但是若儲存在 client 端的 PHPSESSID 被駭客入侵取得了，那麼不就可以透過此資訊拿到用戶先前儲存在 server 端的資料了嗎？

**以下連結，是我找到的解決方案**
https://devco.re/blog/2014/06/03/http-session-protection/