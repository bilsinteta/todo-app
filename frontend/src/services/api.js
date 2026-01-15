import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (username, password) =>
    api.post("/auth/register", { username, password }),

  login: (username, password) =>
    api.post("/auth/login", { username, password }),
};

// Todo API
export const todoAPI = {
  getTodos: (params) => api.get("/todos", { params }),

  createTodo: (todoData) => api.post("/todos", todoData),

  updateTodo: (id, todoData) => api.put(`/todos/${id}`, todoData),

  deleteTodo: (id) => api.delete(`/todos/${id}`),
};

export default api;
