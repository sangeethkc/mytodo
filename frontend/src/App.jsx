import React from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleComplete = id => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <h1 className="header">My Colorful Todo List</h1>
      <input
        value={input}
        placeholder="Add a task"
        onChange={e => setInput(e.target.value)}
        className="todo-input"
      />
      <button onClick={addTodo} className="add-btn">Add</button>
      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleComplete(todo.id)}
            className={todo.completed ? "todo completed" : "todo"}
          >
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
