import React,{ useState} from "react";
import AceEditor from 'react-ace';
import './styles/AceEditor.css';
import settingIcon from '../images/settingicon.png'

import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/solarized_dark';
import  'brace/theme/solarized_light';

const Editor = () => {

    const [mode,setMode] = useState("python"); //エディタのモードを状態として管理(デフォルトはpython)
    const [output, setOutput] = useState(""); // 出力結果を保存する状態
    const [theme, setTheme] = useState("monokai"); //テーマの状態(デフォルトはmonokai)
    const [fontSize, setFontSize] = useState(14); //フォントサイズの状態(デフォルトは14)
    const [tabSize, setTabSize] = useState(4); //タブサイズの状態(デフォルトは4)
    const [showSettings, setShowSettings] = useState(false); //設定画面を表示するかどうかの状態

    //Handleちゃんたち↓

    //フォントサイズ管理
    const handleFontSizeIncrease = () => {
        setFontSize(prevFontSize => Math.min(prevFontSize + 1,99)); //最大を99にしてます
    }

    const handleFontSizeDecrease = () => {
        setFontSize(prevFontSize => Math.max(prevFontSize - 1,1)); //最小を1にしてます
    }

    //モード変更時に呼ばれる関数
    const handleModeChange = (event) => {
        setMode(event.target.value);
    }

    //実行ボタン
    const handleRun = () => {
        const result = "実行結果例"; // 実際の実行結果をここに設定 
        setOutput(result);
        console.log('Run button clicked');
    };

    //提出ボタン
    const handleSubmit = () => {
        console.log('Submit button clicked');
    };

    //設定ボタン
    const handleSettingsClick = () => { 
        setShowSettings(!showSettings); 
    }; 
    
    //テーマ切り替え
    const handleThemeChange = (event) => { 
        setTheme(event.target.value); 
    };  
    
    //タブサイズ
    const handleTabSizeChange = (event) => { 
        setTabSize(parseInt(event.target.value));
    };

    //設定画面を閉じるボタン
    const closeSettings = () => {
        setShowSettings(false);
    };

    //設定画面を閉じるエリア（ポップアップ外側をクリックしたら設定を閉じるようにしてます）
    const handleOverlayClick = (event) => {
        if(event.target.className === 'popup-overlay') {
            closeSettings();
        }
    };

    //なにこれ
    function onChange(newValue) {
        console.log('change', newValue);
    }

    //コンポーネントを返す
    return (
        <div className="editor-container">
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
                            fontSize={fontSize} //fontSizeから数値を受け取る
                            tabSize={tabSize}   //tabSizeから数値を受け取る
                            wrapEnabled={true}
                            style={{ flex: 1 }} // Flexboxの影響を受けるように
                            setOptions={{
                                tabSize: tabSize, //tabSizeの変更を確定させる...?
                            }}
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
                   
                
    
                {/* 設定画面 */}
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