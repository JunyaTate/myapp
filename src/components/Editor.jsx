import React, { useState, } from 'react';
import AceEditor from 'react-ace';
import settingIcon from '../images/settingicon.png';


const Editor = () => {
    const [mode, setMode] = useState("python");
    const [output, setOutput] = useState("");
    const [theme, setTheme] = useState("monokai");
    const [fontSize, setFontSize] = useState(14);
    const [tabSize, setTabSize] = useState(4);
    const [showSettings, setShowSettings] = useState(false);

    const handleFontSizeIncrease = () => {
        setFontSize(prevFontSize => Math.min(prevFontSize + 1, 99));
    };

    const handleFontSizeDecrease = () => {
        setFontSize(prevFontSize => Math.max(prevFontSize - 1, 1));
    };

    const handleModeChange = (event) => {
        setMode(event.target.value);
    };

    const handleRun = () => {
        const result = "実行結果例";
        setOutput(result);
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
        console.log('change', newValue);
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
                    <p>ここに入出力を表示する</p>
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
        </>
    );
};

export default Editor;
