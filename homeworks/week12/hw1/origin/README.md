# 作業：留言板
## 功能
#### 留言系統：
- 新增留言
- 顯示留言
- 編輯留言
- 刪除留言
使用 SOFT DELETE 方式，保留重要資訊
- 分頁瀏覽

#### 會員系統：
- 註冊
- 登入
透過 PHP SESSION 儲存用戶名稱
透過 HASH 驗證密碼，解決明碼在資料庫外洩風險
- 編輯暱稱
同步更新修改過後的暱稱
- 登出

#### 身分系統
- 用戶資訊管理 ( 管理員身分適用 )
  編輯所有用戶資訊 
- 身分權限管理 ( 管理員身分適用 )
  新增身分權限 
  編輯身分權限
  刪除身分權限 ( Soft Delete)

#### 資安實作
- XSS Attacks
- SQL Injection
- Semantic URL Attacks
防止有人透過非法 URL 獲取相關資訊

## 資料庫結構
#### users table
| 名稱        | 類型         | 編碼與排序	          | 預設值            | 額外資訊         |
| ----------- |:-----------:| -------------------:|------------------:|---------------: |
| id          | int(11)     |                     | 無                | AUTO_INCREMENT  |
| role        | Varchar(12) | utf8mb4_general_ci  | NULL              |                 |
| nickname    | varchar(20) | utf8mb4_general_ci  | 無                |                 |
| username    | varchar(12) | utf8mb4_general_ci  | 無                |                 |
| password    | varchar(255)| utf8mb4_general_ci  | 無                |                 |
| created_at  | datetime    |                     | current_timestamp |                 |
#### comments table
| 名稱        | 類型         | 編碼與排序	          | 預設值            | 額外資訊         |
| ----------- |:-----------:| -------------------:|------------------:|---------------: |
| id          | int(11)     |                     | 無                | AUTO_INCREMENT  |
| username    | varchar(12) | utf8mb4_general_ci  | 無                |                 |
| content     | text        | utf8mb4_general_ci  | 無                |                 |
| is_deleted  | tinyint(1)  |                     | 無                |                 |
| created_at  | datetime    |                     | current_timestamp |                 |

#### permission table
| 名稱              | 類型         | 編碼與排序	          | 預設值            | 額外資訊         |
| ----------------  |:-----------:| -------------------:|------------------:|---------------: |
| id                | int(11)     |                     | 無                | AUTO_INCREMENT  |
| role              | Varchar(12) | utf8mb4_general_ci  | 無                |                 |
| add_permission    | Varchar(3)  | utf8mb4_general_ci  | 無                |                 |
| edit_permission   | Varchar(3)  | utf8mb4_general_ci  | 無                |                 |
| delete_permission | Varchar(3)  | utf8mb4_general_ci  | 無                |                 |
| created_at        | datetime    |                     | current_timestamp |                 |

## 流程
#### ( 已是會員 ) 新增留言 
首頁 > 會員登入 > 首頁 > 新增留言 > 送出留言

#### ( 非會員 ) 新增留言 
首頁 > 會員註冊 > 填寫資訊 > 會員註冊(註冊成功提示訊息) > 首頁 > 會員登入 > 首頁 > 新增留言 > 送出留言

#### ( 已是會員 ) 修改暱稱 
首頁 > 點擊 "編輯暱稱" > 填入新的暱稱 > 按下送出按鈕

#### ( 不需要登入會員 ) 分頁瀏覽留言 
首頁 > 下滑至底端 > 點擊相對應頁面連結 > 根據頁面連結顯示相對應留言

#### ( 非會員 ) 會員註冊 
首頁 > 會員註冊 > 填寫資訊 > 會員註冊(註冊成功提示訊息) >首頁

#### ( 已是會員 ) 會員登入 
首頁 > 會員登入 > 填寫資訊 > 首頁

#### ( 已登入會員 ) 會員登出 
首頁 > 會員登出 > 首頁

#### ( 管理員身分 ) 編輯用戶資訊 
首頁 > 網站管理

#### ( 管理員身分 ) 編輯身分權限 
首頁 > 網站管理 > 編輯身分權限

## 前端頁面檔案
#### 首頁 index.php
**狀態：用戶未登入**
- 提示訊息：告知用戶需要登入才可留言
- 註冊 > register.php
- 登入 > login.php
- 留言區塊
- 分頁瀏覽列
  
**狀態：用戶已登入**
- 提示訊息：歡迎回來~ $用戶名稱
- 登出
- 送出留言按鈕 > handle_new_comment.php
- 留言區塊
  - 編輯留言 > handle_update_comment.php
  - 刪除留言 > handle_delete_comment.php
- 分頁瀏覽列

#### 編輯留言頁面 edit_comments.php
- 回首頁
- 編輯留言區塊
- 送出 > handle_update_comment.php

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

#### 網站管理 - 編輯用戶資訊 admin.php
- 個別用戶資訊
帳號名稱
帳號暱稱
用戶身份
變更按鈕 > handle_update_user.php
- 編輯身份權限
- 回首頁

#### 網站管理 - 編輯身份權限 permission.php
- 新增身份資訊
身份名稱
新增權限
編輯權限
刪除權限
新增按鈕 > handle_updated_permission.php
- 修改身份名稱
身份名稱
新增權限
編輯權限
刪除權限
更新按鈕 > handle_updated_permission.php
刪除按鈕 > handle_updated_permission.php
- 編輯用戶資訊按鈕 > admin.php
- 回首頁 > index.php

## 後端檔案
#### 負責資料庫連接 conn.php
連線到指定資料庫

#### 處理註冊操作 handle_register.php 
寫入暱稱、帳號、hash 過後的密碼到 users table

#### 處理登入操作 handle_login.php
查詢帳號是否存在於 users table
將 hash 用戶輸入的密碼跟 users table 的密碼做比對

#### 處理登出操作 logout.php
清除 SESSION [ 用戶名稱 ] 資訊

#### 處理新增留言 handle_new_comment.php
寫入用戶名稱、留言內容到 comments table

#### 處理更新留言 handle_update_comment.php
依據留言 id 更新留言內容

#### 處理刪除留言 handle_delete_comment.php
依據留言 id 刪除留言內容

#### 處理更新暱稱 handle_update_users.php
寫入新的用戶暱稱到 users table
寫入新的用戶名稱、暱稱、身份到 users table

#### 處理更新身份權限 handle_update_permission.php
寫入新的權限到 permission table
更新既有權限，並同步更新 users 內所有既有權限用戶
刪除既有身份權限

## 其餘檔案
#### style.css
調整畫面編排方式

#### utils.php
放一些常用的 functions

#### macro.php
定義錯誤資訊代碼，以利於偵錯
定義身份權限

#### index.js
在首頁中，按下 "編輯暱稱"，顯示相關輸入列