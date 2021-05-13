### expense-tracker
# 家庭記帳本
運用Node.js, Express, handlebars, MongoDB打造的網頁記帳應用程式。

## 專案畫面
<h4> 專案首頁 </h4>
<img align="center" src="https://github.com/hazelisles/expense-tracker/blob/master/demo.gif?raw=true" width="750"/>


## 功能描述
1. 可以在首頁瀏覽所有帳務紀錄
   * 可以依照選定類別進行瀏覽
   * 可以選擇查看`今天`, `本月`, `上個月`的帳務紀錄

2. 可以新增一筆支出帳務紀錄

3. 可以修改一筆支出帳務紀錄

4. 可以刪除一筆支出帳務紀錄


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
4. 產生示範用帳務種子資料至 MongoDB
```
npm run seed
```
終端機顯示 `MongoDB Connected!`, `Record created!` 及 `Category created!` 即完成資料載入


5. 啟動伺服器，執行專案
```
npm run dev
```
終端機顯示 `App is now listening on http://localhost:3000` 及 `MongoDB Connected!` 即成功啟動，可至 [http://localhost:3000](http://localhost:3000) 開始使用！

## 開發人員
[Hazel Chu](https://github.com/hazelisles)
