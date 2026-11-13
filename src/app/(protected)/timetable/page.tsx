"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function TimetablePage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [classId, setClassId] = useState("");
  const [slots, setSlots] = useState<any[]>([]);
  const [form, setForm] = useState({ day_of_week: 1, start_time: "08:00", end_time: "09:00", subject_id: "", teacher_id: "", room: "" });
  useEffect(() => { api("/api/classes").then(setClasses); }, []);
  useEffect(() => { if (classId) api(`/api/timetable?class_id=${classId}`).then(setSlots); }, [classId]);
  async function add() {
    await api("/api/timetable", { method: "POST", body: JSON.stringify({ ...form, class_id: Number(classId), subject_id: form.subject_id ? Number(form.subject_id) : null, teacher_id: form.teacher_id ? Number(form.teacher_id) : null }) });
    api(`/api/timetable?class_id=${classId}`).then(setSlots);
  }
  async function del(id: number) { await api(`/api/timetable/${id}/delete`, { method: "POST" }); api(`/api/timetable?class_id=${classId}`).then(setSlots); }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Timetable</h2>
      <div className="mb-4">
        <select value={classId} onChange={(e) => setClassId(e.target.value)} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white">
          <option value="">Select class</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name} {c.section}</option>)}
        </select>
      </div>
      {classId && (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            <select value={form.day_of_week} onChange={(e) => setForm({ ...form, day_of_week: Number(e.target.value) })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => <option key={i} value={i+1}>{d}</option>)}
            </select>
            <input value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white w-24" />
            <input value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white w-24" />
            <input value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} placeholder="Room" className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white w-24" />
            <button onClick={add} className="rounded-lg bg-brand-700 text-cream-50 px-3 py-2 text-sm">Add Slot</button>
          </div>
          <div className="rounded-xl bg-cream-50 border border-cream-300 shadow-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-cream-200"><tr><th className="text-left px-4 py-2">Day</th><th className="text-left px-4 py-2">Time</th><th className="text-left px-4 py-2">Room</th><th className="px-4 py-2"></th></tr></thead>
              <tbody>
                {slots.map((s) => (
                  <tr key={s.id} className="border-t border-cream-200">
                    <td className="px-4 py-2">{s.day_of_week}</td>
                    <td className="px-4 py-2">{s.start_time} - {s.end_time}</td>
                    <td className="px-4 py-2">{s.room || "-"}</td>
                    <td className="px-4 py-2 text-right"><button onClick={() => del(s.id)} className="text-xs text-rose-600 hover:underline">Delete</button></td>
                  </tr>
                ))}
                {slots.length === 0 && <tr><td colSpan={4} className="px-4 py-6 text-center text-brand-500">No slots</td></tr>}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
