import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import {
  UserPlusIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import api from "../api/axios";

export default function UserSelect() {
  const { userId, setUserId, users, setUsers } = useUser();

  const [isAdding, setIsAdding] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  // Ensure a valid user is selected on load if possible
  useEffect(() => {
    if (users.length > 0 && !users.find((u) => u.id === userId)) {
      setUserId(users[0].id);
    }
  }, [users, userId, setUserId]);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    const newId = Math.max(...users.map((u) => u.id), 0) + 1;
    const newUser = { id: newId, name: newUserName.trim() };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUserId(newId);
    setNewUserName("");
    setIsAdding(false);
  };

  const handleDeleteUser = async () => {
    if (users.length === 0) return;

    if (
      confirm("Are you sure you want to delete this user and all their tasks?")
    ) {
      try {
        // Delete tasks from backend first
        await api.delete("/tasks"); // This uses the current userId from interceptor/defaults
      } catch (err) {
        console.error("Failed to delete user tasks from backend:", err);
        alert(
          "Warning: Could not delete tasks from server. Deleting locally only."
        );
      }

      const updatedUsers = users.filter((u) => u.id !== userId);
      setUsers(updatedUsers);

      if (updatedUsers.length > 0) {
        setUserId(updatedUsers[0].id);
      } else {
        // No users left
      }
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm text-sm border border-gray-100 transition-all hover:shadow-md">
      <span className="text-gray-500 font-medium whitespace-nowrap">User:</span>

      {isAdding ? (
        <form
          onSubmit={handleAddUser}
          className="flex items-center gap-2 animate-fadeIn"
        >
          <input
            autoFocus
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Name..."
            className="w-32 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-gray-800"
          />
          <button
            type="submit"
            className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full transition-colors"
            title="Save User"
          >
            <CheckIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
            title="Cancel"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <>
          <select
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            disabled={users.length === 0}
            className="form-select border-transparent bg-gray-50 hover:bg-gray-100 rounded-md py-1 pl-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-sm font-medium cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {users.length === 0 ? (
              <option>Add user to start</option>
            ) : (
              users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))
            )}
          </select>
          <div className="flex items-center gap-1 border-l border-gray-200 pl-2 ml-1">
            <button
              onClick={() => setIsAdding(true)}
              className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
              title="Add New User"
            >
              <UserPlusIcon className="w-4 h-4" />
            </button>
            {users.length > 0 && (
              <button
                onClick={handleDeleteUser}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Delete Current User"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
