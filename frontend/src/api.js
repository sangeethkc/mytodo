const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

export function getTodos() {
  return request("/todos");
}

export function createTodo(text) {
  return request("/todos", { method: "POST", body: JSON.stringify({ text }) });
}

export function updateTodo(id, data) {
  return request(`/todos/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export function deleteTodo(id) {
  return request(`/todos/${id}`, { method: "DELETE" });
}
