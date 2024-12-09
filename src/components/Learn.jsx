import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login.jsx';

const LearnComponent = () => {
  const [showLoginForm, setLoginForm] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [problemList, setProblemList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('guest_user');

  const handleLoginClick = () => {
    setLoginForm(!showLoginForm);
  };

  const handleLogoutClick = async () => {
    try {
      await axios.post('https://api.aiblecode.net/api/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUsername('guest_user');
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const checkAuthentication = async () => {
    try {
      const authResponse = await axios.get('https://api.aiblecode.net/api/is_authenticated', { withCredentials: true });
      setIsAuthenticated(authResponse.data.is_authenticated);

      if (authResponse.data.is_authenticated) {
        const userListResponse = await axios.get('https://api.aiblecode.net/api/user_list', { withCredentials: true });

        if (userListResponse.data && userListResponse.data.length > 0) {
          setUsername(userListResponse.data[0].username || 'guest_user');
        } else {
          setUsername('guest_user');
        }
      } else {
        setUsername('guest_user');
      }
    } catch (error) {
      console.error('Authentication check error:', error);
      setIsAuthenticated(false);
      setUsername('guest_user');
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchCategoriesAndProblems = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get('https://api.aiblecode.net/api/category_list');
        setCategoryList(categoriesResponse.data);

        // Fetch problem lists
        const problemListResponse = await axios.get('https://api.aiblecode.net/api/problem_list');
        setProblemList(problemListResponse.data);
      } catch (error) {
        console.error('Error fetching categories or problems:', error);
      }
    };
    fetchCategoriesAndProblems();
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
          <p className="user-name">{username}</p>
          {isAuthenticated ? (
            <button className="logout-button" onClick={handleLogoutClick}>ログアウト</button>
          ) : (
            <button className="logout-button" onClick={handleLoginClick}>ログイン</button>
          )}
          {showLoginForm && <Login setLoginForm={setLoginForm} checkAuthentication={checkAuthentication} />}
          <a className="github-link" href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">GitHub</a>
          <p className="credits">©中島かんぱにー<br />since 2024-2025</p>
        </div>
      </div>
      <div className="learn-base">
        <h1 className="learn-title">学習</h1>
        {problemList.map((category) => (
          <div key={category.id} className="category-section">
            <h2 className="category-title">{category.title}</h2>
            <p className="category-description">{category.description}</p>
            <ul className="problem-list">
              {category.problems.map((problem) => (
                <li key={problem.id} className="problem-item">
                  <Link
                    to={`/problem/${category.path_id}/${problem.path_id}`}
                    className="problem-button"
                  >
                    <p className={`problem-level-${problem.level}`}>{"★".repeat(problem.level)}</p>
                    {problem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default LearnComponent;