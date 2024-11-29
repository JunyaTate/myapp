import React, { useState } from 'react';
import Problem from './Problem';
import Editor from'./Editor';
import './styles/AceEditor.css';
import './styles/Problem.css';
import './styles/App.css';

import { Link } from 'react-router-dom';

import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/solarized_dark';
import  'brace/theme/solarized_light';


const AceEditorComponent = () => {

    //Stateちゃんたち↓
    const [selectedTab, setSelectedTab] = useState("問題"); //タブを状態として管理（デフォルトは問題タブ）

    //タブ切り替え（問題と結果一覧タブ）
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    //コンポーネントを返す
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
                        <Editor />
                    </div>
        </>
        
    )
};
export default AceEditorComponent;

