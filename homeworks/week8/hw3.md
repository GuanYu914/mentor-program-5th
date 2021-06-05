## 什麼是 Ajax？
全名為 Asynchronous JavaScript and XML，當中使用的技術包刮 HTML、XHTML、CSS、JavaScript、DOM、XML、XSLT，最為重要仍是 XMLHttpRequest 物件。
當這些技術結合使用在 ajax 模型上，它可以使得網站能夠做出迅速的更新而不用重新重整頁面，讓網站變得更快速且更響應式。
現今 JSON 使用的頻率大過於 XML，因為它更輕量且為 JavaScript 的一部份，所以 JSON 跟 XML 在 ajax 模型中都被用在包裝資訊。

## 用 Ajax 與我們用表單送出資料的差別在哪？
使用表單送出資料需要重整頁面，而透過 ajax 不需要透過改變目前網頁就可以送出資料，因為是透過 javaScript 在背景發送 request。

## JSONP 是什麼？
透過不受到同源政策的 tag，例如 script 標籤，可以引入不同源的 script 檔案，並在後端當中撰寫相關的回傳格式，讓前端拿到此回傳格式後可以呼叫相關的函式將資訊顯示。
可以參考以下實作連結
https://medium.com/@brianwu291/jsonp-with-simple-example-4711e2a07443

## 要如何存取跨網域的 API？
透過 CORS，全名為跨來源資源共享，用來判斷阻擋或允許不同來源網域的資源存取，其中的 Access-Control-Allow-Headers 這項欄位裡面會記錄允許存取的網域，若發送 request 來源的網域有在這項欄位裡面，就可以拿到 response

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
在第四週課程使用 Node.js 套件 request 來發送 request，當中並沒有透過瀏覽器，所以不會有這項問題，如果在瀏覽器中使用 XMLHttpRequest 發送 request 的話，會受到同源政策影響，所以不能存取不同網域的資源，所謂同源是指兩份網頁具備相同協定、埠號 (如果有指定) 以及主機位置