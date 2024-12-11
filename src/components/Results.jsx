import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResultDetail from "./ResultDetail";

const Results = () => {
    const { categoryId, problemId } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' または 'detail'

    const getStatusInfo = (statuses) => {
        if (!statuses) return { label: '不明', color: 'text-gray-500' };
        const status = Object.keys(statuses)[0];
        switch (status) {
            case 'AC': return { label: '正解', color: 'text-green-600' };
            case 'WA': return { label: '不正解', color: 'text-yellow-600' };
            case 'TLE': return { label: '不正解', color: 'text-yellow-600' };
            case 'RE': return { label: '不正解', color: 'text-yellow-600' };
            default: return { label: status, color: 'text-gray-500' };
        }
    };

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`https://api.aiblecode.net/api/problem/${categoryId}/${problemId}/submissions`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                if (response.ok) {
                    setResults(data);
                } else {
                    setError(data.error || '結果の取得に失敗しました');
                }
            } catch (err) {
                setError(err.message || '通信エラーが発生しました');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [categoryId, problemId]);

    const handleDetailClick = (result) => {
        setSelectedResult(result);
        setViewMode('detail');
    };

    if (loading) {
        return <div className="text-center py-4">読み込み中...</div>;
    }

    if (error) {
        return (
            <div className="text-center text-red-600 py-4">
                {error}
            </div>
        );
    }

    const renderResultsList = () => (
        <div className="results-container">
            <div className="problem-title">
                <h2>あなたの提出</h2>
            </div>

            {results.length === 0 ? (
                <p className="not-result">提出結果がありません</p>
            ) : (
                <div className="result-list-container">
                    <table className="result-list-table">
                        <thead>
                            <tr>
                                <th>タイムスタンプ</th>
                                <th>言語</th>
                                <th>ジャッジ結果</th>
                                <th>詳細</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => {
                                const statusInfo = getStatusInfo(result.statuses);
                                return (
                                    <tr key={result.id}>
                                        <td>{new Date(result.created_at).toLocaleString()}</td>
                                        <td>{result.language}</td>
                                        <td className={statusInfo.color}>{statusInfo.label}</td>
                                        <td>
                                            <button onClick={() => handleDetailClick(result)}>詳細</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    const renderResultDetail = () => (
        <div className="result-details-container p-4">
            <ResultDetail submissionId={selectedResult.id} />
        </div>
    );

    return viewMode === 'list' ? renderResultsList() : renderResultDetail();
};

export default Results;
