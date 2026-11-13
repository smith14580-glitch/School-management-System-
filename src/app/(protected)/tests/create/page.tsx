"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function CreateTestPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ class_id: "", subject_id: "", title: "", test_date: new Date().toISOString().slice(0,10), total_marks: 100 });
  const [error, setError] = useState("");
  useEffect(() => { api("/api/classes").then(setClasses); }, []);
  useEffect(() => {
    if (form.class_id) api(`/api/classes/${form.class_id}`).then((d: any) => setSubjects(d.subjects || []));
  }, [form.class_id]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const t: any = await api("/api/tests", { method: "POST", body: JSON.stringify({ ...form, class_id: Number(form.class_id), subject_id: Number(form.subject_id), total_marks: Number(form.total_marks) }) });
      router.push(`/tests/${t.id}`);
    } catch (err: any) { setError(err.message); }
  }
  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Create Daily Test</h2>
      {error && <div className="mb-4 text-sm text-rose-600">{error}</div>}
      <form onSubmit={submit} className="space-y-4 rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <select value={form.class_id} onChange={(e) => setForm({ ...form, class_id: e.target.value, subject_id: "" })} required className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm">
          <option value="">Class</option>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name} {c.section}</option>)}
        </select>
        <select value={form.subject_id} onChange={(e) => setForm({ ...form, subject_id: e.target.value })} required className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm">
          <option value="">Subject</option>
          {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        <input type="date" value={form.test_date} onChange={(e) => setForm({ ...form, test_date: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        <input type="number" placeholder="Total marks" value={form.total_marks} onChange={(e) => setForm({ ...form, total_marks: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        <button className="rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">Create</button>
      </form>
    </div>
  );
}
