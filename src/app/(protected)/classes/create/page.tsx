"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function CreateClassPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<any[]>([]);
  const [form, setForm] = useState({ academic_session_id: "", name: "", section: "", class_order: 0, is_final_year: false, capacity: "", is_active: true });
  const [error, setError] = useState("");
  useEffect(() => { api("/api/sessions").then(setSessions).catch(() => {}); }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const payload: any = { ...form, academic_session_id: Number(form.academic_session_id), class_order: Number(form.class_order), capacity: form.capacity ? Number(form.capacity) : null };
      const c: any = await api("/api/classes", { method: "POST", body: JSON.stringify(payload) });
      router.push(`/classes/${c.id}`);
    } catch (err: any) { setError(err.message); }
  }
  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Create Class</h2>
      {error && <div className="mb-4 text-sm text-rose-600">{error}</div>}
      <form onSubmit={submit} className="space-y-4 rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <div>
          <label className="block text-sm font-medium mb-1.5">Academic Session</label>
          <select value={form.academic_session_id} onChange={(e) => setForm({ ...form, academic_session_id: e.target.value })} required className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm">
            <option value="">Select</option>
            {sessions.map((s) => <option key={s.id} value={s.id}>{s.year_label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Class Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Section</label>
          <input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Class Order</label>
          <input type="number" value={form.class_order} onChange={(e) => setForm({ ...form, class_order: Number(e.target.value) })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Capacity</label>
          <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.is_final_year} onChange={(e) => setForm({ ...form, is_final_year: e.target.checked })} />
          <label className="text-sm">Final year (graduation)</label>
        </div>
        <button className="rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">Create</button>
      </form>
    </div>
  );
}
