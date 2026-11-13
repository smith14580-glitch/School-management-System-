"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function CreateExamPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ academic_session_id: "", class_id: "", name: "", term: "", start_date: new Date().toISOString().slice(0,10), end_date: new Date().toISOString().slice(0,10), status: "draft" });
  const [error, setError] = useState("");
  useEffect(() => { api("/api/classes").then(setClasses); api("/api/sessions").then(setSessions); }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const x: any = await api("/api/exams", { method: "POST", body: JSON.stringify({ ...form, academic_session_id: form.academic_session_id ? Number(form.academic_session_id) : null, class_id: Number(form.class_id) }) });
      router.push(`/exams/${x.id}`);
    } catch (err: any) { setError(err.message); }
  }
  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Create Exam</h2>
      {error && <div className="mb-4 text-sm text-rose-600">{error}</div>}
      <form onSubmit={submit} className="space-y-4 rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <select value={form.academic_session_id} onChange={(e) => setForm({ ...form, academic_session_id: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm">
          <option value="">Session (current)</option>
          {sessions.map((s) => <option key={s.id} value={s.id}>{s.year_label}</option>)}
        </select>
        <select value={form.class_id} onChange={(e) => setForm({ ...form, class_id: e.target.value })} required className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm">
          <option value="">Class</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name} {c.section}</option>)}
        </select>
        <input placeholder="Exam name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        <input placeholder="Term" value={form.term} onChange={(e) => setForm({ ...form, term: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        <button className="rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">Create</button>
      </form>
    </div>
  );
}
