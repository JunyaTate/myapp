import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles/Ranking.css';

const Ranking = () => {
    const [rankingData, setRankingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRanking = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://api.aiblecode.net/api/ranking');
            setRankingData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRanking();
    }, []);

    return (
        <div className="ranking-container">
            <h2 className="ranking-title">🏆 ランキング 🏆</h2>
            {loading && <p>ロード中...</p>}
            {error && (
                <div>
                    <p>エラー: {error.message}</p>
                    <button onClick={fetchRanking}>再試行</button>
                </div>
            )}
            {rankingData && rankingData.length > 0 ? (
                <table className="ranking-table">
                    <thead>
                        <tr>
                            <th>順位</th>
                            <th>ユーザー名</th>
                            <th>ポイント</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankingData.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.point} ポイント</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>データがありません。</p>
            )}
        </div>
    );
};

export default Ranking;
