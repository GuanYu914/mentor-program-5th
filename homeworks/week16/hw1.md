### 題目程式碼
``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
### 執行過程 ( 根據 event loop )
執行 call stack 的 ```console.log(1)```，印出 ```1```
執行 setTimeout()，第二個參數為 0 代表盡快呼叫 ```console.log(2)```，將此 callback function 放入 task queue
執行 call stack 的 ```console.log(3)```，印出 ```3```
執行 setTimeout()，第二個參數為 0 代表盡快呼叫 ```console.log(4)```，將此 callback function 放入 task queue
執行 call stack 的 ```console.log(5)```，印出 ```5```
如果 call stack 程式碼都執行完了，則依據執行 task queue 內的 callback function，印出 ```2``` ```4```
**以下是輸出結果**
```bash
1
3
5
2
4
```
