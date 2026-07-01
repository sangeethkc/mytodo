import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const addTodo = async () => {
    if (input.trim() === "") return;
    try {
      const todo = await createTodo(input.trim());
      setTodos([...todos, todo]);
      setInput("");
    } catch (e) {
      setError(e.message);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    } catch (e) {
      setError(e.message);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <div className="app"><p>Loading...</p></div>;

  return (
    <div className="app">
      <h1 className="header">My Colorful Todo List</h1>
      {error && <p style={{ color: "#ff4b69" }}>{error}</p>}
      <input
        value={input}
        placeholder="Add a task"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
        className="todo-input"
      />
      <button onClick={addTodo} className="add-btn">Add</button>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleComplete(todo)}
            className={todo.completed ? "todo completed" : "todo"}
          >
            {todo.text}
            <button onClick={(e) => { e.stopPropagation(); removeTodo(todo.id); }} className="delete-btn">x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
