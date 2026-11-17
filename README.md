# 前後端串接練習專案 (Full-Stack Practice)

## 📖 專案簡介

這是一個專注於練習**前端、後端與資料庫完整串接流程**的實作專案。

目前這個小專案在功能與架構上並不算完美，但我的目的在於「動手實作與探索」——透過親自走過一遍資料從前端介面發送請求、經過後端伺服器處理、最終寫入與讀取資料庫的完整生命週期，幫助我更具體地理解網頁全端運作原理，並藉此發掘自己對「前端介面互動」或「後端邏輯與資料處理」的偏好方向。

## 🛠️ 使用技術 (Tech Stack)

### 前端 (Frontend)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### 後端 (Backend)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

### 資料庫 (Database)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## 🎯 練習重點

* [x] 使用原生 JavaScript (`fetch` / `async-await`) 與後端進行非同步資料交換
* [x] 透過 Express 建立基礎的 RESTful API 路由（GET, POST, PUT, DELETE）
* [x] 學習在 Node.js 環境中連接並操作 PostgreSQL 資料庫
* [x] 處理前後端跨域請求（CORS）與基本的 JSON 資料格式解析

## 🚀 本地端執行步驟 (Getting Started)

若想在本地端運行此專案，請依照以下步驟操作：

### 1. 複製專案

```bash
將專案載下來在自己電腦上
```

### 2. 安裝後端套件

```bash
npm install
```

### 3. 設定資料庫與環境變數

請確保本地端已安裝並啟動 PostgreSQL，並建立對應的資料庫與資料表(資料表格式指令於sql_command)。接著在backend目錄建立 `.env` 檔案，填入您的資料庫連線資訊：

```env
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=your_port
DB_NAME=your_database_name
JWT_SECRET=自己設定
```

### 4. 啟動伺服器

```bash
#於backend底下終端輸入
node server.js
```

啟動後，開啟瀏覽器並前往 `http://localhost:3000`（或直接開啟前端 `index.html` 檔案）即可開始測試。

## 💭 學習心得與方向探索

透過這次從零到一的串接練習，我對前後端各自負責的職責有了更立體的認識：

* **在前端開發時**：我體驗到了畫面排版與使用者互動的即時回饋感。
* **在後端與資料庫開發時**：我體會到了資料結構設計、API 邏輯驗證與除錯的嚴謹性。

*我發現我可能偏好於後端開發，前端未來可能會比較需要AI的協助*

## 🔧 未來可改進與學習方向

由於本專案以「跑通流程」為首要目標，未來若有時間重構或延伸，預計可以加入以下優化：

* **輸入驗證與錯誤處理**：加強密碼格式驗證，並回傳更明確的 HTTP 狀態碼與錯誤訊息。
* **程式碼架構重構**：將後端路由（Routes）與資料庫操作邏輯（Controllers / Models）分離，提升可維護性。
* **忘記密碼實作**：這次並未實作忘記密碼按鈕
