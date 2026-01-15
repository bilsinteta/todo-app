function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const getPriorityColor = (p) => {
    switch (p) {
      case "high": return { bg: "#FEF2F2", text: "#EF4444" }; // Red-50, Red-500
      case "low": return { bg: "#F0FDF4", text: "#22C55E" }; // Green-50, Green-500
      default: return { bg: "#EFF6FF", text: "#3B82F6" };    // Blue-50, Blue-500
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = todo.due_date && new Date(todo.due_date) < new Date() && !todo.completed;

  // Simple hash function to generate consistent color for tags
  // Better palette: Blue, Pink, Green, Yellow, Indigo, Slate
  const getTagColor = (tag) => {
    const colors = ["#DBEAFE", "#FCE7F3", "#DCFCE7", "#FEF3C7", "#E0E7FF", "#F1F5F9"];
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const tagsList = todo.tags ? todo.tags.split(",").map(t => t.trim()).filter(t => t) : [];

  return (
    <div className={`todo-item ${todo.completed ? 'todo-completed' : ''}`}
      style={{
        backgroundColor: todo.completed ? "#f9f9f9" : "white",
        opacity: todo.completed ? 0.8 : 1,
      }}
    >
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.ID, todo.completed)}
          className="checkbox"
          style={styles.checkbox}
        />
        <div className="todo-text-content">
          <div className="todo-header-row">
            <span
              className={`todo-title ${todo.completed ? 'todo-done' : ''}`}
            >
              {todo.title}
            </span>
            <span className="badge" style={{
              backgroundColor: getPriorityColor(todo.priority).bg,
              color: getPriorityColor(todo.priority).text
            }}>
              {todo.priority || "medium"}
            </span>
            {todo.due_date && (
              <span className="date-label" style={{
                color: isOverdue ? "#d32f2f" : "#888",
                fontWeight: isOverdue ? "bold" : "normal"
              }}>
                {isOverdue ? "⚠️ " : "📅 "}
                {formatDate(todo.due_date)}
              </span>
            )}
          </div>

          {todo.description && (
            <div className="description" style={styles.description}>{todo.description}</div>
          )}

          {tagsList.length > 0 && (
            <div className="tags-row" style={styles.tagsRow}>
              {tagsList.map((tag, i) => (
                <span key={i} className="tag-badge" style={{
                  backgroundColor: getTagColor(tag),
                  color: "#334155" // Slate-700 text for contrast
                }}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => onEdit(todo)} className="btn btn-edit" title="Edit Task">
          Edit
        </button>
        <button onClick={() => onDelete(todo.ID)} className="btn btn-danger" title="Delete Task">
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  // Remaining inline styles for dynamic colors or specific overrides if needed
  checkbox: {
    marginTop: "4px",
    width: "20px",
    height: "20px",
    cursor: "pointer",
    accentColor: "#3B82F6",
  },
  description: {
    fontSize: "14px",
    color: "#64748B",
    margin: "4px 0 8px 0",
    lineHeight: "1.5",
  },
  tagsRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "4px",
  }
};

export default TodoItem;
