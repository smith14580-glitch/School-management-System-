"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function AddStudentToClassPage() {
  const params = useParams();
  const classId = params.id as string;
  const router = useRouter();
  const [sessions, setSessions] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ name: "", father_guardian_name: "", dob: "", gender: "", contact: "", whatsapp_number: "", address: "", previous_school: "", admission_date: "", status: "active", class_id: Number(classId), academic_session_id: "", roll_number: "" });
  const [error, setError] = useState("");
  useEffect(() => { api("/api/sessions").then(setSessions); }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const payload = { ...form, class_id: Number(classId), academic_session_id: form.academic_session_id ? Number(form.academic_session_id) : null, roll_number: form.roll_number ? Number(form.roll_number) : null };
      await api("/api/students", { method: "POST", body: JSON.stringify(payload) });
      router.push(`/classes/${classId}`);
    } catch (err: any) { setError(err.message); }
  }
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Add Student to Class</h2>
      {error && <div className="mb-4 text-sm text-rose-600">{error}</div>}
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2 rounded-xl bg-cream-50 border border-cream-300 p-5 shadow-card">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input placeholder="Father/Guardian" value={form.father_guardian_name} onChange={(e) => setForm({ ...form, father_guardian_name: e.target.value })} required className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white">
          <option value="">Gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
        </select>
        <input placeholder="Contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input placeholder="WhatsApp" value={form.whatsapp_number} onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white sm:col-span-2" />
        <input placeholder="Previous school" value={form.previous_school} onChange={(e) => setForm({ ...form, previous_school: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white sm:col-span-2" />
        <select value={form.academic_session_id} onChange={(e) => setForm({ ...form, academic_session_id: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white">
          <option value="">Session (current)</option>
          {sessions.map((s) => <option key={s.id} value={s.id}>{s.year_label}</option>)}
        </select>
        <input type="number" placeholder="Roll number (auto)" value={form.roll_number} onChange={(e) => setForm({ ...form, roll_number: e.target.value })} className="rounded-lg border border-cream-400 px-3 py-2 text-sm bg-white" />
        <button className="sm:col-span-2 rounded-lg bg-brand-700 text-cream-50 px-4 py-2 text-sm">Add Student</button>
      </form>
    </div>
  );
}

