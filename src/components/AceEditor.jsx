import React, { useState } from 'react';
import AceEditor from 'react-ace';
import Problem from './Problem';
import './styles/AceEditor.css';
import settingIcon from '../images/settingicon.png'

import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/solarized_dark';
import  'brace/theme/solarized_light';


const AceEditorComponent = () => {

    const [mode,setMode] = useState("python"); //エディタのモードを状態として管理
    const [selectedTab, setSelectedTab] = useState("問題"); //タブを状態として管理
    const [output, setOutput] = useState(""); // 出力結果を保存する状態
    const [theme, setTheme] = useState("monokai"); 
    const [fontSize, setFontSize] = useState(14); 
    const [tabSize, setTabSize] = useState(4); 
    const [showSettings, setShowSettings] = useState(false);

    //モード変更時に呼ばれる関数
    const handleModeChange = (event) => {
        setMode(event.target.value);
    }

    const handleRun = () => {
        const result = "実行結果例"; // 実際の実行結果をここに設定 
        setOutput(result);
        console.log('Run button clicked');
    };

    const handleSubmit = () => {
        console.log('Submit button clicked');
    };

    //タブ切り替え関数
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
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
        if(event.target.className === 'popup-overlay') {
            closeSettings();
        }
    };

    //なにこれ
    function onChange(newValue) {
        console.log('change', newValue);
    }

    return (
    <>
        <div className="editor-container">
            {/*画面左側問題部分*/}
            <div className="left-side-space">
                <div className="left-header">
                    <div className="left-tab-container">
                    <div className={`left-tab1 ${selectedTab === "問題" ? "left-tab-selected" : ""}`} onClick={() => handleTabClick("問題")}>問題</div> 
                    <div className={`left-tab2 ${selectedTab === "結果一覧" ? "left-tab-selected" : ""}`} onClick={() => handleTabClick("結果一覧")}>結果一覧</div>
                    </div> 
                </div>
                {/* 問題タブのコンテンツ */}    
                {selectedTab === "問題" &&<Problem/>} 
                {/* 結果一覧タブのコンテンツ */}     
                {selectedTab === "結果一覧" && ( 
                    <div className="tab-content"> 
                    <p>ここに結果一覧のコンテンツを表示する</p> 
                    </div> 
                )}
            </div>

            {/*画面右側エディタ部分*/}
            <div className="editor">
                <div className="editor-header">
                    <span className='editor-title'>コード</span>
                    {/*プルダウンメニューでモードを選択*/}
                    <button className = "setting-button" onClick={handleSettingsClick}>
                        <img src={settingIcon} alt="設定" />
                    </button>   
                    <select className = "editor-mode-select" onChange={handleModeChange} value={mode}>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>
                </div>

                    {/*エディタ設定*/}
                    <AceEditor
                        mode={mode} // モードを状態から取得
                        theme={theme} //テーマ
                        onChange={onChange}
                        name="Editor"
                        width="100%"  // 親要素に収まるよう設定
                        height="100%" // 親要素に収まるよう設定
                        showGutter={true}
                        highlightActiveLine={true}
                        fontSize={fontSize}
                        tabSize={tabSize}
                        wrapEnabled={true}
                        style={{ flex: 1 }} // Flexboxの影響を受けるように
                    />

                {/*入出力の表示部分*/}
                <div className="inout-container">
                    <p>ここに入出力を表示する</p>
                    <div className="output-area">{output}</div>
                    </div>

                {/* 実行・提出ボタン */}
                    <div className="button-container">
                        <button className="run-button" onClick={handleRun}>▶ 実行する</button>
                        <button className="submit-button" onClick={handleSubmit}>提出する</button>
                    </div>
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
                                    <button onClick={() => setFontSize(fontSize - 1)}>-</button>
                                    <span className="font-size-display" style={{ margin: '0 10px' }}>{fontSize}</span>
                                    <button onClick={() => setFontSize(fontSize + 1)}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};
export default AceEditorComponent;