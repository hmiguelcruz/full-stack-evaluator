import { useEffect, useState } from "react";
import api from "./api/axios";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import { useUser } from "./context/UserContext";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId, currentUser } = useUser();

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    setTasks([]); // Clear old tasks instantly to avoid confusion
    try {
      // Explicitly pass header to avoid race conditions with Context updates
      const res = await api.get("/tasks", {
        headers: { "X-User-Id": userId },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]); // Refetch when user changes

  const handleCreate = async (newTask) => {
    try {
      const res = await api.post("/tasks", newTask);
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      const res = await api.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? res.data : t)));
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    // Confirmation handled in TaskCard UI
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <TaskForm onSubmit={handleCreate} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Your Tasks</h2>
        {loading && (
          <span className="text-sm text-gray-500 animate-pulse">
            Loading...
          </span>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4 border border-red-200">
          {error}
        </div>
      )}

      {!loading && tasks.length === 0 && !error && (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300 text-gray-400">
          <p>
            No tasks found for {currentUser?.name || `User ${userId}`}. Add one
            above!
          </p>
        </div>
      )}

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard
              task={task}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
