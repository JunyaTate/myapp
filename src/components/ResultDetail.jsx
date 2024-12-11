import React, { useState, useEffect } from "react";

const ResultDetail = ({ submissionId }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        return <div className="text-center py-4">読み込み中...</div>;
    }

    if (error) {
        return (
            <div>
                {error}
            </div>
        );
    }

    return (
        <div className="result-detail-container">
            <div className="problem-title">
                <h2>提出結果</h2>
            </div>
            <div className="result-summary">
                <h3>コード</h3>
                {result.code ? (
                    <pre className="code-display">{result.code}</pre>
                ) : (
                    <div>コードが見つかりません。</div>
                )}
                <table className="result-summary-table">
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
                            <td>{Object.keys(result.statuses)[0]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultDetail;
