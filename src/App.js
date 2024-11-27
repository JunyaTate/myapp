import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AceEditorComponent from './components/AceEditor.jsx';
import './components/styles/App.css';

import Learn from './Learn';

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
      </Routes>
    </Router>
  );
}

export default App;
