import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Ranking = () => {
    const [rankingData, setRankingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await axios.get('https://api.aiblecode.net/api/ranking');
                setRankingData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, []);

    return (
        <div>
            <h2>ランキング</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {rankingData && (
                <ul>
                    {rankingData.map((user, index) => (
                        <li key={index}>
                            {user.username}: {user.point}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Ranking;