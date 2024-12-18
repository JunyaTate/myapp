import axios from 'axios';
import React, { useState, useRef } from 'react';

const Login = ({ setLoginForm, checkAuthentication }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  
  // Ref to track if mouse down started inside the popup
  const mouseDownInsideRef = useRef(false);

  const closeLoginForm = () => {
    setLoginForm(false);
  };

  const handleOverlayMouseDown = (event) => {
    // Check if mouse down is on the overlay
    if (event.target.className === 'login-popup-overlay') {
      mouseDownInsideRef.current = false;
    } else {
      mouseDownInsideRef.current = true;
    }
  };

  const handleOverlayMouseUp = (event) => {
    // Only close if mouse down was on the overlay and mouse up is on the overlay
    if (
      !mouseDownInsideRef.current && 
      event.target.className === 'login-popup-overlay'
    ) {
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
        withCredentials: true
      });
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        closeLoginForm();
        checkAuthentication();
      }
    } catch (err) {
      setError('ログインに失敗しました。ユーザー名またはパスワードを確認してください。');
      console.error('Login error:', err);
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    const requestBody = {
      username: username,
      password: password,
    };
    try {
      const response = await fetch('https://api.aiblecode.net/api/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include',
      });
      
      if (response.status === 200) {
        // Automatically log in after successful signup
        const loginResponse = await axios.post('https://api.aiblecode.net/api/token', new URLSearchParams({
          username,
          password,
          grant_type: 'password'
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
        });

        if (loginResponse.status === 200) {
          console.log('Signup and login successful');
          closeLoginForm();
          checkAuthentication();
        }
      } else if (response.status === 400) {
        setError('ユーザー名が既に使用されています');
      }
    } catch (err) {
      setError('新規登録に失敗しました。');
      console.error('Signup error:', err);
    }
  };

  return (
    <div 
      className='login-popup-overlay' 
      onMouseDown={handleOverlayMouseDown}
      onMouseUp={handleOverlayMouseUp}
    >
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
              <button className='login-button' onClick={handleSignup}>新規登録</button>
              {error && <p className='error-message'>{error}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;