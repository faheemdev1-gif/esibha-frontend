import { useEffect, useState } from "react";
import { adminApi } from "../../api/api";
import { AuthContext } from "./auth";
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(() =>
    Boolean(sessionStorage.getItem("esibha_admin_token")),
  );
  const logout = () => {
    sessionStorage.removeItem("esibha_admin_token");
    setAdmin(null);
  };
  useEffect(() => {
    let active = true;
    const expired = () => setAdmin(null);
    window.addEventListener("esibha-admin-expired", expired);
    if (sessionStorage.getItem("esibha_admin_token")) {
      adminApi
        .get("/admin/me")
        .then((res) => {
          if (active) setAdmin(res.data.data);
        })
        .catch(() => {
          sessionStorage.removeItem("esibha_admin_token");
        })
        .finally(() => {
          if (active) setChecking(false);
        });
    }
    return () => {
      active = false;
      window.removeEventListener("esibha-admin-expired", expired);
    };
  }, []);
  const login = async (credentials) => {
    const { data } = await adminApi.post("/admin/login", credentials);
    sessionStorage.setItem("esibha_admin_token", data.data.token);
    setAdmin(data.data.admin);
  };
  return (
    <AuthContext.Provider value={{ admin, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
