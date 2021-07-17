# 將 XAMPP 的 Apache2 轉換成 Nginx web server 
**想知道如何在 ubuntu 上安裝 XAMPP 可以先看這個** [hw2.md](https://github.com/GuanYu914/mentor-program-5th/blob/master/homeworks/week14/hw2.md)
```bash
# 更新既有系統
sudo apt update && sudo apt upgrade
# 安裝 nginx 伺服器
sudo apt install nginx
# 查詢 apache2 是否有被啟用
sudo service apache2 status
# 如果預設有啟用 apache2，則先停用
sudo service apache2 stop
# 再來啟用 nginx 服務
sudo service nginx start
```

## 歡迎來到 nginx 的世界
打開瀏覽器，輸入上 EC2 的公開實體 IPv4 位址，應該會看到 ```Welcome to nginx!``` 的歡迎字樣，代表成功跑起 nginx 囉
![nginx歡迎畫面](https://i.imgur.com/dda4PnP.png)<br>
如果你到 ```/var/www/html``` 的資料夾底下你會看到 ```index.nginx-debian.html``` 的檔案名稱，這就是剛剛看到的網頁畫面原始碼
![nginx_html](https://i.imgur.com/HpTSKWZ.png)

## 修改 phpmyadmin
參考文獻：https://www.youtube.com/watch?v=ugTTDIUEKW4&ab_channel=AlessandroCastellani
這時候如果我們想要進入 phpmyadmin 管理介面就會發生 404，因為當初安裝 phpmyadmin 我們是指定裝在 apache2 上的
![phpmyadmin404](https://i.imgur.com/As7AdgX.png)
為了要讓 nginx 能夠運行 phpmyadmin，我們需要安裝 php-fpm 套件，來運行 php 腳本語法
```bash
sudo apt install php-fpm
```
接下來需要在 ```/var/www/html``` 底下目錄建立 phpmyadmin 的 symbol link
```bash
# sudo ln -s <原本檔案路徑> <產生的連結路徑>
sudo ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin
```
完成之後，你會發現 ```/var/www/html``` 底下會有黑底藍字的 phpmyadmin 連結，代表已經建立完成了
![link_to_phpmyadmin](https://i.imgur.com/2gsLB38.png)
這時候還是無法透過瀏覽器進入 phpmyadmin 喔，我們還需要對 nginx 做一些設定
```bash
# 編輯 /etc/php/7.2/fpm/php.ini
# 注意 7.2 這個版本不一定會相同，看安裝完的版本為多少，只要是要選到版本底下的 fpm 資料夾
sudo vim /etc/php/7.2/fpm/php.ini

# 修改 cgi.fix_pathinfo 變數為 0
# 一般來說不會啟用，會有安全性問題，但是為了讓 nginx 能夠解析 php，所以才這樣做
cgi.fix_pathinfo=0

# 重新啟用 php-fpm
# 注意 7.2 這個版本不一定會相同，看安裝完的版本為多少
sudo systemctl restart php7.2-fpm
```
```bash
 # 編輯 /etc/nginx/sites-available/default
sudo vim /etc/nginx/sites-enable/default

# 找到以下這一行
# server 會找尋預設路徑下有無這些檔案，並依照優先性高的執行
# 左邊優先順序較高，反之相反
# 假如目錄底下都有 index.nginx-debian.html 跟 index.php，則會優先執行 index.php
# 加入 index.php，讓 nginx 能夠解析 php
index index.php index.nginx-debian.html index.html index.htm;

# 新增以下程式碼到 server {} 裡面
 # access phpmyadmin by symbol link @2021.7.17
location /phpmyadmin {
    root /usr/share/;
    index index.php index.html index.htm;
}
```
找到下列幾行設定，並取消註解圖片紅線標註的註解
![](https://i.imgur.com/d5B2Kfk.png)<br>
都設定好了之後，就可把將 nginx 重啟看看結果囉～
```bash
# 你也可以先透過 sudo nginx -t 檢查是否有無語法錯誤
sudo service nginx restart
```
在瀏覽器中輸入 ```EC2_IP_Address/phpmyadmin/index.php```
![nginx_phpmyadmin](https://i.imgur.com/Pl0Klim.png)
