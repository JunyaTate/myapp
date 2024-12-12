import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router-dom";
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import CodeBlock from './CodeBlock';
import Loading from "./Loading";


const AiCompornent = ({ submissionId }) => {
    const { categoryId, problemId } = useParams();
    const [review, setReview] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAi() {
            try {
                const response = await fetch(`https://api.aiblecode.net/api/submission/${submissionId}/review`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                if (response.ok) {
                    setReview(data);
                } else {
                    setError('エラーが発生しました');
                }
            } catch (err) {
                console.error(err);
                setError('通信エラーが発生しました');
            } finally {
                setLoading(false);
            }
        }

        fetchAi();
    }, [categoryId, problemId, submissionId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div>
            <h2>AIの解析結果</h2>
            <div>
                <ReactMarkdown
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        pre: ({ className, children }) => (
                            <CodeBlock className={className} children={children} />
                        ),
                    }}
                >
                    {review.message}
                </ReactMarkdown>
            </div>
        </div>
    );
}

export default AiCompornent;