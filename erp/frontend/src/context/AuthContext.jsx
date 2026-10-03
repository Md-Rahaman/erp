import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
  const [user, setUser] = useState(() => {
    const x = localStorage.getItem("user");
    return x ? JSON.parse(x) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      setLoading(false);
      return;
    }
    api.get("/auth/me")
      .then(res => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const token = await api.post("/auth/login", {email, password});
    localStorage.setItem("access_token", token.data.access_token);
    const me = await api.get("/auth/me");
    setUser(me.data);
    localStorage.setItem("user", JSON.stringify(me.data));
  }

  async function register(data) {
    await api.post("/auth/register", data);
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{user, loading, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
