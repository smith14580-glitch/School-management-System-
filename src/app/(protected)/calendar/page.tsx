"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [form, setForm] = useState({ title: "", description: "", event_type: "event", start_date: new Date().toISOString().slice(0,10), end_date: new Date().toISOString().slice(0,10), class_id: "" });
  useEffect(() => { api("/api/sessions").then((s: any[]) => { setSessions(s); const cur = s.find((x) => x.is_current); if (cur) setSessionId(String(cur.id)); }); }, []);
  useEffect(() => { if (sessionId) api(`/api/calendar?session_id=${sessionId}`).then(setEvents); }, [sessionId]);
  async function add() {
    await api("/api/calendar", { method: "POST", body: JSON.stringify({ ...form, academic_session_id: Number(sessionId), class_id: form.class_id ? Number(form.class_id) : null }) });
    if (sessionId) api(`/api/calendar?session_id=${sessionId}`).then(setEvents);
  }
  async function del(id: number) { await api(`/api/calendar/${id}/delete`, { method: "POST" }); if (sessionId) api(`/api/calendar?session_id=${sessionId}`).then(setEvents); }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Academic Calendar</h2>
      <div className="mb-4 space-y-2 rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <select value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white">
          <option value="event">Event</option><option value="exam">Exam</option><option value="holiday">Holiday</option>
        </select>
        <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <button onClick={add} className="rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">Add</button>
      </div>
      <div className="rounded-xl bg-cream-50 border border-cream-300 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Title</th><th className="text-left px-4 py-2">Type</th><th className="text-left px-4 py-2">Dates</th><th className="px-4 py-2"></th></tr></thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-t border-cream-200">
                <td className="px-4 py-2">{e.title}</td>
                <td className="px-4 py-2">{e.event_type}</td>
                <td className="px-4 py-2">{e.start_date} to {e.end_date}</td>
                <td className="px-4 py-2 text-right"><button onClick={() => del(e.id)} className="text-xs text-rose-600 hover:underline">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
