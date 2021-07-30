### 題目程式碼
``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```
根據 hoisting 原理，可以將程式碼想像成如下，**不要以為程式碼會移動成以下這樣**
```js
var a = undefined
a = 1
var b = undefined
b = 100
function fn(){
  var a = undefined
  console.log(a)        // 優先找 fn 中的變數 a，印出 undefined
  a = 5                 // 設置 fn 中變數 a 為 5
  console.log(a)        // 優先找 fn 中的變數 a，印出 5
  a++                   // 將 fn 中的變數 a 加一
  // var a              // 因為在 fn 中已經有宣告 a 了，所以此行沒作用
  fn2()                 
  a = 20                // 根據 fn2 {a = 20}，設置 fn 中變數 a 為 20 
  console.log(a)        // 優先找 fn 中的變數 a，印出 20
  function fn2(){
    console.log(a)      // 在 fn2 找不到 a，所以向上找到 fn 裡面的變數 a，所以印出 6
    // a = 20           // 在 fn2 找不到 a，所以向上找到 fn 裡面的變數 a 並賦值 20
    // b = 100          // 在 fn2、fn 找不到 a，所以宣告 global 變數，並賦值 100
  }
}
fn()
console.log(a)          // 優先找 global 變數，並印出 a 為 1
a = 10                  // 設置 global 變數 a 為 10
console.log(a)          // 優先找 global 變數，並印出 a 為 10
console.log(b)          // 優先找 global 變數，並印出 b 為 100
```
輸出結果如下
```text
undefined
5
6
20
1
10
100
```