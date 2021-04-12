## 交作業流程

### Stpe1. 新開一個新的 branch 並切換到該 branch
```
// 開新的 branch
git branch hw1 

// 切換到該 branch
git checkout hw1 
```
![開新branch並切換](https://i.imgur.com/NzzUKBd.png)  
<br>
<br>
<br>
<br>
### Step2. 加入一些檔案並 commit
```
// 新增名為 newFile 的檔案
touch newFile
```
![新稱檔案](https://i.imgur.com/WWqnccX.png) 

```
// 將 newFile 加入 git
git add newFile

// 將此修改紀錄給 git
git commit -am "add new file"
```
![commit檔案](https://i.imgur.com/GqQHSNx.png)
<br>
<br>
<br>
<br>
### Step3. 上傳到 GitHub，並發起 Pull Request
origin 為遠端 repo 的代稱，hw1 為本地端的 branch 名稱  
```
// 新增遠端 repo 名稱跟網址
git remote add origin <你的遠端repo網址>
```
![新增遠端repo](https://i.imgur.com/vevWkVv.png)

```
// 上傳到該 repo
git push origin hw1 
```
![push到遠端repo](https://i.imgur.com/An1xMcO.png)

<br>
發起 Pull Request
![發起P Req](https://i.imgur.com/eaoGU1B.png) 
<br>
<br>
<br>
<br>
### Step4. 邀起別人一起來 review 你寫的內容
右邊選單可以邀請別人來共襄盛舉
![邀請別人review](https://i.imgur.com/tx07B1L.png)
<br>
<br>
<br>
<br>
### Step5. 若沒有問題，則 merge 此 branch
當確認 ok，就可以開始合併囉
![merge此branch](https://i.imgur.com/z4dFgi3.png)
<br>
<br>
<br>
<br>
### Step6. 刪除已經 merge 的 branch
因為已經沒有再繼續使用的必要，所以就可以刪除啦
![merge並pull req成功](https://i.imgur.com/MXiypaF.png)
