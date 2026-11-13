"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", body: "", audience: "all", is_active: true });
  async function load() { setNotices(await api("/api/notices")); }
  useEffect(() => { load(); }, []);
  async function add() { await api("/api/notices", { method: "POST", body: JSON.stringify(form) }); setForm({ title: "", body: "", audience: "all", is_active: true }); load(); }
  async function del(id: number) { if (confirm("Delete?")) { await api(`/api/notices/${id}/delete`, { method: "POST" }); load(); } }
  async function toggle(id: number) { await api(`/api/notices/${id}/status`, { method: "POST" }); load(); }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notices</h2>
      <div className="mb-4 space-y-2 card p-5">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full input" />
        <textarea placeholder="Body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="w-full input" />
        <button onClick={add} className="btn btn-primary">Post</button>
      </div>
      <div className="table-wrap">
        <table className="w-full text-sm">
          <thead className="bg-navy-50"><tr><th className="text-left px-4 py-2">Title</th><th className="text-left px-4 py-2">Audience</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {notices.map((n) => (
              <tr key={n.id} className="border-t border-slate-100">
                <td className="px-4 py-2">{n.title}</td>
                <td className="px-4 py-2">{n.audience}</td>
                <td className="px-4 py-2 text-right flex gap-2 justify-end">
                  <button onClick={() => toggle(n.id)} className="text-xs text-navy-600 hover:underline">{n.is_active ? "Deactivate" : "Activate"}</button>
                  <button onClick={() => del(n.id)} className="text-xs text-rose-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



