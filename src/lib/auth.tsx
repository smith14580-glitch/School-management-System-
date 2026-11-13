"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api, setToken, getToken } from "@/lib/api";

type User = { id: number; name: string; username: string; role: string; role_name: string; must_change_password?: boolean };
type AuthCtx = { user: User | null; loading: boolean; login: (u: string, p: string) => Promise<void>; logout: () => void };

const Ctx = createContext<AuthCtx>({ user: null, loading: true, login: async () => {}, logout: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = getToken();
    if (!t) { setLoading(false); return; }
    api("/api/auth/me").then((u) => setUser(u)).catch(() => setToken(null)).finally(() => setLoading(false));
  }, []);

  async function login(username: string, password: string) {
    const res: any = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) });
    setToken(res.access_token);
    setUser(res.user);
  }
  function logout() {
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  }
  return <Ctx.Provider value={{ user, loading, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() { return useContext(Ctx); }
