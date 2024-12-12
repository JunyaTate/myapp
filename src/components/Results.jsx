import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import reloadIcon from "../images/reload.svg";
import Loading from "./Loading";
import ResultDetail from "./ResultDetail";

export const getStatusInfo = (statuses) => {
    if (!statuses) return { label: '不明', color: 'text-gray-500' };
    const status = Object.keys(statuses);

    const sum_val = status.reduce((sum, key) => sum + statuses[key], 0);

    if (statuses["WJ"] === undefined) {
        if (status.length === 1 && status[0] === 'AC') {
            return { label: '正解', color: 'text-green-600' };
        } else if (statuses["IE"] !== undefined) {
            return { label: '内部エラー', color: 'text-red-600' };
        } else if (statuses["CE"] !== undefined) {
            return { label: 'コンパイルエラー', color: 'text-yellow-600' };
        } else if (statuses["RE"] !== undefined) {
            return { label: '実行時エラー', color: 'text-yellow-600' };
        } else if (statuses["WA"] !== undefined) {
            return { label: '不正解', color: 'text-yellow-600' };
        } else if (statuses["TLE"] !== undefined) {
            return { label: '実行時間オーバー', color: 'text-yellow-600' };
        } else if (statuses["MLE"] !== undefined) {
            return { label: 'メモリオーバー', color: 'text-yellow-600' };
        } else {
            return { label: '不明', color: 'text-gray-500' };
        }
    } else {
        let finished = sum_val - statuses["WJ"];
        return { label: `ジャッジ中 (${finished} / ${sum_val})`, color: 'text-gray-500' };
    }
};


const Results = () => {
    const { categoryId, problemId } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' または 'detail'

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
            } else if (response.status === 401) {
                setError(data.error || '閲覧にはログインが必要です');
            } else {
                setError(data.error || '提出結果の取得に失敗しました');
            }
        } catch (err) {
            setError(err.message || '通信エラーが発生しました');
        } finally {
            setLoading(false);
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
                } else if (response.status === 401) {
                    setError(data.error || '閲覧にはログインが必要です');
                } else {
                    setError(data.error || '提出結果の取得に失敗しました');
                }
            } catch (err) {
                setError(err.message || '通信エラーが発生しました');
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [categoryId, problemId]);

    const handleReload = async () => {
        setLoading(true);
        setError(null);
        fetchResults();
    };

    const handleDetailClick = (result) => {
        setSelectedResult(result);
        setViewMode('detail');
    };

    if (loading) {
        return <Loading />;
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
            <div className="problem-title" style={{ display: "flex" }}>
                <h2>あなたの提出</h2>
                <button className="reload-button" onClick={handleReload}>
                    <img src={reloadIcon} alt="再読み込み" />
                </button>
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