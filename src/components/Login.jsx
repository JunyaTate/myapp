import React, { useState } from 'react';

const Login = ({ setLoginForm }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'

  const closeLoginForm = () => {
    setLoginForm(false);
  };

  const handleOverlayClick = (event) => {
    if (event.target.className === 'login-popup-overlay') {
      closeLoginForm();
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
              <input className='login-input' type="text" />
              <label className='login-label'>パスワード</label>
              <input className='login-input' type="password" />
              <button className='login-button'>ログイン</button>
            </>
          ) : (
            <>
              <label className='login-label'>ユーザー名</label>
              <input className='login-input' type="text" />
              <label className='login-label'>パスワード</label>
              <input className='login-input' type="password" />
              <label className='login-label'>パスワード確認</label>
              <input className='login-input' type="password" />
              <button className='login-button'>新規登録</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
