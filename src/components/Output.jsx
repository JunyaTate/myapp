import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading.jsx';
import Login from './Login.jsx';
import { modeContext, selectedTabContext } from './ParamProvider.jsx';

const Output = ({ code, checkAuthentication }) => {
    const { categoryId, problemId } = useParams();
    const { setSelectedTab } = useContext(selectedTabContext);
    const { mode } = useContext(modeContext);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [errorOutput, setErrorOutput] = useState("");
    const [activeTab, setActiveTab] = useState("stdin");
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [loadingRun, setLoadingRun] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handleRun = async () => {
        const requestBody = {
            language: mode === "python" ? "Python" : "Java",
            code: code,
            input: input,
        };

        try {
            setLoadingRun(true);
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
                if (data.stderr) {
                    setActiveTab("stderr");
                } else {
                    setActiveTab("stdout");
                }
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
        } finally {
            setLoadingRun(false);
        }
    };

    const handleSubmit = async () => {
        const requestBody = {
            language: mode === "python" ? "Python" : "Java",
            code: code,
        };

        try {
            setLoadingSubmit(true);
            const response = await fetch(`https://api.aiblecode.net/api/problem/${categoryId}/${problemId}/submit`, {
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
                setSelectedTab("問題");
                setTimeout(() => setSelectedTab("結果一覧"), 3);
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
        } finally {
            setTimeout(() => setLoadingSubmit(false), 5000);
        }
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
                        <textarea
                            value={output || ""}
                            placeholder="ここに標準出力が表示されます。"
                            readOnly
                        />
                    </div>
                )}
                {activeTab === "stderr" && (
                    <div className="output-area">
                        <textarea
                            value={errorOutput || ""}
                            placeholder="ここにエラー出力が表示されます。"
                            readOnly
                        />
                    </div>
                )}
            </div>
            <div className="button-container">
                <button
                    className="run-button"
                    onClick={handleRun}
                    disabled={loadingRun}
                    style={loadingRun ? { backgroundColor: '#d4d4d4' } : {}}>
                    {loadingRun ? <span><Loading width={20} /></span> : "▶ 実行する"}
                </button>
                <button
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={loadingSubmit}
                    style={loadingSubmit ? { backgroundColor: '#79A8FF' } : {}}>
                    {loadingSubmit ? <span><Loading width={20} /></span> : "提出する"}
                </button>
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
