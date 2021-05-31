## 什麼是 DOM？
全名為 Document Object Model，對於 XML 跟 HTML 的 Programming interface，讓程式語言可以透過它改變頁面的結構、風格跟內容 。DOM 內容當中包括 node 跟 objects

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
當點擊一個物件時會從上到下先進行捕獲階段 (capture phase)，如果找到目標就進入到目標階段 (target phase)，之後開始由目標往上進行冒泡階段 (bubbling phase)

## 什麼是 event delegation，為什麼我們需要它？
根據事件傳遞機制裡面的冒泡階段 (bubbling phase)，可以從目標事件當中的上一層設置 EventListener 代為處理  
### 範例程式
此程式碼會有三種按鈕，數字編號 1 & 2 的按鈕跟 add 按鈕，如果按下 add 按鈕則會產生目前數字編號 +1 的按鈕
#### html 檔案內容
```html
<div class="outer">
  <button class="add-btn">add</button>
  <button class="btn" data-value="1">1</button>
  <button class="btn" data-value="2">2</button>
</div>
```
#### javaScript 檔案內容
```js
// 紀錄預設按鈕數量
let num = 3

// 如果按下 add 按鈕，則會產生編號加一的新按鈕
document.querySelector('.add-btn').addEventListener('click', ()=>{
  const parentElement = document.querySelector('.outer')
  const newElement = document.createElement('button')
  newElement.classList.add('btn')
  newElement.setAttribute('data-value', num)
  newElement.innerText = num
  num++
  parentElement.appendChild(newElement)
})

// 使用事件代理機制，讓外層的 outer 元素代理元素裡面的 EventListener，不用再對每一個新增的按鈕做 EventListener，大大地增加效率
document.querySelector('.outer').addEventListener('click', (e)=>{
  if(e.target.classList.contains('btn')){
    alert(e.target.getAttribute('data-value')) // 從 data-value 取得編號
  }
})
```
## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
preventDafault() 主要用來避免元素的預設行為，並不會影響到事件傳遞機制的運行，如果應用在表單當中的 submit 按鈕，則不會送出表單

stopPropagation() 當呼叫此函式時，會終止目前的事件傳遞機制，但是仍然會觸發同層的 EventListener，若想要避免此事件發生，可以呼叫 stopImmediatePropagation() 避免