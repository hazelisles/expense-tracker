### expense-tracker
# 網頁記帳本2.0
運用Node.js, Express, handlebars, MongoDB打造的網頁記帳應用程式。

已發布於Heroku，可由以下連結進入使用：

[網頁記帳本](https://agile-refuge-56202.herokuapp.com/)

## 專案畫面
<h4> 專案首頁 </h4>
<img align="center" src="https://github.com/hazelisles/expense-tracker/blob/master/images/demo.gif?raw=true" width="750"/>


## 功能描述
1. 可以在首頁瀏覽所有帳務紀錄
   * 可以同時依照選定的類別、年份、月份進行瀏覽(v2.0)
   * 可以選擇查看`今天`, `昨天`, `本月`, `上個月`的帳務紀錄

2. 可以新增一筆支出帳務紀錄

3. 可以修改一筆支出帳務紀錄

4. 可以刪除一筆支出帳務紀錄

5. 新增商家欄位(v2.0)

6. 需進行帳戶註冊後，登入才可以使用(v2.0)

7. 開發者可以使用facebook第三方登入使用(v2.0)

### 測試使用者帳號
| 帳號 | 密碼 | 擁有帳務紀錄 |
|-----|------|---------|
|els@example.net|els123|#1,#2,#3,#4,#5|
|amelia@example.net|amelia123|#6,#7,#8,#9,#10|


## 環境建置與需求
* [Node.js](https://nodejs.org/en/): v14.16.1

## 安裝與執行步驟
1. 打開終端機將專案下載至本地執行
```
git clone https://github.com/hazelisles/expense-tracker.git
``` 
2. 進入專案資料夾
```
cd expense-tracker
```
3. 安裝專案需求套件
```
npm install 
npm i nodemon
```
4. 產生測試用帳務及使用者種子資料至 MongoDB
```
npm run seed
```
終端機顯示 `MongoDB Connected!`, `Category created!` 及 `Done!` 即完成資料載入


5. 啟動伺服器，執行專案
```
npm run dev
```
終端機顯示 `App is now listening on http://localhost:3000` 及 `MongoDB Connected!` 即成功啟動，可至 [http://localhost:3000](http://localhost:3000) 開始使用！

## 開發人員
[Hazel Chu](https://github.com/hazelisles)
