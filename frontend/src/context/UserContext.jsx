import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

const UserContext = createContext();

const STORAGE_KEY = "task_app_users";

export function UserProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [userId, setUserId] = useState(1);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    // Dynamically update the header whenever userId changes
    if (userId) {
      api.defaults.headers.common["X-User-Id"] = userId;
    } else {
      delete api.defaults.headers.common["X-User-Id"];
    }
    setIsReady(true);
  }, [userId]);

  const currentUser = users.find((u) => u.id === userId);

  if (!isReady) return null;

  return (
    <UserContext.Provider
      value={{ userId, setUserId, users, setUsers, currentUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
