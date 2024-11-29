import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AceEditorComponent from './components/AceEditor.jsx';
import Login from './components/Login.jsx';
import './components/styles/App.css';
import ace from 'brace'

import Learn from './components/Learn.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* メインページ */}
        <Route
          path="/problem"
          element={
            <div className="App"> {/*ヘッダー部分だけここで書いてます。ヘッダー下の要素はAceEditorComponentに書いてます*/}
              <header className="App-header"> 
                <span className="header-back-button">
                  <Link to="/learn">&lt;</Link> {/* Learnへのリンク */}
                </span>
                <h1>AIble Code</h1>
              </header>
              <AceEditorComponent />
            </div>
          }
        />
        {/* Learnページ */}
        <Route path="/learn" element={<Learn />} />
        {/* Loginページ */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
