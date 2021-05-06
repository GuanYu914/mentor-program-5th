## 請以自己的話解釋 API 是什麼
做為兩端交換資料的介面，比喻來說就是，今天有兩個外國人分別是歐洲人跟日本人，但是他們可以透過共通語言像是英語，讓他們既可以不用懂彼此的語言，也可以輕易將想法透過共通語言傳遞，API 則可以想像是共通語言，每當彼此不同的機器在網路上需要交換資料時，就有許多不同的 API 可以用來交換資料。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
HTTP STATUS CODE 用來代表基於 HTTP 協定底下所有狀態的代碼，用來描述 Client 與 Server 遇到的各種情況。

### #400 Bad Request
由於 Client 端的錯誤，導致 Server 端無法處理 Request，錯誤有可能是 Request 格式有誤、大小太大、無效的請求、假的 request routing 等。

### #405 Method Not Allowed
要求的 Request 方法並不支援所要求的資源。

### #408 Request Timeout
Server 端逾時等候 Request，意思是說，Client 端沒有在 Server 端接收有限時間內丟出 Request，Client 端有可以在以後的任何時間內重複請求而無需修改。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

### Base URL : https://api.myrestaurant.com

|       說明      |  方法  |        路徑       |           參數        |           範例          |
| --------------- | ----- | ----------------- | --------------------- | ---------------------- |
| 獲取所有餐廳資訊 | GET    | /restaurants     | _limit:限制回傳資料數量 | /restaurants?_limit=10 |
| 獲取單一餐廳資訊 | GET    | /restaurants/:id | 無                     | /restaurants/10        |
| 刪除餐廳        | DELETE | /restaurants/:id | 無                     | /restaurants/5         |
| 新增餐廳        | POST   | /restaurants     | name: 新餐廳名稱        | /restaurants           |
| 更改餐廳        | PATCH  | /restaurants/:id | name: 餐廳名稱          | /resaurants/5          |
