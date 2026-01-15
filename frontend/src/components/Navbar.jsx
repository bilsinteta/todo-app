import React from 'react';

function Navbar({ user, onLogout, onNewTask }) {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <h1 className="navbar-logo">DoIt.</h1>
                    <span className="navbar-welcome">Hi, {user?.username}</span>
                </div>
                <div className="navbar-actions">
                    <button onClick={onNewTask} className="btn btn-primary btn-sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="btn-text">New Task</span>
                    </button>
                    <button onClick={onLogout} className="btn btn-secondary btn-sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="btn-text">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
