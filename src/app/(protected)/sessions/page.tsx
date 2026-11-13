"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [form, setForm] = useState({ year_label: "", start_date: "", end_date: "", is_current: false, is_locked: false });
  async function load() { setSessions(await api("/api/sessions")); }
  useEffect(() => { load(); }, []);
  async function add() { await api("/api/sessions", { method: "POST", body: JSON.stringify(form) }); setForm({ year_label: "", start_date: "", end_date: "", is_current: false, is_locked: false }); load(); }
  async function makeCurrent(id: number) { await api(`/api/sessions/${id}/current`, { method: "POST" }); load(); }
  async function toggleLock(id: number) { await api(`/api/sessions/${id}/lock`, { method: "POST" }); load(); }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Academic Sessions</h2>
      <div className="mb-4 space-y-2 rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <input placeholder="Year label (e.g. 2026-2027)" value={form.year_label} onChange={(e) => setForm({ ...form, year_label: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <button onClick={add} className="rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">Add</button>
      </div>
      <div className="rounded-xl bg-cream-50 border border-cream-300 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Label</th><th className="text-left px-4 py-2">Dates</th><th className="text-left px-4 py-2">Current</th><th className="text-left px-4 py-2">Locked</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.id} className="border-t border-cream-200">
                <td className="px-4 py-2">{s.year_label}</td>
                <td className="px-4 py-2">{s.start_date} to {s.end_date}</td>
                <td className="px-4 py-2">{s.is_current ? "Yes" : "No"}</td>
                <td className="px-4 py-2">{s.is_locked ? "Yes" : "No"}</td>
                <td className="px-4 py-2 text-right flex gap-2 justify-end">
                  {!s.is_current && <button onClick={() => makeCurrent(s.id)} className="text-xs text-brand-600 hover:underline">Make Current</button>}
                  <button onClick={() => toggleLock(s.id)} className="text-xs text-brand-600 hover:underline">{s.is_locked ? "Unlock" : "Lock"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
