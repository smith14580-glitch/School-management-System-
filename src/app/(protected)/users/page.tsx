"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", username: "", email: "", role_id: "", password: "", status: "active" });
  async function load() { setUsers(await api("/api/users")); setRoles(await api("/api/users/roles")); }
  useEffect(() => { load(); }, []);
  async function add() { await api("/api/users", { method: "POST", body: JSON.stringify({ ...form, role_id: Number(form.role_id) }) }); setForm({ name: "", username: "", email: "", role_id: "", password: "", status: "active" }); load(); }
  async function toggle(id: number) { await api(`/api/users/${id}/status`, { method: "POST" }); load(); }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Accounts</h2>
      <div className="mb-4 space-y-2 rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <select value={form.role_id} onChange={(e) => setForm({ ...form, role_id: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white">
          <option value="">Role</option>
          {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
        <input placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <button onClick={add} className="rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">Add User</button>
      </div>
      <div className="rounded-xl bg-cream-50 border border-cream-300 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Name</th><th className="text-left px-4 py-2">Username</th><th className="text-left px-4 py-2">Role</th><th className="text-left px-4 py-2">Status</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-cream-200">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.username}</td>
                <td className="px-4 py-2">{u.role_name}</td>
                <td className="px-4 py-2">{u.status}</td>
                <td className="px-4 py-2 text-right"><button onClick={() => toggle(u.id)} className="text-xs text-brand-600 hover:underline">{u.status === "active" ? "Deactivate" : "Activate"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
