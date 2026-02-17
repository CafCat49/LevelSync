export default function TaskList({ tasks, setTasks }) {
  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div>
      <h2>My Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span>Completed</span>
            <br />
          </div>
        </div>
      ))}
    </div>
  );
}
