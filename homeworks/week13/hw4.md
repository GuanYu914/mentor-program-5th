## Webpack 是做什麼用的？可以不用它嗎？
用來拿來做 Module Bundler，因為在以前的瀏覽器是無法使用 import / export 的語法的，所以 webpack 誕生來解決這項事情，讓開發網站時，終於可以透過 import 跟 export 的語法來組織原始碼，程式開發者可以寫出更好維護且管理的 codes

如果今天你專案本身很小，其實不用 webpack 也可以，因為專案可能不需要使用 import / export 來管理程式碼就可以完成，但如果今天是要做 facebook 這種全球性社交平台，一定得透過 webpack 來打包所有 modules，因為你不可能把所有程式碼都寫在同一份裡面，而且也會造成往後不好維護跟管理

## gulp 跟 webpack 有什麼不一樣？
gulp 的本質是 task manager，它的用途為管理每一個 gulp task，而 webpack 是專注於 module bundle 這件事，所以它不能做到 bundle 以外的事情，反之，如果今天你寫出一個 gulp 的 webpack task，你就可以透過 gulp 來呼叫 webpack 執行 bundle 這件事 

## CSS Selector 權重的計算方式為何？
### 簡單介紹
CSS Selector 一共有四種類型權級，權限大小為 a > b > c > d
>a. ID 選擇器<br>
>b. 類別選擇器 ( class )、屬性選擇器 ( attribute )、偽類選擇器 ( pseudo-class )<br>
>c. 元素選擇器 ( element )、偽元素選擇器 (pseudo-element)<br>
>d. 任何元素選擇符 ( universal selector )<br>

### 計算規則
**每個類型權重單位**
根據剛剛介紹的類型，並定義以下權重單位，越往右邊權重越低，反之越高，舉例來說，(1, 0, 0) 的權重大於 (0, 0, 1)
a. -> (1, 0, 0)<br>
b. -> (0, 1, 0)<br>
c. -> (0, 0, 1)<br>
d. -> (0, 0, 0)  **ps.沒有權重**<br>
<br>
**如何計算呢？**  
只要 selector 中有兩個 a、三個 b，計算方式就是 (2, 3, 0)，以此類推<br>
<br>
**相同權重的情況**  
假如有兩個 selector 針對同一個元素的權重相同，則會優先套用後面寫的權重
```css
/* 權重為 (0, 1, 2) */
.test div > h2 { 
  color: green;
} 

/* 權重為 (0, 1, 2) */
/* 優先套用此效果 */
.fun h1 ~ h2 {
  color: red;
}
```
**規則中的例外**  
第一種例外，行內樣式。如果碰到元素中有 style 元素，則會忽略所有 css 檔案中所有選取它的效果，但是比 !important 樣式的權重小
```html
<h2 style="color: palevioletred;">I am an H2</h2>
```
第二種例外，!important 樣式，這是權重最高的屬性，任何權重規則都無法比它大，因此使用時要小心，因為它會破壞既有的權限規則
```css
/* 使用方式只要在效果後面加上 !important 字樣*/
.test div > h2 { color: green !important;} 
```

