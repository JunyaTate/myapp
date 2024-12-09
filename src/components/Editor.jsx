import React, { useState } from 'react';
import AceEditor from 'react-ace';
import settingIcon from '../images/settingicon.png';
import Login from './Login.jsx'; // Import the Login component

const Editor = ({ checkAuthentication }) => {
    const [mode, setMode] = useState("python");
    const [output, setOutput] = useState("");
    const [theme, setTheme] = useState("monokai");
    const [fontSize, setFontSize] = useState(14);
    const [tabSize, setTabSize] = useState(4);
    const [showSettings, setShowSettings] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [code, setCode] = useState(""); // Store code

    const handleFontSizeIncrease = () => {
        setFontSize(prevFontSize => Math.min(prevFontSize + 1, 99));
    };

    const handleFontSizeDecrease = () => {
        setFontSize(prevFontSize => Math.max(prevFontSize - 1, 1));
    };

    const handleModeChange = (event) => {
        setMode(event.target.value);
    };

    const handleRun = async () => {
        const requestBody = {
            language: mode === "python" ? "Python" : "Java",
            code: code,
            input: "sample input",
        };
    
        try {
            const response = await fetch('https://api.aiblecode.net/api/run', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'include',
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setOutput(data.stdout);
            } else {
                if (response.status === 401) {
                    // If unauthorized, show login form
                    setOutput("ログインしてください");
                    setShowLoginForm(true);
                    return;
                }
                setOutput(`Error: ${data.stderr || 'Something went wrong'}`);
            }
            
        } catch (error) {
            console.error("Error executing code:", error);
            setOutput("Error: Failed to execute the code.");
        }
    };

    const handleSubmit = () => {
        console.log('Submit button clicked');
    };

    const handleSettingsClick = () => {
        setShowSettings(!showSettings);
    };

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    const handleTabSizeChange = (event) => {
        setTabSize(parseInt(event.target.value));
    };

    const closeSettings = () => {
        setShowSettings(false);
    };

    const handleOverlayClick = (event) => {
        if (event.target.className === 'popup-overlay') {
            closeSettings();
        }
    };

    function onChange(newValue) {
        setCode(newValue);
    }

    return (
        <>
            <div className="editor">
                <div className="editor-header">
                    <span className='editor-title'>コード</span>
                    <button className="setting-button" onClick={handleSettingsClick}>
                        <img src={settingIcon} alt="設定" />
                    </button>
                    <select className="editor-mode-select" onChange={handleModeChange} value={mode}>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>
                </div>

                <AceEditor
                    mode={mode}
                    theme={theme}
                    onChange={onChange}
                    name="Editor"
                    width="100%"
                    height="100%"
                    showGutter={true}
                    highlightActiveLine={true}
                    fontSize={fontSize}
                    tabSize={tabSize}
                    wrapEnabled={true}
                    style={{ flex: 1 }}
                    setOptions={{
                        tabSize: tabSize,
                    }}
                />

                <div className="inout-container">
                    <div className="output-area">{output}</div>
                </div>

                <div className="button-container">
                    <button className="run-button" onClick={handleRun}>▶ 実行する</button>
                    <button className="submit-button" onClick={handleSubmit}>提出する</button>
                </div>
            </div>

            {showSettings && (
                <div className='popup-overlay' onClick={handleOverlayClick}>
                    <div className='popup-settings'>
                        <div className='popup-header'>
                            <button className='close-button' onClick={closeSettings}>✕</button>
                            <h3>エディタ設定</h3>
                        </div>
                        <div className='popup-content'>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>テーマ:</span>
                                <select value={theme} onChange={handleThemeChange} className='editor-mode-select'>
                                    <option value="monokai">monokai</option>
                                    <option value="solarized_dark">solarized_dark</option>
                                    <option value="solarized_light">solarized_light</option>
                                    <option value="github">github</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>タブ幅:</span>
                                <select value={tabSize} onChange={handleTabSizeChange} className="editor-mode-select">
                                    <option value={2}>2</option>
                                    <option value={4}>4</option>
                                    <option value={8}>8</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>フォントサイズ:</span>
                                <div className="font-mode-select" style={{ display: 'flex', alignItems: 'center' }}>
                                    <button onClick={handleFontSizeDecrease}>-</button>
                                    <span className="font-size-display" style={{ margin: '0 10px' }}>{fontSize}</span>
                                    <button onClick={handleFontSizeIncrease}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showLoginForm && (
                <Login 
                    setLoginForm={setShowLoginForm} 
                    checkAuthentication={checkAuthentication}
                />
            )}
        </>
    );
};

export default Editor;