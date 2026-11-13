"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function EditClassPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [sessions, setSessions] = useState<any[]>([]);
  const [form, setForm] = useState<any>(null);
  useEffect(() => {
    api("/api/sessions").then(setSessions);
    api(`/api/classes/${id}`).then((d: any) => setForm({ academic_session_id: d.class.academic_session_id, name: d.class.name, section: d.class.section || "", class_order: d.class.class_order, is_final_year: d.class.is_final_year, capacity: d.class.capacity || "", is_active: d.class.is_active }));
  }, [id]);
  if (!form) return <p>Loading...</p>;
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form, academic_session_id: Number(form.academic_session_id), class_order: Number(form.class_order), capacity: form.capacity ? Number(form.capacity) : null };
    await api(`/api/classes/${id}`, { method: "POST", body: JSON.stringify(payload) });
    router.push(`/classes/${id}`);
  }
  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Edit Class</h2>
      <form onSubmit={submit} className="space-y-4 rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <select value={form.academic_session_id} onChange={(e) => setForm({ ...form, academic_session_id: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm">
          {sessions.map((s) => <option key={s.id} value={s.id}>{s.year_label}</option>)}
        </select>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        <input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" placeholder="Section" />
        <input type="number" value={form.class_order} onChange={(e) => setForm({ ...form, class_order: Number(e.target.value) })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" />
        <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="w-full rounded-lg border border-cream-400 px-3.5 py-2.5 bg-white text-sm" placeholder="Capacity" />
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.is_final_year} onChange={(e) => setForm({ ...form, is_final_year: e.target.checked })} />
          <label className="text-sm">Final year</label>
        </div>
        <button className="rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">Save</button>
      </form>
    </div>
  );
}
