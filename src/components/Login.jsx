import React, {  useState } from 'react';
import axios from 'axios';

const Login = ({ setLoginForm }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [signupError, setSignupError] = useState(null); // エラー状態
  const [signupUsername, setSignupUsername] = useState(''); // 新規登録時のユーザー名
  const [signupPassword, setSignupPassword] = useState(''); // 新規登録時のパスワード
  const [confirmPassword, setConfirmPassword] = useState(''); // 新規登録時のパスワード確認
  const [signupSuccess, setSignupSuccess] = useState(false);

  const closeLoginForm = () => {
    setLoginForm(false);
  };

  const handleOverlayClick = (event) => {
    if (event.target.className === 'login-popup-overlay') {
      closeLoginForm();
    }
  };

  const handleSignup = async () => {
    if(signupPassword !== confirmPassword){
      setSignupError('パスワードが一致しません');
      return;
    }

    try {
      const response = await axios.post('https://api.aiblecode.net/api/signup', {
        username: signupUsername,
        password: signupPassword,
      });

      
      console.log('サインアップ成功:',response.data);
      setSignupSuccess(true);
      setSignupUsername('');
      setSignupPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('サインアップエラー:', err);
      setSignupError('サインアップに失敗しました');
    }
  };

  /*const handleLogin = async () => {

    try {
      const response = await axios.post('https://api.aiblecode.net/api/token', {
      });
    } catch (err) {
    }
  };*/

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
              <input 
              className='login-input' 
              type="text" 
              value={signupUsername} 
              onChange={(e)=>setSignupUsername(e.target.value)}
              />
              <label className='login-label'>パスワード</label>
              <input 
              className='login-input' 
              type="password" 
              value={signupPassword} 
              onChange={(e)=>setSignupPassword(e.target.value)}
              />
              <label className='login-label'>パスワード確認</label>
              <input 
              className='login-input' 
              type="password" 
              value={confirmPassword} 
              onChange={(e)=>setConfirmPassword(e.target.value)}
              />
              <button className='login-button' onClick={handleSignup}>新規登録</button>
              {signupError&&<p className='error-massage'>{signupError}</p>}
              {signupSuccess&&closeLoginForm()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
