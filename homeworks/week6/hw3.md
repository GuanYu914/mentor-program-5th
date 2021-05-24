## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
### abbr：用來表示某個名詞的縮寫
```html
<!-- abbr 標籤用法 -->
The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.
```
### address：用來定義網頁作者或擁有者的連絡資訊
```html
<!-- address 標籤用法 -->
<address>
Written by <a href="mailto:webmaster@example.com">Jon Doe</a>.<br>
Visit us at:<br>
Example.com<br>
Box 564, Disneyland<br>
USA
</address>
```
### ins：用來代表被插入的文字
```html
<!-- ins 標籤用法 -->
<p>My favorite color is <del>blue</del> <ins>red</ins>!</p>
```

## 請問什麼是盒模型（box modal）
![盒模型圖片](./box-model.png)
### 由 content、padding、border & margin 四個元素所組成。
### content
#### 文字內容 & 圖片位置，顯示資訊的地方，可以設置 width & height 屬性改變其長跟寬。
### padding
#### content 附近透明的區域。
### border
#### 在 padding & content 周圍的區域。
### margin
#### 在 border 外面的透明區域，可被用來區隔附近的元素。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
### inline
#### 元素 margin & padding 屬性無法調整，當中 padding 上下屬性可以調整只有在有背景的時候。 
#### 
### block
#### 一個元素佔據一行空間，其屬性都可以調整，代表標籤為 div、h1、p ...等。
### inline-block
#### 跟 block 唯一區別為可以跟其他 inline-block 並排顯示。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
### static
#### 網頁預設排版方式，由上到下，由左至右。
### relative
#### 在原本預設排版的位置，設定想要偏移的位置，且並不會影響到其他元素。
### absolute
#### 基於上層 relative 屬性元素做定位。
### fixed
#### 將某個元素定位在網頁的特定位置。