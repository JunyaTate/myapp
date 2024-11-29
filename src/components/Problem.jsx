import React from 'react';
//import AceEditor from 'react-ace';
import './styles/Problem.css'; // スタイルを外部ファイルで管理
import './styles/App.css';
import ace from 'brace'


import 'brace/theme/monokai';

const Problem = () => {
  return (
    
    <div className="problem-container">
      {/* タイトル部分 */}
      <div>
        <div className="problem-divider"></div>
        <h2 className="problem-title">2.01 - 大人 or 子供</h2>
        <div className="problem-title-divider"></div>
      </div>

      {/* 問題文 */}
      <div className="problem-section">
        <h3 className="problem-section-title">問題文</h3>
        <p className="problem-description">
        太郎くんの年齢は現在n歳です。太郎君が18歳以上ならば Adult 、 18歳未満ならば Child を返す関数 is_adult を実装してください。
        </p>
      </div>

      {/* 入力 */}
      <div className="problem-section">
        <h3 className="problem-section-title">入力</h3>
        <p className="problem-description">
          入力は以下の形式で引数から与えられます。
        </p>
      </div>

      {/* 出力 */}
      <div className="problem-section">
        <h3 className="problem-section-title">出力</h3>
        <p className="problem-description">
          答えを戻り値として返してください。
        </p>
      </div>

        {/* サンプル */}
        <div className="problem-sample">
                        <h3 className="problem-section-title">サンプル 1</h3>
                        <div className="problem-sample-container">
                            <div className="problem-sample-item">
                                <div className="problem-sample-code-title">コード使用例</div>
                                <div className="problem-sample-code">
                                    <pre className="problem-sample-content">
                                        {`入力: 18
        出力: 大人`}
                                    </pre>
                                </div>
                            </div>
                            <div className="problem-sample-item">
                                <div className="problem-sample-output-title">出力例</div>
                                <div className="problem-sample-output">
                                    <pre className="problem-sample-content">
                                        {`入力: 17
        出力: 子供`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        export default Problem;
