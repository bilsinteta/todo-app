import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { todoAPI } from "../services/api";
import { logout, getUser } from "../utils/auth";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
  });
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  const fetchTodos = async () => {
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;

      const response = await todoAPI.getTodos(params);
      setTodos(response.data);
    } catch (err) {
      setError("Failed to fetch todos");
      console.error(err);
    }
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null
      };

      if (editId) {
        // Update existing todo
        const response = await todoAPI.updateTodo(editId, payload);
        setTodos(todos.map(t => t.ID === editId ? response.data : t));
        setEditId(null);
      } else {
        // Create new todo
        const response = await todoAPI.createTodo(payload);
        setTodos([...todos, response.data]);
      }
      setIsModalOpen(false); // Close modal on success
    } catch (err) {
      setError(editId ? "Failed to update todo" : "Failed to create todo");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      const response = await todoAPI.updateTodo(id, { completed: !completed });
      setTodos(todos.map((todo) => (todo.ID === id ? response.data : todo)));
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const handleDeleteTodo = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await todoAPI.deleteTodo(deleteId);
      setTodos(todos.filter((todo) => todo.ID !== deleteId));
      if (editId === deleteId) handleCancelEdit();
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const handleEdit = (todo) => {
    setEditId(todo.ID);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onNewTask={() => { setEditId(null); setIsModalOpen(true); }}
      />
      <div className="page-title-section">
        <h1 className="page-title">My Tasks</h1>
        <p className="page-subtitle">Let's get things done!</p>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search items..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="input-field filter-input"
        />
        <div className="select-wrapper filter-wrapper">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="input-field filter-select"
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div className="select-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="select-wrapper filter-wrapper">
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="input-field filter-select"
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="select-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirm Delete"
      >
        <div className="form-stack">
          <p className="description">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={confirmDelete}
              className="btn btn-danger"
              style={{ flex: 1 }}
            >
              Delete
            </button>
            <button
              onClick={closeDeleteModal}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        title={editId ? "Edit Task" : "New Task"}
      >
        <TodoForm
          onSubmit={handleFormSubmit}
          initialData={editId ? todos.find(t => t.ID === editId) : null}
          onCancel={handleCancelEdit}
          loading={loading}
        />
      </Modal>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.ID}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Todos;
