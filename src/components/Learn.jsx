import React from "react";
import "./styles/Learn.css";
import { Link } from 'react-router-dom'

const LearnComponent = ({goToApp}) => {
    return (
        <>
            <div className="sidebar">
                <h1 className="sidebar-title">AIbleCode</h1>
                <h2 className="sidebar-heading">学習</h2>
                <ul>
                    <li>リーダブルコード入門</li>
                    <li>デザインパターン入門</li>
                </ul>
                <div className="sidebar-footer">
                    <p className="user-name">guest_user</p>
                    <button className="logout-button">ログアウト</button>
                    <a className="github-link" href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <p className="credits">©loop0919<br />since 2024-2025</p>
                </div>
            </div>
            <div className="learn-base">
                <h1>Learn</h1>
                <p>This is the Learn page content.</p>
                <Link to="/problem"><button>Go to Problem</button></Link>
            </div>
        </>
    );
}

export default LearnComponent;
