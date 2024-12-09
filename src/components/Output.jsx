import React, { useState } from 'react';
import Login from './Login.jsx';

const Output = ({ mode, code, checkAuthentication }) => {
    const [input, setInput] = useState("sample input");
    const [output, setOutput] = useState("");
    const [errorOutput, setErrorOutput] = useState("");
    const [activeTab, setActiveTab] = useState("stdin");
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleRun = async () => {
        const requestBody = {
            language: mode === "python" ? "Python" : "Java",
            code: code,
            input: input,
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
                setOutput(data.stdout || ""); // 標準出力
                setErrorOutput(data.stderr || ""); // エラー出力
            } else {
                if (response.status === 401) {
                    setOutput("");
                    setErrorOutput("ログインしてください");
                    setShowLoginForm(true);
                    return;
                }
                setOutput("");
                setErrorOutput(data.stderr || "エラーが発生しました");
            }
        } catch (error) {
            console.error("Error executing code:", error);
            setOutput("");
            setErrorOutput("エラー: 実行に失敗しました。");
        }
    };

    const handleSubmit = () => {
        console.log('Submit button clicked');
    };

    return (
        <div className="output">
            <div className="tabs">
                <button 
                    className={`tab ${activeTab === "stdin" ? "active" : ""}`}
                    onClick={() => setActiveTab("stdin")}
                >
                    標準入力
                </button>
                <button 
                    className={`tab ${activeTab === "stdout" ? "active" : ""}`}
                    onClick={() => setActiveTab("stdout")}
                >
                    標準出力
                </button>
                <button 
                    className={`tab ${activeTab === "stderr" ? "active" : ""}`}
                    onClick={() => setActiveTab("stderr")}
                >
                    エラー出力
                </button>
            </div>

            <div className="tab-content">
                {activeTab === "stdin" && (
                    <div className="input-area">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="ここに標準入力を記述してください。"
                        />
                    </div>
                )}
                {activeTab === "stdout" && (
                    <div className="output-area">
                        {output || "標準出力はここに表示されます。"}
                    </div>
                )}
                {activeTab === "stderr" && (
                    <div className="output-area error">
                        {errorOutput || "エラー出力はここに表示されます。"}
                    </div>
                )}
            </div>

            <div className="button-container">
                <button className="run-button" onClick={handleRun}>▶ 実行する</button>
                <button className="submit-button" onClick={handleSubmit}>提出する</button>
            </div>

            {showLoginForm && (
                <Login 
                    setLoginForm={setShowLoginForm} 
                    checkAuthentication={checkAuthentication}
                />
            )}
        </div>
    );
};

export default Output;
