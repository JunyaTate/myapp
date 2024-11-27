import React, { useState } from 'react';
import AceEditor from 'react-ace';
import Problem from './Problem';
import './styles/AceEditor.css';

import 'brace/mode/python';
import 'brace/mode/java';


const AceEditorComponent = () => {

    const [mode,setMode] = useState("python"); //エディタのモードを状態として管理
    const [selectedTab, setSelectedTab] = useState("問題"); //タブを状態として管理
    const [output, setOutput] = useState(""); // 出力結果を保存する状態

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
    }

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
                    <select className = "editor-mode-select" onChange={handleModeChange} value={mode}>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>
                </div>

                    {/*エディタ設定*/}
                    <AceEditor
                        mode={mode} // モードを状態から取得
                        theme="monokai" //monokaiテーマ
                        onChange={onChange}
                        name="Editor"
                        width="100%"  // 親要素に収まるよう設定
                        height="100%" // 親要素に収まるよう設定
                        showGutter={true}
                        highlightActiveLine={true}
                        fontSize={14}
                        tabSize={4}
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
        </>
    )
};
export default AceEditorComponent;