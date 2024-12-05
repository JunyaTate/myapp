import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login.jsx'; // 名前とパスが正しいことを確認

const LearnComponent = () => {
  const [showLoginForm, setLoginForm] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const handleLoginClick = () => {
    setLoginForm(!showLoginForm);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.aiblecode.net/api/category_list');
        setCategoryList(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };


    fetchCategories();
  }, []);

  return (
    <>
      <div className="sidebar">
        <h1 className="sidebar-title">AIbleCode</h1>
        <h2 className="sidebar-heading">学習</h2>
        <ul>
          {categoryList.map((category) => (
            <li key={category.id}>{category.title}</li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <p className="user-name">guest_user</p>
          <button className="logout-button" onClick={handleLoginClick}>ログイン</button>
          {showLoginForm && <Login setLoginForm={setLoginForm} />} {/* ログインフォームの表示/非表示 */}
          <a className="github-link" href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">GitHub</a>
          <p className="credits">©中島かんぱにー<br />since 2024-2025</p>
        </div>
      </div>
      <div className="learn-base">
        <h1>Learn</h1>
        <p>This is the Learn page content.</p>
        <Link to="/problem"><button>Go to /Problem</button></Link>
      </div>
    </>
  );
}

export default LearnComponent;
