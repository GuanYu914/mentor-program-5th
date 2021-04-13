## 請解釋後端與前端的差異。
前端負責網頁視覺的部分，只要是看到的UI排版都是，後端則是指伺服器與資料庫之間的通訊
<br>
<br>

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。
### 流程如下
Flow1. DNS 回傳給瀏覽器 Google.com 的主機位址  
Flow2. 瀏覽器送出搜尋 JavaScript 的請求給主機位址  
Flow3. 位於主機位址的 Server 收到了請求  
Flow4. Server 訪問資料庫並尋找 JavaScript 關鍵字  
Flow5. 資料庫找到了，回傳給 Server  
Flow6. Server 回傳 Response 給瀏覽器  
Flow7. 瀏覽器解析 Response 並顯示在頁面上  
<br>
<br>
## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用
### cp
複製檔案到指定地方 or 複製多個檔案到目的資料夾
```
/* 複製檔案 */

// 以 a.file 的內容複製一份副本名為 b.file
cp a.file b.file

// 複製 a.file b.file c.file 到 test 資料夾
cp a.file b.file c.file test/
```
```
/* 複製資料夾 */

// 複製 a 資料夾裡的東西到 b 資料夾
cp -r a b

// 複製 a、b 資料夾裡的東西到 c 資料夾
cp -r a b c 
```
### ping
查看網址是否能正常運作
```
// 回報該網址 server 的回應情況（圖片紅線標示所示）
ping [網址名稱]
```
![ping示意圖](https://i.imgur.com/S1qTR89.png)
### whoami
查看目前使用者是誰
![whoami示意圖](https://i.imgur.com/sa8Kn6q.png)
