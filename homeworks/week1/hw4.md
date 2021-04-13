## 跟你朋友介紹 Git
### Git 基本觀念
可以將 Git 想像成有個小幫手幫你紀錄每個檔案修改的歷程，流程是這樣的，加入你想要 Git 幫你管理的檔案（ git add ），然後給他一個合理的敘述（ git commit ），若你想要發佈到網路跟大家一起分享（ git push ）也是可以的，若不幸本地端的檔案不是最新的，別擔心！可以從先前上傳到網路的內容抓到最新的（ git pull ）～
<br>
<br>
### Git 基本操作
#### Git Init | 呼叫小幫手 Git
```
// 初始化 git，必要第一步
git init
```
![呼叫 git](https://i.imgur.com/OyDV9fD.png)
<br>
<br>
#### Git add | 將笑話交給小幫手吧！
```
// git add [檔案1][檔案2][檔案3]...以此類推
git add joke1 joke2 joke3
```
![加入 git](https://i.imgur.com/HUspBSE.png)
<br>
<br>
#### Git commit | 將該笑話命名一下吧！
```
// 使用 -am 代表要將所有新稱的檔案一併 commit 
// git commit -am "你要填寫的訊息"
git commit -am "add jokes"
```
![命名一下](https://i.imgur.com/paJ0Nsm.png)
<br>
<br>
#### Git push | 跟別人分享吧！
```
// git remote add [倉庫名稱] [倉庫網址]
git remote add origin https://github.com/GuanYu914/hw4_demo.git
```
![新增網路repo位置](https://i.imgur.com/Cn6MN5R.png)
```
// git push [倉庫名稱] [分支名稱]
// 分支名稱是要上傳上去的喔～
git push origin master
```
![push psuh~](https://i.imgur.com/c3QanYh.png)
<br>
<br>
#### Git pull | 笑話也需要更新的～
```
// git pull [倉庫名稱] [分支名稱]
// git pull origin master
```
![pull~](https://i.imgur.com/Y6bWgqt.png)
