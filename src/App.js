import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AceEditorComponent from './components/AceEditor.jsx';
import Login from './components/Login.jsx';

import './components/styles/App.css';
import './components/styles/AceEditor.css';
import './components/styles/Problem.css';
import './components/styles/Login.css';
import './components/styles/Learn.css';
import './components/styles/Editor.css';

// AceEditorに必要なライブラリをインポート
import 'ace-builds/src-noconflict/ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';


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
