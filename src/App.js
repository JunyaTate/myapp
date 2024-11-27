import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AceEditorComponent from './components/AceEditor.jsx';
import './components/styles/App.css';

import Learn from './Learn';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* メインページ */}
          <Route
            path="/"
            element={
              <>
                <header className="App-header">
                  <span className="header-back-button">
                    <Link to="/learn">&lt;</Link> {/* Learnへのリンク */}
                  </span>
                  <h1>AIble Code</h1>
                </header>
                <AceEditorComponent />
              </>
            }
          />
          {/* Learnページ */}
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
