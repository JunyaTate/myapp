import "ace-builds/src-noconflict/mode-javascript"; // or the mode you need
import "ace-builds/src-noconflict/theme-github"; // or the theme you need
import React, { useContext, useEffect, useState } from "react";
import AceEditor from "react-ace";
import reloadIcon from "../images/reload.svg";
import AiComponent from "./Ai";
import Loading from "./Loading";
import { getStatusInfo } from "./Results";

import { fontSizeContext, modeContext, tabSizeContext, themeContext } from "./ParamProvider";

const ResultDetail = ({ submissionId }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { mode } = useContext(modeContext);
    const { theme } = useContext(themeContext);
    const { fontSize } = useContext(fontSizeContext);
    const { tabSize } = useContext(tabSizeContext);
    const fetchResult = async () => {
        try {
            const response = await fetch(`https://api.aiblecode.net/api/submission/${submissionId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setResult(data);
            } else {
                setError(data.error || '結果の取得に失敗しました');
            }
        } catch (err) {
            setError(err.message || '通信エラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await fetch(`https://api.aiblecode.net/api/submission/${submissionId}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                if (response.ok) {
                    setResult(data);
                } else {
                    setError(data.error || '結果の取得に失敗しました');
                }
            } catch (err) {
                setError(err.message || '通信エラーが発生しました');
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [submissionId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div>
                {error}
            </div>
        );
    }

    const handleReload = async () => {
        setLoading(true);
        setError(null);
        fetchResult();
    }

    return (
        <div className="result-detail-container">
            <div className="problem-title" style={{ display: "flex" }}>
                <h2>提出結果</h2>
                <button className="reload-button" onClick={handleReload}>
                    <img src={reloadIcon} alt="再読み込み" />
                </button>
            </div>
            <div className="result-summary">
                <div className="result-code">
                    <h3>コード</h3>
                    <div className="ace-editor-wrapper">
                        <AceEditor
                            mode={mode}
                            theme={theme}
                            value={result.code}
                            name={`Code-${submissionId}`}
                            width="100%"
                            height="100%"
                            showGutter={true}
                            highlightActiveLine={true}
                            fontSize={fontSize}
                            tabSize={tabSize}
                            readOnly={true}
                        />
                    </div>
                </div>
                <table className="result-list-table">
                    <thead>
                        <tr>
                            <th>タイムスタンプ</th>
                            <th>言語</th>
                            <th>ジャッジ結果</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{new Date(result.created_at).toLocaleString()}</td>
                            <td>{result.language}</td>
                            <td className={getStatusInfo(result.statuses).color}>{getStatusInfo(result.statuses).label}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="result-review">
                    <h3>AI レビュー</h3>
                    <div className="review-container">
                        <div className="problem-statement"><AiComponent submissionId={submissionId} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultDetail;
