# 佈署 AMAZON AWS EC2

## 基本設置
### 設定主機
註冊 aws 帳號並完成後，點選左上角 Services 下拉式選單，點選**運算**標題下的 **EC2** 開始設置
![開始設置主機](https://i.imgur.com/mwaRLSm.png)<br>
搜尋 **ubuntu**，並找到 **18.04 LTS** 的版本安裝
![選擇安裝的Server OS](https://i.imgur.com/D8x1PPo.png)<br>
選擇**免費**的 Server 硬體需求 ( 有綠色標示的那個 )，接下來，除非你有特殊要求，不然一直按 next 到 **Step 6: Configure Security Group** 設定頁面即可
![選擇硬體需求](https://i.imgur.com/8gYZJV0.png)<br>
設定 **http/https ports**，以利於我們可以透過 http/https 存取 Server 主機，可以透過 Type 下拉選單選擇 HTTP 跟 HTTPS 即可，若確定沒有問題就可以按下 Review and Launch 囉<br>
**出現黃色警告是因為目前所有 IP 都可以存取到此 Server 設定的 ports，可以透過設置一些 rules 去限制 ports 的 IP 存取範圍**

![設置Security](https://i.imgur.com/Lj5nDUq.png)<br>
顯示之前所有設置的選項，如果沒有問題就可以按下 Launch 啟動 Server 啦
![顯示先前選項](https://i.imgur.com/F42cYEr.png)<br>
Amazon 會儲存 public key，而我們必須使用相對應的 private key 去使用登入 Server，以確保連線的安全性
選擇 Create a new key pair，並輸入想要的 key pair 名稱，按下 download Key Pair，放在私密的地方 XD
![設置PairKey](https://i.imgur.com/u02h8FT.png)<br>
### 透過 SSH 連線到 Server 吧
**透過 windwos 提供的 wsl 介面，使用 linux 來建立雙方的連線**
切換到放.pem key pair 的地方，並透過以下指令建立連線
```bash
# ssh -i '你的 key pair.pem' ubuntu@ipv4位址
# 舉裡來說，key pair 為 123.pem，ipv4 位址為 100.100.100.100
ssh -i "123.pem" ubuntu@100.100.100.100
```
**突如其來的權限問題**
如果碰到以下問題，代表需要改變檔案權限
![權限問題](https://i.imgur.com/V8ESYDl.png)<br>
讓此檔案只能允許你可以讀寫，所以要修改檔案權限可以這樣做
```bash
chmod 600 '123.pem'
```
**如果輸入指令完權限沒有改變呢**
先別緊張，因為不是指令沒有用，而是在 wsl 環境底下，並須加入一些 config 才能修改檔案權限，可以參考這篇文章 [我是傳送門](https://stackoverflow.com/questions/46610256/chmod-wsl-bash-doesnt-work)，上述問題解決後，在試一次，應該就可以看到連線成功的畫面了，會像下面畫面一樣
![成功畫面](https://i.imgur.com/bpIrAYx.png)<br>
### 開始安裝 XAMPP 吧
更新 ubuntu 
```bash
sudo apt update && sudo apt upgrade && sudo apt dist-upgrade
```
安裝 Tasksel，它可以幫我們安裝一切的 XAMPP 的套件
```bash
sudo apt install tasksel
```
使用 Tasksel 安裝 XAMPP Server，安裝當中會出現紫粉色背景，蠻 q 的
```bash
sudo tasksel install lamp-server
```
![正在安裝phpmyadmin](https://i.imgur.com/46b2HXv.png)<br>
在瀏覽器上輸入公開的 ipv4 地址，測試 XAMPP 有沒有上線，如果有成功的話，應該會出現 **Apache2 Ubuntu Default Page** 頁面
![Server已上線](https://i.imgur.com/SMHO2R6.png)<br>
### 設定 phpmyadmin 管理資料庫
安裝 phpmyadmin 
```bash
sudo apt install phpmyadmin
```
選擇 Apache2 當作 webserver
**按下空白鍵選取，並按下 Tab 鍵移動游標**
![Webserver選擇](https://i.imgur.com/SZh0ZI2.png)<br>
phpmyadmin 需要建立 database 才能開始使用，所以使用 dbconfig-common 來幫我們設定
![dbconfig-common](https://i.imgur.com/cdd8AGq.png)<br>
為 phpmyadmin 帳號新增密碼，如果欄位留空密碼則會隨機產生
![password](https://i.imgur.com/KBP7Ha8.png)<br>
重新輸入剛剛的密碼一次
![重新輸入password](https://i.imgur.com/VqaNJ0W.png)<br>
在剛剛的網址後面加上 /phpmyadmin，進入到 phpmyadmin 登入介面
![phpmyadmin登入介面](https://i.imgur.com/39PJlM9.png)<br>
使用帳號 phpmyadmin 跟剛剛設定的密碼進入管理介面，就成功了
![phpmyadmin管理介面](https://i.imgur.com/TJXWYu5.png)<br>
### 設定用戶 root 可以密碼登入
因為 phpmyadmin 需要密碼登入，所以我們必須設定 root 的密碼
輸入以下指令進入 mysql shell 
```bash
sudo mysql -u root mysql
```
看到以下畫面就是成功了
![進入mysql_shell](https://i.imgur.com/7C6nbvG.png)<br>
輸入以下 SQL 語法
```SQL
UPDATE user SET plugin='mysql_native_password' WHERE User='root';
FLUSH PRIVILEGES;
```
看到以下執行的輸出就成功了
![輸出結果](https://i.imgur.com/oMkXe5O.png)<br>
輸入 exit 退出 mysql shell 環境，並執行以下腳本設定 root 密碼
```bash
sudo mysql_secure_installation
```
鍵入 y 開啟 VALIDATE PASSWORD 插件，可以幫助我們檢查 root 密碼的安全性
![開啟VALIDATE-PASSWORD](https://i.imgur.com/pnpL5tR.png)<br>
你可以依據 0, 1, 2 決定密碼的規則，這裡選擇 2，其密碼必須為八位數以上，且包括數字、英文大小寫、特殊符字元
![VALIDATE-PASSWORD設置密碼1](https://i.imgur.com/KbYByNY.png)<br>
當設置完密碼後，鍵入 y 以完成
![VALIDATE-PASSWORD設置密碼2](https://i.imgur.com/o5v2lTN.png)<br>
輸入 y，移除匿名使用者的資料
![移除匿名使用者](https://i.imgur.com/jAe7MGV.png)<br>
輸入 y，可以禁止從遠端使用 MySQL 的 root 帳號來登入 MySQL
![禁止從遠端使用root](https://i.imgur.com/6E6HaSo.png)<br>
輸入 y，移除測試用的資料庫
![移除測試用的資料庫](https://i.imgur.com/u1rmF8J.png)<br>
輸入 y，重新載入特權表<br>
![重新載入privilege](https://i.imgur.com/GMmB26e.png)<br>
看到 all done，就代表設定完啦
![all_done_yayaya](https://i.imgur.com/lurCDT8.png)<br>
### 設置 FTP，檔案傳輸好方便
啟用 EC2 有關 FTP 的相關 ports
點擊 Server 的安全性資訊，並點擊安全性模組
![安全性頁面](https://i.imgur.com/EQoReBz.png)<br>
在這裡我們要設定給 FTP 的 Ports，點擊 Edit inbound rules
![編輯頁面](https://i.imgur.com/YpwvUT2.png)<br>
依照上次設定 Security Group 的方式，添加 20、21、1024-1048 Ports Number，完成之後點擊儲存規則即可
![添加_ports](https://i.imgur.com/7nvOtAt.png)<br>
接下來，透過 SSH 連線到 Server，並使用以下指令安裝 vsftpd Server 在 Server 上
```bash
sudo apt install vsftpd
```
然後我們需要對 vsftpd 設定一些參數，首先，先編輯 vsftpd.conf 檔案
```bash
# 編輯 /etc/vsftpd.conf
sudo vim /etc/vsftpd.conf
```
```bash
# 請確認以下參數是否有被取消註解 (uncomment)
#不允許匿名登入
anonymous_enable=NO
# 新增 FTP 被動模式參數
pasv_enable=YES
pasv_min_port=1024
pasv_max_port=1048
pasv_address=放上 Server 公開的 IPv4 地址
# 接收所有寫入指令
write_enable=YES
```
完成之後，我們需要對 FTP 設置一組帳密
```bash
# adduser 後面接上你想要的帳號名稱
sudo adduser awsftptestuser
```
此時會需要你設定此帳號的密碼跟此用戶聯繫資訊，全部完成後按下 y 確認
![創建用戶帳號](https://i.imgur.com/DeO1nUF.png)<br>
創建完帳密後，我們需要針對該用戶限制存取的資料路徑，避免該用戶去瀏覽系統的其他路徑，引發資安問題
```bash
# 編輯 /etc/vsftpd.conf
# 請確認以下參數是否有被取消註解 (uncomment)
# 啟用 chroot
chroot_local_user=YES
allow_writeable_chroot=YES
```
設置限制存取的檔案位置
```bash
# usermod -d <該用戶的家目錄> 該用戶
# /var/www/html 為 apache2 的預設檔案目錄
sudo usermod -d /var/www/html awsftptestuser
```
從以下照片可以看到該目錄是屬於 root 的，所以我們必須將 awsftptestuser 加入到 root 群組中，這樣該用戶才能夠存取
![加入群組](https://i.imgur.com/OMyHrch.png)<br>
```bash
# 將 awsftptestuser 加入 root 群組
sudo usermod -a -G root awsftptestuser
```

**QA1. 成功登入但無法上傳跟編輯檔案**
這時請確認該用戶家目錄是否有提供給該用戶相對應的 rwx 存取權限，
![添加寫入權限](https://i.imgur.com/9yE2AJ0.png)<br>
若不太懂 linux 權限管理，可以點這裡 [我是傳送門](http://linux.vbird.org/linux_basic/0210filepermission.php)
<br>
**解決方式：新增同群組使用者的寫入權限**
```bash
cd /var/www
sudo chmod 775 html
```
### YoYo ~ 放上自己的網站吧
透過 FileZilla 輸入剛剛設定好的帳密，連線成功後，將左側想要上傳的檔案拖曳到右邊想要放的檔案位置
![上傳檔案](https://i.imgur.com/5o5dh7s.png)<br>
稍等一段時間，如果完成就會看到所有檔案已經在右邊視窗了
![上傳檔案完成](https://i.imgur.com/CfOYHoW.png)<br>
**QA1. 開啟網站時發現沒有權限可以存取**
萬一發現開啟網站出現這個情形怎麼辦<br>
![網站無法存取](https://i.imgur.com/J80GouZ.png)<br>
原因是因為沒有設置給自己或群組以外的存取權限
![添加讀取權限](https://i.imgur.com/yVyclqO.png)<br>
**解決方式：新增同群與其他使用者的讀取權限**
```bash
cd /var/www/html
sudo chmod 644 index.html
```
### 加個網址，讓人更容易找到
以 siteground 為例，在 DNS Zone Editor 頁面裡面，填入相對應的網址並指定對應到 EC2 Server 的 IPv4 address
![設定_DNS](https://i.imgur.com/Xk1HWPc.png)<br>
完成設定後，輸入對應網址就可以看到有模有樣網址了
![輸入網址](https://i.imgur.com/kijLqAw.png)<br>
