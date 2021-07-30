### 題目程式碼
``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```
### 解題方式
可以把每一個 function call 使用 call() 取代
```js
// 等同於 obj.inner.hello()
// obj.inner 就是 this 的值
// 因為 hello() 會印出 this.value 所以 obj.inner.value = 2
obj.inner.hello.call(obj.inner) 

// 等同於 obj2.hello()
// obj.inner 就是 this 的值
// 因為 hello() 會印出 this.value 所以 obj2.value => obj.inner.value = 2
obj2.hello.call(obj2)

// 等同於 hello()
// this 就是 undefined
hello.call(undefined)
```