import axios from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import CheckMark from '../images/checkmark.png'; // Ensure this image path is correct
import CodeBlock from "./CodeBlock";
import Loading from './Loading';
import './styles/App.css';
import './styles/Problem.css';

const Problem = memo(() => {
  const { categoryId, problemId } = useParams();
  const [problemData, setProblemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false); // Track acceptance status

  const fetchProblem = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.aiblecode.net/api/problem/${categoryId}/${problemId}`, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = response.data;
      console.log(data); // デバッグ用：レスポンスを確認
      setProblemData(data);
      setIsAccepted(data.is_accepted); // Update isAccepted based on response
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [categoryId, problemId]);

  useEffect(() => {
    fetchProblem();
  }, [categoryId, problemId, fetchProblem]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!problemData) {
    return <div>No data found for Problem ID: {problemId}</div>;
  }

  return (
    <div className="problem-container">
      {/* Title Section */}
      <div className="problem-title">
        <h2>
          {problemData.title}
          {isAccepted && <img src={CheckMark} alt="Checkmark" width={25} height={25} className="checkmark-icon" />}
        </h2>
        <p>実行時間: {problemData.time_limit} sec以内 ／ メモリ: {problemData.memory_limit} MB以内 （正解者数: {problemData.accepted_count} 名）</p>
      </div>

      {/* Problem Statement */}
      <div className="problem-statement">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          components={{
            pre: ({ className, children }) => (
              <CodeBlock className={className} children={children} />
            ),
          }}
        >
          {problemData.statement}
        </ReactMarkdown>
      </div>
    </div>
  );
});

export default Problem;
