require('dotenv').config(); //載入.env檔案
const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs'); //引入bcryptjs套件，用於密碼雜湊
const jwt = require('jsonwebtoken'); //引入jsonwebtoken套件，用於JWT驗證
const pool = require('./db'); //引入資料庫連線設定

const app = express(); //建立express伺服器

//啟用CORS
app.use(cors());

//解析JSON請求主體
app.use(express.json());

//測試首頁的路由
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//會員註冊API
app.post('/api/register', async (req, res) => {
    const {username, email, password} = req.body; //從請求主體中取得使用者輸入的資料
    if (!username || !email || !password) {
        return res.status(400).json({message: '請填寫所有欄位'})
    }

    try {
        //檢查使用者是否已經存在
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
        if (userCheck.rowCount > 0) {
            return res.status(400).json({message: '使用者已存在'});
        }
        //將密碼進行雜湊處理
        const saltRounds = 10; //設定雜湊的強度
        const hashedPassword = await bcryptjs.hash(password, saltRounds);

        //將使用者資料存入資料庫，RETURNING id, username, email表示在插入後返回使用者的id、username和email
        const newUser = await pool.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email', [username, email, hashedPassword]);

        //回傳註冊成功的訊息和使用者資料
        res.status(201).json({message: '註冊成功', user: newUser.rows[0]});
    } catch (err){
        console.error(err.message);
        res.status(500).json({message: '伺服器錯誤'});
    }
});

//使用者登入API
app.post('/api/login', async (req, res) => {
    const {username, password, rememberMe} = req.body; //從請求主體中取得使用者輸入的資料
    if (!username || !password) {
        return res.status(400).json({message: '請填寫所有欄位'})
    }
    try {
        //檢查使用者是否存在
        const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userCheck.rowCount === 0) {
            return res.status(400).json({message: '使用者不存在'});
        }

        //密碼驗證
        const user = userCheck.rows[0];
        const isPasswordValid = await bcryptjs.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({message: '密碼錯誤'});
        }
        else {
            //根據rememberMe選項決定JWT token的有效期限
            const expiresIn = rememberMe ? '7d' : '1h';
            //產生JWT token
            const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn});
            //記錄登入紀錄
            await pool.query('INSERT INTO user_login_logs (user_id) VALUES ($1)', [user.id]);
            res.status(200).json({
                message: '登入成功', 
                token, 
                user: {
                id: user.id, 
                username: user.username, 
                email: user.email
            }
            
        }); //回傳登入成功的訊息、JWT token和使用者資料
            
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: '伺服器錯誤'});
    }
});

//監聽3000端口
app.listen(3000,() => {
    console.log('Server is running on port 3000');
});