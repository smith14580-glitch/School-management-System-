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
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: navy + gold branding */}
      <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-navy-800 to-navy-950 text-white relative">
        <div className="absolute inset-x-0 top-0 h-1 bg-gold-500" />
        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-12 h-12 rounded-xl bg-gold-500 text-navy-900 font-bold text-2xl shadow">S</span>
          <span className="font-semibold text-lg">School Management System</span>
        </div>
        <div className="max-w-md">
          <h1 className="text-4xl font-bold leading-tight">School Management System</h1>
          <p className="mt-3 text-slate-300 text-sm">Manage students, teachers, fees, attendance, exams and results — all in one place.</p>
        </div>
        <p className="text-xs text-slate-400">© School Management System</p>
      </div>

      {/* Right: login form */}
      <div className="grid place-items-center bg-page p-6">
        <div className="w-full max-w-md card p-8">
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 rounded-full bg-navy-700 text-white grid place-items-center text-xl font-bold mb-3">S</div>
            <h1 className="text-xl font-semibold text-slate-800">Sign in</h1>
            <p className="text-sm text-slate-500 mt-1">School Management System</p>
          </div>
          {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus
                className="input" />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                autoComplete="current-password" className="input" />
            </div>
            <button disabled={loading} className="btn btn-primary w-full">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-xs text-slate-500 text-center">
            Forgotten your password? Ask an administrator to reset it.
          </p>
        </div>
      </div>
    </div>
  );
}