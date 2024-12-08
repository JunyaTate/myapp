import React, { useState } from 'react';
import Split from 'react-split';
import Editor from './Editor';
import Problem from './Problem';
import Output from './Output';

import './styles/AceEditor.css';

const AceEditorComponent = () => {
    const [selectedTab, setSelectedTab] = useState("問題");
    const [mode, setMode] = useState("python");
    const [code, setCode] = useState("");

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const checkAuthentication = () => {
        console.log("Authentication checked");
    };

    return (
        <div className="outer-container">
            <Split className="split"
                sizes={[50, 50]} 
                minSize={400}    
                expandToMin={false} 
                gutterSize={8}   
                gutterAlign="center" 
                dragInterval={1}  
                direction="horizontal" 
            >
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
                    <Editor 
                        checkAuthentication={checkAuthentication} 
                        mode={mode} 
                        setMode={setMode}
                        code={code}
                        setCode={setCode}
                    />
                    <Output 
                        mode={mode} 
                        code={code} 
                        checkAuthentication={checkAuthentication}
                    />
                </div>
            </Split>
        </div>
    );
};

export default AceEditorComponent;