import React from "react";

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 style={{ margin: 0, fontSize: "20px", color: "#1E293B" }}>{title}</h2>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "28px", cursor: "pointer", color: "#94A3B8" }}>
                        &times;
                    </button>
                </div>
                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
}

const styles = {
    // Most styles moved to index.css for consistency and responsiveness
    // Keeping purely structural/reset styles inline if needed, but mostly relying on classes now
};

export default Modal;
