//前端API URL
const API_URL = 'http://localhost:3000/api';

//取得註冊表單元素
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        //取得使用者輸入的資料
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        //檢查是否有空欄位
        if (!username || !email || !password) {
            alert('請填寫所有欄位');
            return;
        }
        try {
            //發送POST請求到註冊API
            const reponse = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });
            const data = await reponse.json();
            if (reponse.ok) {
                alert(data.message);
                //註冊成功後導向登入頁面
                window.location.replace('index.html');
            }else{
                alert(data.message);
            }

        } catch (error) {
            console.error('註冊時發生錯誤:', error);
        }
    });//新增註冊表單提交事件監聽器，防止表單提交後頁面重新載入
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const rememberMe = document.getElementById('remember-me').checked;
        if (!username || !password) {
            alert('請填寫所有欄位');
            return;
        }else {
            try {
                const reponse =await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        rememberMe
                    })
                });
                if (reponse.ok) {
                    const data = await reponse.json();
                    alert(data.message);
                }else {
                    const data = await reponse.json();
                    alert(data.message);
                }
            }catch (error) {
                console.error('登入時發生錯誤:', error);
            }
        }
    });//新增登入表單提交事件監聽器，防止表單提交後頁面重新載入
}