import React, { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("todo");

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  };

  const filteredTasks = tasks
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => (tab === "todo" ? !t.completed : t.completed));

  return (
    <div className="wrapper">
      <div className="todo-card">
        <h1>To-do-list</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input search"
        />

        {/* Add Task */}
        <div className="add-section">
          <input
            type="text"
            placeholder="✏️ Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input"
          />
          <button className="btn add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            onClick={() => setTab("todo")}
            className={tab === "todo" ? "tab active" : "tab"}
          >
            To Do
          </button>

          <button
            onClick={() => setTab("completed")}
            className={tab === "completed" ? "tab active" : "tab"}
          >
            Completed
          </button>
        </div>

        {/* List */}
        <ul className="list">
          {filteredTasks.length === 0 && (
            <p className="empty">No tasks found.</p>
          )}

          {filteredTasks.map((t) => (
            <li key={t.id} className="item">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleComplete(t.id)}
              />

              <input
                type="text"
                value={t.text}
                onChange={(e) => updateTask(t.id, e.target.value)}
                className="edit-input"
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                }}
              />

              <button className="delete-btn" onClick={() => deleteTask(t.id)}>
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
