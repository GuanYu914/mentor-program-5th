# 作業：留言板
## 功能
#### 留言系統：
- 新增留言
- 顯示留言

#### 會員系統：
- 註冊
- 登入
透過 PHP SESSION 儲存用戶名稱
- 登出

## 資料庫結構
#### users table
| 名稱        | 類型         | 編碼與排序	          | 預設值            | 額外資訊         |
| ----------- |:-----------:| -------------------:|------------------:|---------------: |
| id          | int(11)     |                     | 無                | AUTO_INCREMENT  |
| nickname    | varchar(20) | utf8mb4_general_ci  | 無                |                 |
| username    | varchar(12) | utf8mb4_general_ci  | 無                |                 |
| password    | varchar(12) | utf8mb4_general_ci  | 無                |                 |
| created_at  | datetime    |                     | current_timestamp |                 |
#### comments table
| 名稱        | 類型         | 編碼與排序	          | 預設值            | 額外資訊         |
| ----------- |:-----------:| -------------------:|------------------:|---------------: |
| id          | int(11)     |                     | 無                | AUTO_INCREMENT  |
| nickname    | varchar(20) | utf8mb4_general_ci  | 無                |                 |
| content     | text        | utf8mb4_general_ci  | 無                |                 |
| created_at  | datetime    |                     | current_timestamp |                 |

## 流程
#### 新增留言 (已是會員)
首頁 > 會員登入 > 首頁 > 新增留言 > 送出留言

#### 新增留言 (非會員)
首頁 > 會員註冊 > 填寫資訊 > 會員註冊(註冊成功提示訊息) > 首頁 > 會員登入 > 首頁 > 新增留言 > 送出留言

#### 顯示留言 (不需要登入會員)
首頁

#### 會員註冊 (非會員)
首頁 > 會員註冊 > 填寫資訊 > 會員註冊(註冊成功提示訊息) >首頁

#### 會員登入 (已是會員)
首頁 > 會員登入 > 填寫資訊 > 首頁

#### 會員登出 (已登入會員)
首頁 > 會員登出 > 首頁

## 前端頁面檔案
#### 首頁 index.php
**狀態：用戶未登入**
- 提示訊息：告知用戶需要登入才可留言
- 留言區塊
- 註冊 > register.php
- 登入 > login.php
  
**狀態：用戶已登入**
- 提示訊息：歡迎回來~ $用戶名稱
- 留言區塊
- 送出留言按鈕 > handle_new_comment.php
- 登出

#### 註冊 register.php
- 填寫欄位
暱稱
帳號
密碼
- 送出按鈕 > handle_register.php
- 登入頁面 > login.php
- 回首頁   > index.php

#### 登入 login.php
- 填寫欄位
帳號
密碼
- 送出按鈕 > handle_login.php
- 註冊頁面 > register.php
- 回首頁   > index.php

## 後端檔案
#### 負責資料庫連接 conn.php
連線到指定資料庫

#### 處理註冊操作 handle_register.php 
寫入暱稱、帳號、密碼到 users table

#### 處理登入操作 handle_login.php
查詢帳號、密碼當前組合是否存在於 uers table

#### 處理登出操作 logout.php
清除 SESSION [ 用戶名稱 ] 資訊

#### 處理新增留言 handle_new_comment.php
寫入暱稱、留言內容到 comments table

## 其餘檔案
#### style.css
調整畫面編排方式

#### utils.php
放一些常用的 functions

#### macro.php
定義錯誤資訊代碼，以利於偵錯