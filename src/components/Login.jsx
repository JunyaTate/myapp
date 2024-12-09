import axios from 'axios';
import React, { useState } from 'react';

const Login = ({ setLoginForm, checkAuthentication }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const closeLoginForm = () => {
    setLoginForm(false);
  };

  const handleOverlayClick = (event) => {
    if (event.target.className === 'login-popup-overlay') {
      closeLoginForm();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api.aiblecode.net/api/token', new URLSearchParams({
        username,
        password,
        grant_type: 'password'
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true // セッションのcookieを含めるために追加
      });
      if (response.status === 200) {
        // ログイン成功時の処理（例: トークンの保存など）
        console.log('Login successful:', response.data);
        closeLoginForm();
        // Call the checkAuthentication function passed from parent component
        checkAuthentication();
      }
    } catch (err) {
      setError('ログインに失敗しました。ユーザー名またはパスワードを確認してください。');
      console.error('Login error:', err);
    }
  };

  return (
    <div className='login-popup-overlay' onClick={handleOverlayClick}>
      <div className='login-popup-settings'>
        <div className='login-popup-header'>
          <div className="login-popup-tabs">
            <button
              className={`tab-button1 ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              ログイン
            </button>
            <button
              className={`tab-button2 ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              新規登録
            </button>
          </div>
          <button className='login-popup-close-button' onClick={closeLoginForm}>✕</button>
        </div>
        <div className='login-popup-content'>
          {activeTab === 'login' ? (
            <>
              <label className='login-label'>ユーザー名</label>
              <input
                className='login-input'
                type="text"
                placeholder='ユーザー名'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className='login-label'>パスワード</label>
              <input
                className='login-input'
                type="password"
                placeholder='パスワード'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className='login-button' onClick={handleLogin}>ログイン</button>
              {error && <p className='error-message'>{error}</p>}
            </>
          ) : (
            <>
              <label className='login-label'>ユーザー名</label>
              <input
                className='login-input'
                type="text"
                placeholder='ユーザー名'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className='login-label'>パスワード</label>
              <input
                className='login-input'
                type="password"
                placeholder='パスワード'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className='login-label'>パスワード(確認)</label>
              <input
                className='login-input'
                type="password"
                placeholder='パスワード(確認)'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className='login-button'>新規登録</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;