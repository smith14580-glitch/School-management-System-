"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) { router.replace("/dashboard"); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await login(username, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-cream-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-cream-50 border border-cream-300 p-8 shadow-card">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-brand-700 text-cream-50 grid place-items-center text-xl font-bold mb-3">
            S
          </div>
          <h1 className="text-xl font-semibold mb-1">Sign in</h1>
          <p className="text-sm text-brand-500 mt-1">School Management System</p>
          {error && <div className="mb-4 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{error}</div>}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus
                className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                autoComplete="current-password" className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm"
              />
            </div>
            <button disabled={loading} className="btn btn-primary w-full">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}