### 題目程式碼
``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
### 執行過程 ( 根據 event loop )
執行 ```console.log('i: ', i)```
<br>
執行 setTimeout()，計時秒數為 i * 1000 ( ms ) 並設置 callback funuction ```console.log(i)```，將此 callback function 放入 task queue
<br>
以上依序執行 5 次，i 從 0 到 4
<br>
當 call stack 執行完後，則開始依序執行 task queue 內的 callback function
<br>
呼叫時因為執行完 for loop 了，所以 ```console.log(i)``` 輸出都是 5，一共五次
**以下是輸出結果**
```bash
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```
