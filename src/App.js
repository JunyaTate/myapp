import React from 'react';
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AceEditorComponent from './components/AceEditor.jsx';
import Login from './components/Login.jsx';
import Logo from './images/Logo.jpg';

import './components/styles/AceEditor.css';
import './components/styles/App.css';
import './components/styles/Editor.css';
import './components/styles/Learn.css';
import './components/styles/Login.css';
import './components/styles/Output.css';
import './components/styles/Problem.css';
import './components/styles/ResultDetail.css';
import './components/styles/Results.css';

// AceEditorに必要なライブラリをインポート
import 'ace-builds/src-noconflict/ace';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';


import Learn from './components/Learn.jsx';
import { FontSizeProvider, ModeProvider, SelectedTabProvider, TabSizeProvider, ThemeProvider } from './components/ParamProvider.jsx';

function App() {
  return (
    <ModeProvider>
      <ThemeProvider>
        <FontSizeProvider>
          <TabSizeProvider>
            <Router>
              <Routes>
                {/* メインページ */}
                <Route
                  path="/problem/:categoryId/:problemId"
                  element={
                    <div className="App"> {/*ヘッダー部分だけここで書いてます。ヘッダー下の要素はAceEditorComponentに書いてます*/}
                      <header className="App-header">
                        <span className="header-back-button">
                          <Link to="/learn">&lt;</Link> {/* Learnへのリンク */}
                        </span>
                        <h1>AIbleCode</h1>
                        <p><img src={Logo} alt="AIbleCode" className='header-logo' /></p>
                      </header>
                      <SelectedTabProvider>
                        <AceEditorComponent />
                      </SelectedTabProvider>
                    </div>
                  }
                />
                {/* Learnページ */}
                <Route path="/learn" element={<Learn />} />
                {/* Loginページ */}
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate replace to="/learn" />} />
              </Routes>
            </Router>
          </TabSizeProvider>
        </FontSizeProvider>
      </ThemeProvider>
    </ModeProvider>
  );
}

export default App;
