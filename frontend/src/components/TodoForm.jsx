import { useState, useEffect } from "react";

function TodoForm({ onSubmit, initialData, onCancel, loading }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: "",
        priority: "medium",
        due_date: "",
    });
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                tags: initialData.tags || "",
                priority: initialData.priority || "medium",
                due_date: initialData.due_date ? new Date(initialData.due_date).toISOString().split('T')[0] : "",
            });
        } else {
            setFormData({
                title: "",
                description: "",
                tags: "",
                priority: "medium",
                due_date: "",
            });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        if (!initialData) {
            setFormData({
                title: "",
                description: "",
                tags: "",
                priority: "medium",
                due_date: "",
            });
        }
    };

    // Helper to get consistent tag colors
    const getTagColor = (tag) => {
        const colors = ["#DBEAFE", "#FCE7F3", "#DCFCE7", "#FEF3C7", "#E0E7FF", "#F1F5F9"];
        let hash = 0;
        for (let i = 0; i < tag.length; i++) {
            hash = tag.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = tagInput.trim();
            if (val) {
                const currentTags = formData.tags ? formData.tags.split(',').filter(t => t) : [];
                if (!currentTags.includes(val)) {
                    const newTags = [...currentTags, val].join(',');
                    setFormData({ ...formData, tags: newTags });
                }
                setTagInput("");
            }
        } else if (e.key === 'Backspace' && !tagInput && formData.tags) {
            const currentTags = formData.tags.split(',').filter(t => t);
            if (currentTags.length > 0) {
                currentTags.pop();
                setFormData({ ...formData, tags: currentTags.join(',') });
            }
        }
    };

    const removeTag = (tagToRemove) => {
        const currentTags = formData.tags ? formData.tags.split(',').filter(t => t) : [];
        const newTags = currentTags.filter(t => t !== tagToRemove).join(',');
        setFormData({ ...formData, tags: newTags });
    };

    const tagsList = formData.tags ? formData.tags.split(',').filter(t => t) : [];

    return (
        <form onSubmit={handleSubmit} className="form-stack">
            <div className="form-row">
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="What needs to be done?"
                    className="input-field"
                    style={{ flex: 1 }}
                    required
                />
                <div className="select-wrapper" style={{ flex: "none", width: "140px" }}>
                    <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="input-field filter-select"
                        style={{ width: "100%", flex: "none" }}
                    >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <div className="select-arrow">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add details..."
                className="input-field"
                style={{ minHeight: "80px", resize: "vertical", width: "100%" }}
            />

            {/* Tags Input - Full Width */}
            <div className="form-row">
                <div className="tag-container">
                    {tagsList.map((tag, i) => (
                        <span key={i} className="tag-chip" style={{ backgroundColor: getTagColor(tag) }}>
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="remove-tag-btn">&times;</button>
                        </span>
                    ))}
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder={tagsList.length === 0 ? "Type tag & Enter..." : "Add more..."}
                        className="tag-input"
                    />
                </div>
            </div>

            {/* Date Input - Full Width or Auto */}
            <div className="form-row">
                <input
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    className="input-field"
                    style={{ width: "100%" }}
                />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1 }}>
                    {loading ? "Saving..." : (initialData ? "Update Task" : "Add Task")}
                </button>
                {initialData && (
                    <button type="button" onClick={onCancel} className="btn btn-secondary">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

// Styles moved to index.css

export default TodoForm;
