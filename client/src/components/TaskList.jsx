import { useState } from "react";

export default function TaskList({ tasks, setTasks }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const startEdit = (task) => {
  setEditingId(task.id);
  setEditTitle(task.title);
  setEditDescription(task.description);
};

const saveEdit = (taskId) => {
  setTasks(tasks.map(task =>
    task.id === taskId
      ? { ...task, title: editTitle, description: editDescription }
      : task
  ));
  setEditingId(null);
};

  return (
     <div>
    <h2>My Tasks</h2>
    {tasks.map((task) => (
      <div key={task.id}>
        {editingId === task.id ? (
          <div>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <button onClick={() => saveEdit(task.id)}>Save</button>
            <button onClick={() => setEditingId(null)}>Cancel</button>
          </div>
        ) : (
          <div>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span>Complete</span>
              <button onClick={() => startEdit(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
  );
}
