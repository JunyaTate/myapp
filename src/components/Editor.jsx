import React, { useContext, useState } from 'react';
import AceEditor from 'react-ace';
import settingIcon from '../images/settingicon.png';
import { fontSizeContext, modeContext, tabSizeContext, themeContext } from './ParamProvider';


const Editor = ({ checkAuthentication, code, setCode }) => {
    const { theme, setTheme } = useContext(themeContext);
    const { mode, setMode } = useContext(modeContext);
    const { fontSize, setFontSize } = useContext(fontSizeContext);
    const { tabSize, setTabSize } = useContext(tabSizeContext);
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

            <div className="ace-editor-wrapper">
                <AceEditor
                    mode={mode}
                    theme={theme}
                    onChange={onChange}
                    value={code}
                    name="Editor"
                    width="100%"
                    height="100%"
                    showGutter={true}
                    highlightActiveLine={true}
                    fontSize={fontSize}
                    tabSize={tabSize}
                    wrapEnabled={true}
                    setOptions={{
                        tabSize: tabSize,
                    }}
                />
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
        </div>
    );
};

export default Editor;