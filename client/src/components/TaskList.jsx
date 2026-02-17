export default function TaskList({ tasks, setTasks }) {
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

  return (
    <div>
      <h2>My Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span>Completed</span>
            <br />
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
