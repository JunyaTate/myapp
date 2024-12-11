import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock = ({ className, children }) => {
    // 子要素のテキストを抽出する関数
    const extractText = (children) => {
        if (React.isValidElement(children)) {
            // 子要素がReact要素の場合、そのprops.childrenを取得
            return children.props.children || '';
        }
        if (typeof children === 'string') {
            // 子要素が文字列の場合、そのまま返す
            return children;
        }
        return '';
    };

    return <pre>{CodeBlockInner({ inline: false, className: children.props.className, children: extractText(children) })}</pre>;
};

const CodeBlockInner = ({ inline, className, children }) => {
    const [copied, setCopied] = useState(false);

    const mapping = {
        "py": "Python",
        "java": "Java",
        "cpp": "C++",
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(String(children).trim() + "\n").then(
            () => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // 2秒後に元の状態に戻す
            },
            (err) => {
                alert('Failed to copy: ' + err);
            }
        );
    };

    // インラインコードの場合はそのまま <code> タグを返す（ボタン非表示）
    if (inline) {
        return <code className={className}>{children}</code>;
    }

    const match = /language-(\w+)/.exec(className || '');
    const lang = match && match[1] ? match[1] : '';

    return (
        <div style={{ position: 'relative' }}>
            <h3 style={{ margin: "5px" }}>{mapping[lang]}</h3>
            <SyntaxHighlighter
                style={vscDarkPlus}
                language={lang}
                children={String(children).trim() + "\n"}
            />
            <button
                onClick={handleCopy}
                style={{
                    position: 'absolute',
                    top: lang ? '30px' : '10px',
                    right: '5.5%',
                    backgroundColor: '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                }}
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};

export default CodeBlock;
