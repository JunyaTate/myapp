import React, { useState } from 'react';
import Problem from './Problem';
import Editor from './Editor';
import Split from 'react-split';

import './styles/AceEditor.css';

const AceEditorComponent = () => {
    const [selectedTab, setSelectedTab] = useState("問題");

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
                    <div className="outer-container">
                        <div className="left-side-space">
                            <div className="left-header">
                                <div className="left-tab-container">
                                    <div className={`left-tab1 ${selectedTab === "問題" ? "left-tab-selected" : ""}`} onClick={() => handleTabClick("問題")}>
                                        問題
                                    </div>
                                    <div className={`left-tab2 ${selectedTab === "結果一覧" ? "left-tab-selected" : ""}`} onClick={() => handleTabClick("結果一覧")}>
                                        結果一覧
                                    </div>
                                </div>
                            </div>
                            {selectedTab === "問題" && <Problem />}
                            {selectedTab === "結果一覧" && (
                                <div className="tab-content">
                                    <p>ここに結果一覧のコンテンツを表示する</p>
                                </div>
                            )}
                        </div>
                        <div className='editor-container'>
                            <Editor />
                        </div>
                    </div>
    );
};

export default AceEditorComponent;
