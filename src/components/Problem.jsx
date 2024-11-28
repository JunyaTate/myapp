import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

//import AceEditor from 'react-ace';
import './styles/Problem.css'; // スタイルを外部ファイルで管理


import 'brace/theme/monokai';

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
        const response = await axios.get(`http://localhost:8000/problem/${categoryId}/${problemId}`);
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
      <div>
        <div className="problem-divider"></div>
        <h2 className="problem-title">{problemData.title}</h2>
        <div className="problem-title-divider"></div>
      </div>

      <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
        {problemData.statement}
      </ReactMarkdown>
    </div>
  );
}

export default Problem;
