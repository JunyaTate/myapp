import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import './styles/Problem.css'; // スタイルを外部ファイルで管理
import './styles/App.css';


const Problem = () => {
  const { categoryId, problemId } = useParams();
  const [problemData, setProblemData] = useState(null); // 問題データの状態管理
  const [loading, setLoading] = useState(true); // ローディング状態
  const [error, setError] = useState(null); // エラー状態

  useEffect(() => {
    // 問題データを取得するAPI呼び出し
    async function fetchProblem() {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.aiblecode.net/api/problem/${categoryId}/${problemId}`);
        setProblemData(response.data); // 問題データを状態に設定
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProblem();
  }, [categoryId, problemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!problemData) {
    return <div>No data found for Problem ID: {problemId}</div>;
  }

  return (

    <div className="problem-container">
      {/* タイトル部分 */}
      <div className="problem-title">
        <h2>{problemData.title}</h2>
        <p>実行時間: {problemData.time_limit} sec以内 ／ メモリ: {problemData.memory_limit} MiB以内  （正解者数: {problemData.accepted_count} 名）</p>
      </div>

      <div className="problem-statement">
        <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
          {problemData.statement}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Problem;
